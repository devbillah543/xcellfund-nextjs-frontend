import React from "react";
import { fetchCommonData } from "@/services/commonService";
import SassSolution from "@/pages/SassSolution";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("saasSolution");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "SaaS Solutions",
    description: seo.metaDescription || "Welcome to our SaaS solutions page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function SaasSolutionsPage() {
  return <SassSolution />;
}
