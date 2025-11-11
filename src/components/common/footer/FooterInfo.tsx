"use client";

import React from "react";
import Image from "next/image";
import { useGlobal } from "@/providers/GlobalProvider";
import LinkItem from "../LinkItem";
import config from "@/config";

export default function FooterInfo() {
  const { global, loading } = useGlobal();
  if (!global && !loading) return null;

  const branding = global?.footer?.branding;
  const quicklinks = global?.footer?.quicklinks;
  const location = global?.footer?.location;

  return (
    <footer className="w-full bg-[#f9f9f9] py-10 px-5 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Branding */}
        <div className="flex-1 flex flex-col items-start gap-4">
          {loading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="w-32 h-10 bg-gray-300 rounded"></div>
              <div className="w-48 h-4 bg-gray-300 rounded"></div>
              <div className="w-36 h-3 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              {branding?.logo && (
                <Image
                  loader={({ src }) => src}
                  src={`${config.API_URL}${branding.logo.url}`}
                  alt={branding.logo.alternativeText || branding.brand_name || "Brand Logo"}
                  width={branding.logo.width || 150}
                  height={branding.logo.height || 50}
                />
              )}
              {branding?.description && (
                <p className="text-gray-800 text-base">{branding.description}</p>
              )}
              {branding?.tagline && (
                <p className="text-gray-800 italic">{branding.tagline}</p>
              )}
            </>
          )}
        </div>

        {/* Quick Links */}
        <div className="flex-1 flex flex-col items-start gap-2">
          {loading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-32 h-3 bg-gray-300 rounded"></div>
              ))}
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-gray-800 mb-2">{quicklinks?.title || "Quick Links"}</h4>
              <nav className="flex flex-col items-start gap-2 text-left">
                {quicklinks?.links?.map((link: any) => (
                  <LinkItem
                    key={link.id}
                    href={link.url}
                    label={link.label}
                    newTab={link.openInNewTab ?? false}
                    className="text-gray-800 hover:text-black transition-colors duration-200"
                    fontSize={14}
                  />
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Location */}
        <div className="flex-1 flex flex-col items-start gap-2">
          {loading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-40 h-3 bg-gray-300 rounded"></div>
              <div className="w-32 h-3 bg-gray-300 rounded"></div>
              <div className="w-24 h-3 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-gray-800 mb-2">{location?.title || "Location"}</h4>
              {location?.address && (
                <p className="text-gray-800 whitespace-pre-line">{location.address}</p>
              )}
              {location?.email && (
                <LinkItem
                  href={`mailto:${location.email.url}`}
                  label={location.email.label}
                  className="text-[#cfb795] transition-colors duration-200"
                  fontSize={14}
                />
              )}
              {location?.phone && (
                <LinkItem
                  href={`tel:${location.phone.url}`}
                  label={location.phone.label}
                  className="text-gray-800 transition-colors duration-200"
                  fontSize={14}
                />
              )}
            </>
          )}
        </div>

      </div>
    </footer>
  );
}
