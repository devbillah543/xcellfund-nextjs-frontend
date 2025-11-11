import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface GlobalData {
  topbar: any | null;
  navigation: any | null;
  footer: any | null;
  [key: string]: any;
}

// Flattened populate query string for deep relations

const POPULATE_PATHS = [
  "topbar.contacts.contact_links",
  "topbar.socials",
  "topbar.socials.social_links",
  "navigation.menus.item",
  "navigation.menus.subitems",
  "navigation.brand.logo",
  "footer.branding.logo",
  "footer.quicklinks.links",
  "footer.location.email",
  "footer.location.phone",
  "footer.copyright.links",
  "footer.subscription.input",
  "footer.subscription.social_links",
];

const populateQuery = buildPopulateParams(POPULATE_PATHS);

// Safe default global data
const DEFAULT_GLOBAL: GlobalData = {
  topbar: null,
  navigation: null,
  footer: null,
};

function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  return `${base}/api/global${query}`;
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
    console.warn("Failed to parse JSON response for global data", err);
    return null;
  }
}

function normalizeGlobal(raw: any): GlobalData {
  // Strapi single-type: { data: { id, attributes: { ... } } }
  const candidate = raw?.data?.attributes ?? raw?.data ?? raw ?? {};
  // Support different key casings returned by various endpoints
  const topbar = candidate.topbar ?? candidate.Topbar ?? candidate.topBar ?? null;
  const navigation =
    candidate.navigation ?? candidate.Navigation ?? candidate.Menu ?? candidate.menu ?? null;
  const footer = candidate.footer ?? candidate.Footer ?? null;

  // Include everything else (useful for advanced layouts)
  const rest = { ...candidate };
  delete rest.topbar;
  delete rest.Topbar;
  delete rest.topBar;
  delete rest.navigation;
  delete rest.Navigation;
  delete rest.Menu;
  delete rest.menu;
  delete rest.footer;
  delete rest.Footer;

  return {
    topbar,
    navigation,
    footer,
    ...rest,
  } as GlobalData;
}

// Simple in-memory cache for global data (server or client runtime).
// Note: in serverless environments this is per-function-instance.
type CacheEntry = {
	data?: GlobalData;
	expiresAt?: number;
	promise?: Promise<GlobalData>;
};

const CACHE: CacheEntry = {};

// TTL in milliseconds (configurable via env). Default 1 hour.
const CACHE_TTL_MS = Number(process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ?? process.env.API_CACHE_TTL_MS ?? 60 * 60 * 1000);

/**
 * Clear the in-memory cache (useful for testing or manual invalidation)
 */
export function clearGlobalCache() {
	CACHE.data = undefined;
	CACHE.expiresAt = undefined;
	CACHE.promise = undefined;
}

/**
 * Inspect cache info
 */
export function getGlobalCacheInfo() {
	return {
		hasData: Boolean(CACHE.data),
		expiresAt: CACHE.expiresAt ?? null,
		ttlMs: CACHE_TTL_MS,
	};
}

/**
 * Fetch global layout data (Header + Footer + Topbar)
 * Works on both server and client
 * Uses in-memory cache with TTL and request deduplication.
 *
 * @param forceRevalidate - when true will bypass cache and fetch fresh data
 */
export async function fetchGlobal(forceRevalidate = false): Promise<GlobalData> {
	// return cached value when valid
	if (!forceRevalidate && CACHE.data && CACHE.expiresAt && Date.now() < CACHE.expiresAt) {
		return CACHE.data;
	}

	// if there's an in-flight request, reuse it (dedupe)
	if (!forceRevalidate && CACHE.promise) {
		return CACHE.promise;
	}

	// create a promise for the in-flight request and store it
	const fetchPromise = (async () => {
		const url = buildUrl();
		const headers = buildHeaders();

		try {
			const res = await fetch(url, {
				headers,
				// Next.js-specific option — harmless in browser; adjust/remove if not using Next
				next: { revalidate: 60 * 60 }, // revalidate every hour
			});

			if (!res.ok) {
				console.error("Failed to fetch global data:", res.status, res.statusText);
				return DEFAULT_GLOBAL;
			}

			const json = await safeJson(res);
			if (!json) return DEFAULT_GLOBAL;

			const normalized = normalizeGlobal(json);

			// store in cache
			CACHE.data = normalized;
			CACHE.expiresAt = Date.now() + CACHE_TTL_MS;
			return normalized;
		} catch (error) {
			console.error("Error fetching global data:", error);
			return DEFAULT_GLOBAL;
		} finally {
			// clear the in-flight promise after completion so subsequent calls can start a new one when expired
			CACHE.promise = undefined;
		}
	})();

	CACHE.promise = fetchPromise;
	return fetchPromise;
}
