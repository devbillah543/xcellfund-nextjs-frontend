"use client";

import React from "react";
import LinkItem from "../LinkItem";
import { useGlobal } from "@/providers/GlobalProvider";

export default function Copyright() {
  const { global, loading } = useGlobal();

  // Show nothing if global is not loaded yet
  if (!global && !loading) return null;

  const data = global?.footer?.copyright;

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 p-4">
        {/* Left: Links with vertical divider */}
        <nav className="flex flex-wrap justify-center md:justify-start items-center gap-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-16 md:w-20 bg-gray-300 rounded animate-pulse"
                ></div>
              ))
            : data?.links?.map((link: any, index: number) => {
                const href =
                  link.url_type === "email"
                    ? `mailto:${link.url}`
                    : link.url_type === "phone"
                    ? `tel:${link.url}`
                    : link.url;
                const label = link.label?.text ?? link.label;
                const newTab = !!(link.openInNewTab ?? link.new_tab ?? false);

                return (
                  <React.Fragment key={link.id}>
                    <LinkItem
                      href={href}
                      label={label}
                      newTab={newTab}
                      className="text-[#cbcbcb] hover:text-[#cfb795] transition-colors duration-200"
                      fontSize={12}
                    />
                    {index < data.links.length - 1 && (
                      <span className="h-4 border-l border-[#cfb795] opacity-50 mx-2"></span>
                    )}
                  </React.Fragment>
                );
              })}
        </nav>

        {/* Right: Copyright Text */}
        {loading ? (
          <div className="h-4 w-32 md:w-40 bg-gray-300 rounded animate-pulse mt-2 md:mt-0"></div>
        ) : (
          <p className="text-xs md:text-sm text-[#cbcbcb] text-center md:text-right">
            {data?.text?.replace("Â©", "©")}
          </p>
        )}
      </div>
    </div>
  );
}
