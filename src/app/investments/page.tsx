import React from "react";
import { fetchInvestment } from "@/services/investmentService";
import Investment from "@/pages/Investment";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchInvestment();
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Investment Page",
    description: seo.metaDescription || "Welcome to our investment page",
  };
}

// ✅ ISR Investment Page
export default async function InvestmentPage() {
  return <Investment />;
}
