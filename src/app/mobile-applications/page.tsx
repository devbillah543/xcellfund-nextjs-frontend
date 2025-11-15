import React from "react";
import { fetchCommonData } from "@/services/commonService";
import MobileApplication from "@/pages/MobileApplication";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("mobileApplication");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Mobile Applications",
    description: seo.metaDescription || "Welcome to our mobile applications page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function MobileApplicationsPage() {
  return <MobileApplication />;
}
