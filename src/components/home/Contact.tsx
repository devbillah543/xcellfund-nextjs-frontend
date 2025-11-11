"use client";
import { useHome } from "@/hooks/useHome";
import React from "react";
import config from "@/config";
import Link from "next/link";

// ------------------------------
// Contact Page Component
// ------------------------------
export default function Contact() {
  const { homeData, loading } = useHome();
  const banner = homeData?.contact_banner;

  const isLoading = Boolean(loading) || !homeData;

  return (
    <section className="relative w-full h-[40vh] flex items-center justify-center text-center text-white overflow-hidden">
      {isLoading ? (
        <>
          <div className="absolute inset-0 bg-gray-200 opacity-100 animate-pulse" aria-hidden />
          <div className="relative z-10 p-6 w-full">
            <div className="max-w-2xl mx-auto">
              <div className="h-10 bg-gray-300 rounded mb-4 animate-pulse w-3/4 mx-auto" />
              <div className="h-4 bg-gray-300 rounded mb-6 animate-pulse w-1/2 mx-auto" />
              <div className="h-10 bg-gray-400 rounded animate-pulse w-32 mx-auto" />
            </div>
          </div>
        </>
      ) : (
        <>
          {banner?.background && <BackgroundImage image={banner.background} />}
          {homeData && (
            <div className="relative z-10 p-6">
              <h2 className="text-4xl font-bold mb-4 capitalize tracking-[6px]">{banner?.card?.title}</h2>
              <p className="max-w-2xl mx-auto">{banner?.card?.subtitle}</p>
              <Link
                href={banner?.card?.link?.url || "#"}
                className="mt-4 inline-block px-6 py-3 bg-gray-600 text-white rounded text-sm font-semibold uppercase hover:bg-[#c6ac83] transition-colors"
              >
                {banner?.card?.link?.label}
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// ------------------------------
// Background Image Component
// ------------------------------
interface BackgroundProps {
  url?: string;
  formats?: {
    thumbnail?: { url?: string };
    small?: { url?: string };
  };
}

const BackgroundImage = ({ image }: { image?: BackgroundProps }) => {
  if (!image?.url) return null;

  const baseUrl = (config.API_URL || "").replace(/\/$/, "");
  const bgUrl = `${baseUrl}${image.url}`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
      style={{ backgroundImage: `url(${bgUrl})` }}
    />
  );
};
