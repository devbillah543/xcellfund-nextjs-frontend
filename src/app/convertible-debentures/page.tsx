import React from "react";
import { fetchCommonData } from "@/services/commonService";
import ConvertibleDebenture from "@/pages/ConvertibleDebenture";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("convertibleDebenture");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Convertible Debentures",
    description: seo.metaDescription || "Welcome to our convertible debentures page",
  };
}

// ✅ ISR Convertible Debentures Page
export default async function ConvertibleDebenturesPage() {
  return <ConvertibleDebenture />;
}
