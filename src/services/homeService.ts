import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface GlobalData {
  seo: any | null;
  carousel: any | null;
  [key: string]: any;
}

// Flattened populate query string for deep relations

const POPULATE_PATHS = [
  "seo",
  "carousel.items.image",
  "features.link",
  "services.cards.link",
  "who_we_are.left_content.link",
  "who_we_are.right_content.link",
  "who_we_are_banner.images",
  "who_we_are_banner.content.link",
  "highlights.link",
  "contact_banner.card.link",
  "contact_banner.background",
  "form.fields",
  "form.submit_link",
];

const populateQuery = buildPopulateParams(POPULATE_PATHS);

// Safe default home data
const DEFAULT_GLOBAL: GlobalData = {
  seo: null,
  carousel: null,
};

function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  return `${base}/api/home${query}`;
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
    console.warn("Failed to parse JSON response for home data", err);
    return null;
  }
}

function normalizeHome(raw: any): GlobalData {
  // Strapi single-type: { data: { id, attributes: { ... } } }
  const candidate = raw?.data?.attributes ?? raw?.data ?? raw ?? {};

  // Extract expected keys (normalize different casings/shapes)
  const seo = candidate.seo ?? candidate.SEO ?? null;
  const carousel = candidate.carousel ?? candidate.Carousel ?? null;

  // Keep any other returned properties
  const rest = { ...candidate };
  delete rest.seo;
  delete rest.SEO;
  delete rest.carousel;
  delete rest.Carousel;

  return {
    seo,
    carousel,
    ...rest,
  } as GlobalData;
}

// Simple in-memory cache for home data (server or client runtime).
type HomeCacheEntry = {
  data?: GlobalData;
  expiresAt?: number;
  promise?: Promise<GlobalData>;
};

// single-entry cache
const HOME_CACHE: HomeCacheEntry = {};

// TTL in milliseconds (configurable via env). Default 1 hour.
const HOME_CACHE_TTL_MS = Number(process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ?? process.env.API_CACHE_TTL_MS ?? 60 * 60 * 1000);

/**
 * Clear the in-memory home cache.
 */
export function clearHomeCache() {
  HOME_CACHE.data = undefined;
  HOME_CACHE.expiresAt = undefined;
  HOME_CACHE.promise = undefined;
}

/**
 * Inspect home cache info.
 */
export function getHomeCacheInfo() {
  return {
    hasData: Boolean(HOME_CACHE.data),
    expiresAt: HOME_CACHE.expiresAt ?? null,
    ttlMs: HOME_CACHE_TTL_MS,
  };
}

/**
 * Fetch home page data (seo + carousel)
 * Uses in-memory cache with TTL and request deduplication.
 *
 * @param forceRevalidate - bypass cache when true
 */
export async function fetchHome(forceRevalidate = false): Promise<GlobalData> {
  // return cached value when valid
  if (!forceRevalidate && HOME_CACHE.data && HOME_CACHE.expiresAt && Date.now() < HOME_CACHE.expiresAt) {
    return HOME_CACHE.data;
  }

  // reuse in-flight request if present
  if (!forceRevalidate && HOME_CACHE.promise) {
    return HOME_CACHE.promise;
  }

  // create and store in-flight promise
  const fetchPromise = (async () => {
    const url = buildUrl();
    const headers = buildHeaders();

    try {
      const res = await fetch(url, {
        headers,
        next: { revalidate: 60 * 60 * 1000 }, // keep Next.js option if applicable
      });

      if (!res.ok) {
        console.error("Failed to fetch home data:", res.status, res.statusText);
        return DEFAULT_GLOBAL;
      }

      const json = await safeJson(res);
      if (!json) return DEFAULT_GLOBAL;

      const normalized = normalizeHome(json);

      // store in cache
      HOME_CACHE.data = normalized;
      HOME_CACHE.expiresAt = Date.now() + HOME_CACHE_TTL_MS;

      return normalized;
    } catch (error) {
      console.error("Error fetching home data:", error);
      return DEFAULT_GLOBAL;
    } finally {
      // clear promise so subsequent calls can start a new one after completion
      HOME_CACHE.promise = undefined;
    }
  })();

  HOME_CACHE.promise = fetchPromise;
  return fetchPromise;
}
