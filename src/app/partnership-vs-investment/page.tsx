import React from "react";
import { fetchCommonData } from "@/services/commonService";
import PartnershipVsInvestment from "@/pages/PartnershipVsInvestment";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("partnershipVsInvestment");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Partnership vs Investment",
    description: seo.metaDescription || "Welcome to our partnership vs investment page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function PartnershipVsInvestmentPage() {
  return <PartnershipVsInvestment />;
}
