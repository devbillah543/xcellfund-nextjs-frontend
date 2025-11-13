import React from "react";
import { fetchCommonData } from "@/services/commonService";
import DebtRestructuring from "@/pages/DebtRestructuring";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("debtRestructuring");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Debt Restructuring",
    description: seo.metaDescription || "Welcome to our debt restructuring page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function DebtRestructuringPage() {
  return <DebtRestructuring />;
}
