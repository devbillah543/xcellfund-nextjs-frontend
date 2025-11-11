"use client";

import React from "react";
import LinkItem from "../LinkItem";
import { useGlobal } from "@/providers/GlobalProvider";

export default function Copyright() {
  const { global } = useGlobal();
  if (!global) return null;

  const data = global?.footer?.copyright;
  if (!data) return null;

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 p-4">
        {/* Left: Links with vertical divider */}
        <nav className="flex flex-wrap justify-center md:justify-start items-center gap-3">
          {data?.links?.map((link: any, index: number) => {
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
                {/* Add divider except for last link */}
                {index < data.links.length - 1 && (
                  <span className="h-4 border-l border-[#cfb795] opacity-50 mx-2"></span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right: Copyright Text */}
        <p className="text-xs md:text-sm text-[#cbcbcb] text-center md:text-right">
          {data?.text?.replace("Â©", "©")}
        </p>
      </div>
    </div>
  );
}
