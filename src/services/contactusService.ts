import config from "@/config";
import buildPopulateParams from "@/utils/buildPopulateParams";

export interface ContactUsData {
  seo: any | null;
  hero: any | null;
  form: any | null;
  [key: string]: any;
}

// ------------------------------
// Fields to auto-populate from Strapi
// ------------------------------
const POPULATE_PATHS = [
  "seo",
  "hero.background_image",
  "form.fields",
  "form.submit_link",
];

const populateQuery = buildPopulateParams(POPULATE_PATHS);

// ------------------------------
// Default data fallback
// ------------------------------
const DEFAULT_CONTACT_US: ContactUsData = {
  seo: null,
  hero: null,
  form: null,
  content: null,
};

// ------------------------------
// URL + Headers helpers
// ------------------------------
function buildUrl(): string {
  const base = String(config.API_URL || "").replace(/\/+$/, "");
  const query = populateQuery ? `?${populateQuery}` : "";
  return `${base}/api/contact-us${query}`; // 👈 ensure your Strapi API name is correct
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (config.API_TOKEN) {
    headers["Authorization"] = `Bearer ${config.API_TOKEN}`;
  }
  return headers;
}

// ------------------------------
// Safe JSON parser
// ------------------------------
async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch (err) {
    console.warn("Failed to parse JSON response for Contact Us data", err);
    return null;
  }
}

// ------------------------------
// Normalize Strapi response
// ------------------------------
function normalizeContactUs(raw: any): ContactUsData {
  const candidate = raw?.data?.attributes ?? raw?.data ?? raw ?? {};

  const seo = candidate.seo ?? candidate.SEO ?? null;
  const hero = candidate.hero ?? candidate.Hero ?? null;
  const form = candidate.form ?? candidate.Form ?? null;
  const content = candidate.content ?? candidate.Content ?? null;

  const rest = { ...candidate };
  delete rest.seo;
  delete rest.SEO;
  delete rest.hero;
  delete rest.Hero;
  delete rest.form;
  delete rest.Form;
  delete rest.content;
  delete rest.Content;

  return {
    seo,
    hero,
    form,
    content,
    ...rest,
  } as ContactUsData;
}

// ------------------------------
// In-memory cache
// ------------------------------
type ContactUsCacheEntry = {
  data?: ContactUsData;
  expiresAt?: number;
  promise?: Promise<ContactUsData>;
};

const CONTACT_US_CACHE: ContactUsCacheEntry = {};
const CACHE_TTL_MS =
  Number(
    process.env.NEXT_PUBLIC_API_CACHE_TTL_MS ??
      process.env.API_CACHE_TTL_MS ??
      60 * 60 * 1000
  ) || 60 * 60 * 1000; // default 1 hour

// ------------------------------
// Cache utilities
// ------------------------------
export function clearContactUsCache() {
  CONTACT_US_CACHE.data = undefined;
  CONTACT_US_CACHE.expiresAt = undefined;
  CONTACT_US_CACHE.promise = undefined;
}

export function getContactUsCacheInfo() {
  return {
    hasData: Boolean(CONTACT_US_CACHE.data),
    expiresAt: CONTACT_US_CACHE.expiresAt ?? null,
    ttlMs: CACHE_TTL_MS,
  };
}

// ------------------------------
// Fetch Contact Us data
// ------------------------------
export async function fetchContactUs(
  forceRevalidate = false
): Promise<ContactUsData> {
  // Return cached data if still valid
  if (
    !forceRevalidate &&
    CONTACT_US_CACHE.data &&
    CONTACT_US_CACHE.expiresAt &&
    Date.now() < CONTACT_US_CACHE.expiresAt
  ) {
    return CONTACT_US_CACHE.data;
  }

  // Reuse in-flight request if available
  if (!forceRevalidate && CONTACT_US_CACHE.promise) {
    return CONTACT_US_CACHE.promise;
  }

  const fetchPromise = (async () => {
    const url = buildUrl();
    const headers = buildHeaders();

    try {
      const res = await fetch(url, {
        headers,
        next: { revalidate: 60 * 60 }, // Next.js ISR hint (1h)
      });

      if (!res.ok) {
        console.error(
          "Failed to fetch Contact Us data:",
          res.status,
          res.statusText
        );
        return DEFAULT_CONTACT_US;
      }

      const json = await safeJson(res);
      if (!json) return DEFAULT_CONTACT_US;

      const normalized = normalizeContactUs(json);

      // Cache result
      CONTACT_US_CACHE.data = normalized;
      CONTACT_US_CACHE.expiresAt = Date.now() + CACHE_TTL_MS;

      return normalized;
    } catch (error) {
      console.error("Error fetching Contact Us data:", error);
      return DEFAULT_CONTACT_US;
    } finally {
      CONTACT_US_CACHE.promise = undefined;
    }
  })();

  CONTACT_US_CACHE.promise = fetchPromise;
  return fetchPromise;
}
