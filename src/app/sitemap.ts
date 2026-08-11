import type { MetadataRoute } from "next";
import appConfig from "@/config/app.config";

const baseUrl = appConfig.appUrl.replace(/\/$/, "");

const weeklyRoutes = [
  "investments",
  "partnerships",
  "private-placements",
  "seed-investment",
];

const lowPriorityRoutes = ["privacy-policy", "terms-of-service"];

const otherRoutes = [
  "collateralized-funding",
  "contact-us",
  "convertible-debentures",
  "corporate-accountability",
  "corporate-focus",
  "corporate-responsibility",
  "corporate-sustainability",
  "debt-restructuring",
  "desktop-software",
  "employee-pride",
  "equity-line-funding",
  "executive-viewpoint",
  "international-impact",
  "internet-advertising",
  "investment-strategy",
  "investors",
  "mobile-applications",
  "niches",
  "our-strategy",
  "partnership-process",
  "partnership-strategy",
  "partnership-vs-investment",
  "philanthropy",
  "reg-a-funding",
  "saas-solutions",
  "series-d-funding",
  "stock-loans",
  "vision-and-goals",
  "web-properties",
  "web-publications",
  "web-technologies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...weeklyRoutes.map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...lowPriorityRoutes.map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...otherRoutes.map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
