// app/page.tsx
import React from "react";
import { fetchHome } from "@/services/homeService"; // Adjust import path if needed
import Home from "@/pages/Home";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchHome();
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Home Page",
    description: seo.metaDescription || "Welcome to our home page",
  };
}

// ✅ ISR Home Page
export default async function HomePage() {
  return <Home />;
}
