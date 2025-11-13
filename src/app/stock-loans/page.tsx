import React from "react";
import { fetchCommonData } from "@/services/commonService";
import StockLoan from "@/pages/StockLoan";

// ✅ Dynamic metadata using Strapi SEO data
export async function generateMetadata() {
  const data = await fetchCommonData("stockLoans");
  const seo = data.seo || {};

  return {
    title: seo.metaTitle || seo.title || "Stock Loans",
    description: seo.metaDescription || "Welcome to our stock loans page",
  };
}

// ✅ ISR Debt Restructuring Page
export default async function StockLoansPage() {
  return <StockLoan />;
}
