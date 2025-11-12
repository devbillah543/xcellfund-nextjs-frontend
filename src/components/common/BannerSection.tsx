"use client";
import React from "react";
import Link from "next/link";
import config from "@/config";


interface BackgroundProps {
  url?: string;
  formats?: {
    thumbnail?: { url?: string };
    small?: { url?: string };
  };
}

interface BannerSectionProps {
  title?: string;
  subtitle?: string;
  link?: { url?: string; label?: string };
  background?: BackgroundProps;
  loading?: boolean;
  height?: string; // allow custom height like "h-[40vh]"
}

export default function BannerSection({
  title,
  subtitle,
  link,
  background,
  loading = false,
  height = "h-[40vh]",
}: BannerSectionProps) {
  const isLoading = loading;

  return (
    <section
      className={`relative w-full ${height} flex items-center justify-center text-center text-white overflow-hidden`}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {background && <BackgroundImage image={background} />}
          <div className="relative z-10 p-6">
            {title && <h2 className="text-4xl font-bold mb-4 capitalize tracking-[6px]">{title}</h2>}
            {subtitle && <p className="max-w-2xl mx-auto">{subtitle}</p>}
            {link?.url && (
              <Link
                href={link.url}
                className="mt-4 inline-block px-6 py-3 bg-gray-600 text-white rounded text-sm font-semibold uppercase hover:bg-[#c6ac83] transition-colors"
              >
                {link.label || "Learn More"}
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}

// ------------------------------
// Background Image Subcomponent
// ------------------------------
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

// ------------------------------
// Loading Skeleton Subcomponent
// ------------------------------
const LoadingSkeleton = () => (
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
);
