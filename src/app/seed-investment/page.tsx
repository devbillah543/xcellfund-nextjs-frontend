import React from "react";
import { fetchCommonData } from "@/services/commonService";
import SeedInvestment from "@/pages/SeedInvestment";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("seedInvestment");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Seed Investment",
    description: seo.metaDescription || "Welcome to our seed investment page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function SeedInvestmentPage() {
  return <SeedInvestment />;
}
