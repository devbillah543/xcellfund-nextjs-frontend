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

/**
 * Fetch home page data (seo + carousel)
 * Works on both server and client
 */
export async function fetchHome(): Promise<GlobalData> {
  const url = buildUrl();
  const headers = buildHeaders();

  try {
    const res = await fetch(url, {
      headers,
      // Next.js-specific option — harmless in browser; adjust/remove if not using Next
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      console.error("Failed to fetch home data:", res.status, res.statusText);
      return DEFAULT_GLOBAL;
    }

    const json = await safeJson(res);
    if (!json) return DEFAULT_GLOBAL;

    const normalized = normalizeHome(json);
    return normalized;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return DEFAULT_GLOBAL;
  }
}
