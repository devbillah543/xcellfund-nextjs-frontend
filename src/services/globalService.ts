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

/**
 * Fetch global layout data (Header + Footer + Topbar)
 * Works on both server and client
 */
export async function fetchGlobal(): Promise<GlobalData> {
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
    return normalized;
  } catch (error) {
    console.error("Error fetching global data:", error);
    return DEFAULT_GLOBAL;
  }
}
