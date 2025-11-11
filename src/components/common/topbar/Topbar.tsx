"use client";

import React from "react";
import { useGlobal } from "@/providers/GlobalProvider";
import LinkItem from "@/components/common/LinkItem";
import { getSocialIcon } from "@/utils/socialIcon";

export default function Topbar() {
  const { global, loading } = useGlobal();

  return (
    <header className="w-full border-b border-white/20 bg-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* LEFT SECTION — Contacts (Desktop Only) */}
        <nav className="hidden md:flex justify-center items-center gap-4">
          {loading ? (
            // Skeleton placeholders
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-3 rounded bg-white/10 animate-pulse"
              />
            ))
          ) : (
            global?.topbar?.contacts?.contact_links?.map((item: any) => {
              const href =
                item.url_type === "email"
                  ? `mailto:${item.url}`
                  : item.url_type === "phone"
                  ? `tel:${item.url}`
                  : item.url;

              const label = item.label?.text ?? item.label;
              const newTab = !!(item.open_in_new_tab ?? item.new_tab ?? false);
              const icon =
                item.url_type === "email" || item.url_type === "phone"
                  ? getSocialIcon({
                      social_media_platform: item.url_type,
                      size: 12,
                    })
                  : null;

              return (
                <LinkItem
                  key={item.id}
                  href={href}
                  label={label}
                  icon={item.iconify ? icon : null}
                  newTab={newTab}
                  className="flex items-center gap-2 text-[#cbcbcb] hover:text-white"
                  fontSize={12}
                />
              );
            })
          )}
        </nav>

        {/* RIGHT SECTION — Mobile contacts + Socials */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Mobile — only email and phone icons */}
          <div className="flex md:hidden gap-3">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-white/10 animate-pulse"
                  />
                ))
              : global?.topbar?.contacts?.contact_links
                  ?.filter(
                    (item: any) =>
                      item.url_type === "email" || item.url_type === "phone"
                  )
                  .map((item: any) => {
                    const href =
                      item.url_type === "email"
                        ? `mailto:${item.url}`
                        : `tel:${item.url}`;
                    const icon = getSocialIcon({
                      social_media_platform: item.url_type,
                      size: 16,
                    });

                    return (
                      <LinkItem
                        key={item.id}
                        href={href}
                        icon={icon}
                        newTab={false}
                        className="text-[#cbcbcb] hover:text-white"
                        fontSize={16}
                      />
                    );
                  })}
          </div>

          {/* Socials (Always visible) */}
          <nav className="flex gap-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-white/10 animate-pulse"
                  />
                ))
              : global?.topbar?.socials?.social_links?.map((item: any) => {
                  const href =
                    item.url_type === "email"
                      ? `mailto:${item.url}`
                      : item.url_type === "phone"
                      ? `tel:${item.url}`
                      : item.url;
                  const newTab = !!(item.open_in_new_tab ?? item.new_tab ?? false);
                  const icon = getSocialIcon({
                    social_media_platform: item.social_media_platform,
                    size: 16,
                  });

                  return (
                    <LinkItem
                      key={item.id}
                      href={href}
                      icon={item.iconify ? icon : null}
                      newTab={newTab}
                      className="flex items-center gap-2 text-[#cbcbcb] hover:text-white"
                      fontSize={12}
                    />
                  );
                })}
          </nav>
        </div>
      </div>
    </header>
  );
}
