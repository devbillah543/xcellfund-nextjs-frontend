import React from "react";
import { fetchCommonData } from "@/services/commonService";
import InternetAdvertising from "@/pages/InternetAdvertising";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("internetAdvertising");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Internet Advertising",
    description: seo.metaDescription || "Welcome to our internet advertising page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function InternetAdvertisingPage() {
  return <InternetAdvertising />;
}
