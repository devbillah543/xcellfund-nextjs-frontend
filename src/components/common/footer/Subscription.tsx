"use client";

import { useGlobal } from "@/providers/GlobalProvider";
import { getSocialIcon } from "@/utils/socialIcon";
import React from "react";
import LinkItem from "../LinkItem";

export default function Subscription() {
  const { global, loading } = useGlobal();

  const placeholder =
    global?.footer?.subscription?.input?.placeholder || "Enter your email";
  const buttonText = global?.footer?.subscription?.input?.label || "Subscribe";

  return (
    <div className="w-full bg-[#2b3034] p-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4">

        {/* Subscription Form */}
        {loading ? (
          <div className="flex flex-row items-center gap-2 w-full md:w-1/3 animate-pulse">
            <div className="flex-1 h-10 bg-gray-300 rounded-l"></div>
            <div className="w-24 h-10 bg-gray-300 rounded-r"></div>
          </div>
        ) : (
          <form
            className="flex flex-row items-center gap-2 w-full md:w-1/3 bg-white rounded"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={placeholder}
              className="p-2 rounded-l w-full text-black placeholder-gray-500 focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="bg-[#cfb795] text-white px-4 py-2 rounded-r hover:bg-[#bfa47e] transition-colors duration-200 shrink-0"
            >
              {buttonText}
            </button>
          </form>
        )}

        {/* Social Icons */}
        <nav className="flex gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-300 rounded animate-pulse"
                ></div>
              ))
            : global?.footer?.subscription?.social_links?.map((item: any) => {
                const href =
                  item.url_type === "email"
                    ? `mailto:${item.url}`
                    : item.url_type === "phone"
                    ? `tel:${item.url}`
                    : item.url;

                const label = item.label?.text ?? item.label;
                const newTab = !!(item.open_in_new_tab ?? item.new_tab ?? false);
                const icon = getSocialIcon({
                  social_media_platform: item.social_media_platform,
                  size: 18,
                });

                return (
                  <LinkItem
                    key={item.id}
                    href={href}
                    icon={item.iconify ? icon : null}
                    label={label}
                    newTab={newTab}
                    className="flex items-center gap-2 text-white hover:text-[#cfb795] transition-colors"
                    fontSize={14}
                  />
                );
              })}
        </nav>

      </div>
    </div>
  );
}
