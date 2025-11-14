import React from "react";
import { fetchCommonData } from "@/services/commonService";
import PartnershipProcess from "@/pages/PartnershipProcess";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("partnershipProcess");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Partnership Process",
    description: seo.metaDescription || "Welcome to our partnership process page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function PartnershipProcessPage() {
  return <PartnershipProcess />;
}
