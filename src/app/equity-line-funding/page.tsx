import React from "react";
import { fetchCommonData } from "@/services/commonService";
import EquityLineFunding from "@/pages/EquityLineFunding";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("equityLineFunding");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Equity Line Funding",
    description: seo.metaDescription || "Welcome to our equity line funding page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function EquityLineFundingPage() {
  return <EquityLineFunding />;
}
