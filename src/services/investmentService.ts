import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface InvestmentData {
  seo: any | null;
  hero: any | null;
  content: any | null;
  [key: string]: any;
}

// Fields to auto-populate from Strapi
const POPULATE_PATHS = [
  "seo",
  "hero.background_image",
  "contact_banner.card.link",
  "contact_banner.background",
];
const populateQuery = buildPopulateParams(POPULATE_PATHS);

// Default data fallback
const DEFAULT_INVESTMENT: InvestmentData = {
  seo: null,
  hero: null,
  content: null,
};

function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  return `${base}/api/investment${query}`;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (config.API_TOKEN) {
    headers["Authorization"] = `Bearer ${config.API_TOKEN}`;
  }
  return headers;
}

async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch (err) {
    console.warn("Failed to parse JSON response for investment data", err);
    return null;
  }
}

function normalizeInvestment(raw: any): InvestmentData {
  // Strapi single-type response format: { data: { id, attributes: { ... } } }
  const candidate = raw?.data?.attributes ?? raw?.data ?? raw ?? {};

  const seo = candidate.seo ?? candidate.SEO ?? null;
  const hero = candidate.hero ?? candidate.Hero ?? null;
  const content = candidate.content ?? candidate.Content ?? null;

  const rest = { ...candidate };
  delete rest.seo;
  delete rest.SEO;
  delete rest.hero;
  delete rest.Hero;
  delete rest.content;
  delete rest.Content;

  return {
    seo,
    hero,
    content,
    ...rest,
  } as InvestmentData;
}

// In-memory cache
type InvestmentCacheEntry = {
  data?: InvestmentData;
  expiresAt?: number;
  promise?: Promise<InvestmentData>;
};

const INVESTMENT_CACHE: InvestmentCacheEntry = {};
const CACHE_TTL_MS =
  Number(
    process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ??
      process.env.API_CACHE_TTL_MS ??
      60 * 60 * 1000
  ) || 60 * 60 * 1000; // default 1 hour

/**
 * Clear investment cache
 */
export function clearInvestmentCache() {
  INVESTMENT_CACHE.data = undefined;
  INVESTMENT_CACHE.expiresAt = undefined;
  INVESTMENT_CACHE.promise = undefined;
}

/**
 * Inspect investment cache info
 */
export function getInvestmentCacheInfo() {
  return {
    hasData: Boolean(INVESTMENT_CACHE.data),
    expiresAt: INVESTMENT_CACHE.expiresAt ?? null,
    ttlMs: CACHE_TTL_MS,
  };
}

/**
 * Fetch Investment data (seo + hero + content)
 * Uses in-memory cache with TTL and deduplication.
 *
 * @param forceRevalidate - bypass cache when true
 */
export async function fetchInvestment(
  forceRevalidate = false
): Promise<InvestmentData> {
  // return cached data if still valid
  if (
    !forceRevalidate &&
    INVESTMENT_CACHE.data &&
    INVESTMENT_CACHE.expiresAt &&
    Date.now() < INVESTMENT_CACHE.expiresAt
  ) {
    return INVESTMENT_CACHE.data;
  }

  // reuse in-flight request if available
  if (!forceRevalidate && INVESTMENT_CACHE.promise) {
    return INVESTMENT_CACHE.promise;
  }

  const fetchPromise = (async () => {
    const url = buildUrl();
    const headers = buildHeaders();

    try {
      const res = await fetch(url, {
        headers,
        next: { revalidate: 60 * 60 }, // Next.js ISR hint
      });

      if (!res.ok) {
        console.error(
          "Failed to fetch investment data:",
          res.status,
          res.statusText
        );
        return DEFAULT_INVESTMENT;
      }

      const json = await safeJson(res);
      if (!json) return DEFAULT_INVESTMENT;

      const normalized = normalizeInvestment(json);

      // cache result
      INVESTMENT_CACHE.data = normalized;
      INVESTMENT_CACHE.expiresAt = Date.now() + CACHE_TTL_MS;

      return normalized;
    } catch (error) {
      console.error("Error fetching investment data:", error);
      return DEFAULT_INVESTMENT;
    } finally {
      INVESTMENT_CACHE.promise = undefined;
    }
  })();

  INVESTMENT_CACHE.promise = fetchPromise;
  return fetchPromise;
}
