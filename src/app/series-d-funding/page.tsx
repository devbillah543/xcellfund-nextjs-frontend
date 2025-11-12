import React from "react";
import Investment from "@/pages/Investment";
import { fetchSeriesFunding } from "@/services/seriesfundingService";
import SeriesFunding from "@/pages/SeriesFunding";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchSeriesFunding();
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Series D+ Funding",
    description: seo.metaDescription || "Welcome to our Series D+ Funding page",
  };
}

// ✅ ISR Series Funding Page
export default async function SeriesFundingPage() {
  return <SeriesFunding />;
}
