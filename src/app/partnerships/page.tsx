import React from "react";
import { fetchCommonData } from "@/services/commonService";
import Partnership from "@/pages/Parnership";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("partnership");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Partnerships",
    description: seo.metaDescription || "Welcome to our partnerships page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function PartnershipsPage() {
  return <Partnership />;
}
