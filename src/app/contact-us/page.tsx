import Contact from "@/pages/Contact";
import { fetchContactUs } from "@/services/contactusService";
import React from "react";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchContactUs();
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Home Page",
    description: seo.metaDescription || "Welcome to our home page",
  };
}

// ✅ ISR Contact Page
export default async function ContactPage() {
  return <Contact />;
}
