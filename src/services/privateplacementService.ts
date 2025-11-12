import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface PrivatePlacementData {
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
const DEFAULT_PRIVATE_PLACEMENT: PrivatePlacementData = {
  seo: null,
  hero: null,
  content: null,
};

function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  return `${base}/api/private-placement${query}`;
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
    console.warn("Failed to parse JSON response for private placement data", err);
    return null;
  }
}

function normalizePrivatePlacement(raw: any): PrivatePlacementData {
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
  } as PrivatePlacementData;
}

// In-memory cache
type PrivatePlacementCacheEntry = {
  data?: PrivatePlacementData;
  expiresAt?: number;
  promise?: Promise<PrivatePlacementData>;
};

const PRIVATE_PLACEMENT_CACHE: PrivatePlacementCacheEntry = {};
const CACHE_TTL_MS =
  Number(
    process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ??
      process.env.API_CACHE_TTL_MS ??
      60 * 60 * 1000
  ) || 60 * 60 * 1000; // default 1 hour

/**
 * Clear private placement cache
 */
export function clearPrivatePlacementCache() {
  PRIVATE_PLACEMENT_CACHE.data = undefined;
  PRIVATE_PLACEMENT_CACHE.expiresAt = undefined;
  PRIVATE_PLACEMENT_CACHE.promise = undefined;
}

/**
 * Inspect private placement cache info
 */
export function getPrivatePlacementCacheInfo() {
  return {
    hasData: Boolean(PRIVATE_PLACEMENT_CACHE.data),
    expiresAt: PRIVATE_PLACEMENT_CACHE.expiresAt ?? null,
    ttlMs: CACHE_TTL_MS,
  };
}

/**
 * Fetch Private Placement data (seo + hero + content)
 * Uses in-memory cache with TTL and deduplication.
 *
 * @param forceRevalidate - bypass cache when true
 */
export async function fetchPrivatePlacement(
  forceRevalidate = false
): Promise<PrivatePlacementData> {
  // return cached data if still valid
  if (
    !forceRevalidate &&
    PRIVATE_PLACEMENT_CACHE.data &&
    PRIVATE_PLACEMENT_CACHE.expiresAt &&
    Date.now() < PRIVATE_PLACEMENT_CACHE.expiresAt
  ) {
    return PRIVATE_PLACEMENT_CACHE.data;
  }

  // reuse in-flight request if available
  if (!forceRevalidate && PRIVATE_PLACEMENT_CACHE.promise) {
    return PRIVATE_PLACEMENT_CACHE.promise;
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
          "Failed to fetch private placement data:",
          res.status,
          res.statusText
        );
        return DEFAULT_PRIVATE_PLACEMENT;
      }

      const json = await safeJson(res);
      if (!json) return DEFAULT_PRIVATE_PLACEMENT;

      const normalized = normalizePrivatePlacement(json);

      // cache result
      PRIVATE_PLACEMENT_CACHE.data = normalized;
      PRIVATE_PLACEMENT_CACHE.expiresAt = Date.now() + CACHE_TTL_MS;

      return normalized;
    } catch (error) {
      console.error("Error fetching private placement data:", error);
      return DEFAULT_PRIVATE_PLACEMENT;
    } finally {
      PRIVATE_PLACEMENT_CACHE.promise = undefined;
    }
  })();

  PRIVATE_PLACEMENT_CACHE.promise = fetchPromise;
  return fetchPromise;
}
