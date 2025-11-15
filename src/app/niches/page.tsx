import React from "react";
import { fetchCommonData } from "@/services/commonService";
import StockLoan from "@/pages/StockLoan";
import Niche from "@/pages/Niche";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("niche");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Niches",
    description: seo.metaDescription || "Welcome to our niches page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function NichesPage() {
  return <Niche />;
}
