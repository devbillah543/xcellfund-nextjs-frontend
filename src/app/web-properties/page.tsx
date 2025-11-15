import React from "react";
import { fetchCommonData } from "@/services/commonService";
import WebProperty from "@/pages/WebProperty";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("webProperty");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Web Properties",
    description: seo.metaDescription || "Welcome to our web properties page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function WebPropertiesPage() {
  return <WebProperty />;
}
