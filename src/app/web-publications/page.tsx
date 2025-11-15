import React from "react";
import { fetchCommonData } from "@/services/commonService";
import WebPublication from "@/pages/WebPublication";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("webPublication");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Web Publications",
    description: seo.metaDescription || "Welcome to our web publications page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function WebPublicationsPage() {
  return <WebPublication />;
}
