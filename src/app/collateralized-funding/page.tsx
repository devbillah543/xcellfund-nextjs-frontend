import React from "react";
import { fetchCommonData } from "@/services/commonService";
import CollateralizedFunding from "@/pages/CollateralizedFunding";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("collateralizedFunding");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Collateralized Funding",
    description: seo.metaDescription || "Welcome to our collateralized funding page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function CollateralizedFundingPage() {
  return <CollateralizedFunding  />;
}
