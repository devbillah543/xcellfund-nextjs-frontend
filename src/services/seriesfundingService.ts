import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface SeriesFundingData {
  seo: any | null;
  hero: any | null;
  content: any | null;
  [key: string]: any;
}

// Fields to auto-populate from Strapi.
// NOTE: adjust these paths to match your Strapi relations/fields for the series funding single-type.
const POPULATE_PATHS = [
  "seo",
  "hero.background_image",
  "contact_banner.card.link",
  "contact_banner.background",
];
const populateQuery = buildPopulateParams(POPULATE_PATHS);

// Default fallback
const DEFAULT_SERIES_FUNDING: SeriesFundingData = {
  seo: null,
  hero: null,
  content: null,
  campaigns: null,
};

function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  // Assumes your Strapi single-type collection is exposed at this route — change if needed.
  return `${base}/api/series-d-funding${query}`;
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
    console.warn("Failed to parse JSON response for series funding data", err);
    return null;
  }
}

function normalizeSeriesFunding(raw: any): SeriesFundingData {
  // Normalize Strapi single-type response:
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
  } as SeriesFundingData;
}

// In-memory cache entry type and storage (same behavior as your private-placement module)
type SeriesFundingCacheEntry = {
  data?: SeriesFundingData;
  expiresAt?: number;
  promise?: Promise<SeriesFundingData>;
};

const SERIES_FUNDING_CACHE: SeriesFundingCacheEntry = {};
const CACHE_TTL_MS =
  Number(
    process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ??
      process.env.API_CACHE_TTL_MS ??
      60 * 60 * 1000
  ) || 60 * 60 * 1000; // default 1 hour

export function clearSeriesFundingCache() {
  SERIES_FUNDING_CACHE.data = undefined;
  SERIES_FUNDING_CACHE.expiresAt = undefined;
  SERIES_FUNDING_CACHE.promise = undefined;
}

export function getSeriesFundingCacheInfo() {
  return {
    hasData: Boolean(SERIES_FUNDING_CACHE.data),
    expiresAt: SERIES_FUNDING_CACHE.expiresAt ?? null,
    ttlMs: CACHE_TTL_MS,
  };
}

/**
 * Fetch Series Funding single-type data (seo + hero + content + campaigns)
 * Uses in-memory cache with TTL and request deduplication.
 *
 * @param forceRevalidate - bypass cache when true
 */
export async function fetchSeriesFunding(
  forceRevalidate = false
): Promise<SeriesFundingData> {
  // Return cached data if still valid
  if (
    !forceRevalidate &&
    SERIES_FUNDING_CACHE.data &&
    SERIES_FUNDING_CACHE.expiresAt &&
    Date.now() < SERIES_FUNDING_CACHE.expiresAt
  ) {
    return SERIES_FUNDING_CACHE.data;
  }

  // Reuse in-flight request if available
  if (!forceRevalidate && SERIES_FUNDING_CACHE.promise) {
    return SERIES_FUNDING_CACHE.promise;
  }

  const fetchPromise = (async () => {
    const url = buildUrl();
    const headers = buildHeaders();

    try {
      const res = await fetch(url, {
        headers,
        next: { revalidate: 60 * 60 * 1000 }, // Next.js ISR hint
      });

      if (!res.ok) {
        console.error(
          "Failed to fetch series funding data:",
          res.status,
          res.statusText
        );
        return DEFAULT_SERIES_FUNDING;
      }

      const json = await safeJson(res);
      if (!json) return DEFAULT_SERIES_FUNDING;

      const normalized = normalizeSeriesFunding(json);

      // cache result
      SERIES_FUNDING_CACHE.data = normalized;
      SERIES_FUNDING_CACHE.expiresAt = Date.now() + CACHE_TTL_MS;

      return normalized;
    } catch (error) {
      console.error("Error fetching series funding data:", error);
      return DEFAULT_SERIES_FUNDING;
    } finally {
      SERIES_FUNDING_CACHE.promise = undefined;
    }
  })();

  SERIES_FUNDING_CACHE.promise = fetchPromise;
  return fetchPromise;
}
