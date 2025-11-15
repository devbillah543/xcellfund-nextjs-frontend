import React from "react";
import { fetchCommonData } from "@/services/commonService";
import DesktopSoftware from "@/pages/DesktopSoftware";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("desktopSoftware");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Desktop Software",
    description: seo.metaDescription || "Welcome to our desktop software page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function DesktopSoftwarePage() {
  return <DesktopSoftware />;
}
