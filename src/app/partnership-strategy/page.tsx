import React from "react";
import { fetchCommonData } from "@/services/commonService";
import PartnershipStrategy from "@/pages/PartnershipStrategy";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("partnershipStrategy");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Partnership Strategy",
    description: seo.metaDescription || "Welcome to our partnership strategy page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function PartnershipStrategyPage() {
  return <PartnershipStrategy />;
}
