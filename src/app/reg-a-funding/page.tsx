import React from "react";
import { fetchCommonData } from "@/services/commonService";
import RegAFunding from "@/pages/RegAFunding";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("regAFunding");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Reg A Funding",
    description: seo.metaDescription || "Welcome to our Reg A funding page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function RegAFundingPage() {
  return <RegAFunding />;
}
