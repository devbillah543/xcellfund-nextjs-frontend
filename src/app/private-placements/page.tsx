import React from "react";
import { fetchPrivatePlacement } from "@/services/privateplacementService";
import PrivatePlacement from "@/pages/PrivatePlacement";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchPrivatePlacement();
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Private Placements",
    description: seo.metaDescription || "Welcome to our private placement page",
  };
}

// ✅ ISR Private Placement Page
export default async function PrivatePlacementPage() {
  return <PrivatePlacement />;
}
