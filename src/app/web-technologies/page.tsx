import React from "react";
import { fetchCommonData } from "@/services/commonService";
import WebTechnology from "@/pages/WebTechnology";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("webTechnology");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Web Technologies",
    description: seo.metaDescription || "Welcome to our web technologies page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function WebTechnologiesPage() {
  return <WebTechnology />;
}
