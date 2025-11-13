import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

/**
 * Map your common keys → Strapi endpoints
 */
const endpointMap: Record<string, string> = {
  debtRestructuring: "/api/debt-restructuring",
  convertibleDebenture: "/api/convertible-debenture",
  seedInvestment: "/api/seed-investment",
  collateralizedFunding: "/api/collateralized-funding",
  regAFunding: "/api/reg-a-funding",
  equityLineFunding: "/api/equity-line-funding",
  stockLoans: "/api/stock-loan",
  seriesDFunding: "/api/series-d-funding",
};

/**
 * Default populate paths for all pages
 */
const DEFAULT_POPULATE_PATHS = [
  "seo",
  "hero.background_image",
  "contact_banner.card.link",
  "contact_banner.background",
];

export interface CommonData {
  seo?: any | null;
  hero?: any | null;
  content?: any | null;
  campaigns?: any | null;
  [key: string]: any;
}

/**
 * In-memory cache
 */
type CacheEntry<T> = {
  data?: T;
  expiresAt?: number;
  promise?: Promise<T>;
};

const CACHE: Record<string, CacheEntry<any>> = {};
const CACHE_TTL_MS =
  Number(
    process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ??
      process.env.API_CACHE_TTL_MS ??
      60 * 60 * 1000
  ) || 60 * 60 * 1000; // 1 hour

/**
 * Helpers
 */
function buildUrl(key: string, query = ""): string {
  const endpoint = endpointMap[key];
  if (!endpoint) throw new Error(`Unknown endpoint key: ${key}`);
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  return `${base}${endpoint}${query}`;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (config.API_TOKEN) headers["Authorization"] = `Bearer ${config.API_TOKEN}`;
  return headers;
}

function buildPopulateQuery(): string {
  const query = buildPopulateParams(DEFAULT_POPULATE_PATHS);
  return query ? `?${query}` : "";
}

async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function normalizeResponse<T = CommonData>(raw: any): T {
  const candidate = raw?.data?.attributes ?? raw?.data ?? raw ?? {};
  return candidate as T;
}

/**
 * Cache utils
 */
export function clearCommonCache(key?: string) {
  if (key) delete CACHE[key];
  else Object.keys(CACHE).forEach((k) => delete CACHE[k]);
}

export function getCommonCacheInfo(key: string) {
  const c = CACHE[key];
  return {
    hasData: Boolean(c?.data),
    expiresAt: c?.expiresAt ?? null,
    ttlMs: CACHE_TTL_MS,
  };
}

/**
 * ✅ Main fetch function
 * Usage: fetchCommonData("seedInvestment")
 */
export async function fetchCommonData<T = CommonData>(
  key: keyof typeof endpointMap,
  forceRevalidate = false
): Promise<T> {
  const query = buildPopulateQuery();
  const cacheKey = `${key}${query}`;
  const cache = CACHE[cacheKey];

  // Serve from cache if valid
  if (
    !forceRevalidate &&
    cache?.data &&
    cache.expiresAt &&
    Date.now() < cache.expiresAt
  ) {
    return cache.data as T;
  }

  // Reuse inflight promise
  if (!forceRevalidate && cache?.promise) {
    return cache.promise as Promise<T>;
  }

  const fetchPromise = (async () => {
    try {
      const url = buildUrl(key, query);
      const headers = buildHeaders();

      const res = await fetch(url, {
        headers,
        next: { revalidate: CACHE_TTL_MS },
      });

      if (!res.ok) {
        console.error(`Failed to fetch ${key}:`, res.status, res.statusText);
        return {} as T;
      }

      const json = await safeJson(res);
      if (!json) return {} as T;

      const normalized = normalizeResponse<T>(json);

      CACHE[cacheKey] = {
        data: normalized,
        expiresAt: Date.now() + CACHE_TTL_MS,
      };

      return normalized;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return {} as T;
    } finally {
      if (CACHE[cacheKey]) CACHE[cacheKey].promise = undefined;
    }
  })();

  CACHE[cacheKey] = CACHE[cacheKey] || {};
  CACHE[cacheKey].promise = fetchPromise;

  return fetchPromise;
}
