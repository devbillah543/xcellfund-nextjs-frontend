"use client";
import React from "react";
import { useHome } from "@/hooks/useHome";
import Link from "next/link";

export default function Features() {
  const { homeData, loading } = useHome();

  if (loading) {
    // 🔹 Skeleton loader for 4 feature cards
    return (
      <div className="flex flex-wrap justify-center max-w-[1140px] mx-auto relative top-[-125px] px-5 md:px-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full sm:w-1/2 lg:w-1/4 bg-[#414345] flex flex-col justify-center items-center 
                       border-solid border-t-0 border-r border-b-0 border-l-0 border-[#3B3A3A] 
                       py-10 px-6 mb-2 md:mb-0 animate-pulse"
          >
            <div className="w-10 h-10 bg-gray-400/30 rounded-full mb-4"></div>
            <div className="w-3/4 h-5 bg-gray-400/30 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // typed Feature to avoid implicit 'any' in map callback
  type Feature = {
    id: string | number;
    icon?: string | null;
    title?: string | null;
    link?: { url?: string } | string | null;
    [key: string]: any;
  };

  const features: Feature[] = (homeData?.features as Feature[]) ?? [];

  return (
    <div className="flex flex-wrap justify-center max-w-[1140px] mx-auto relative top-[-125px] px-5 md:px-0">
      {features.map((feature) => {
        const linkStr =
          typeof feature.link === "string" ? feature.link : (feature.link?.url ?? "");
        return (
          <Item
            key={feature.id}
            icon={feature.icon ?? ""}
            title={feature.title ?? ""}
            link={linkStr}
          />
        );
      })}
    </div>
  );
}

interface ItemProps {
  icon: string;
  title: string;
  link: string;
}

const Item = ({ icon, title, link }: ItemProps) => {
  return (
    <Link
      href={link || "#"}
      className="w-full sm:w-1/2 lg:w-1/4 bg-[#414345] flex flex-col justify-center items-center 
                 border-solid border-t-0 border-r border-b-0 border-l-0 border-[#3B3A3A] 
                 transition-all duration-300 ease-in-out py-10 px-6 
                 hover:bg-black hover:shadow-md hover:shadow-[#C6AC83]/30 mb-2 md:mb-0"
    >
      <div>
        <i
          aria-hidden="true"
          className={`${icon} text-[#C6AC83] text-[40px]`}
        ></i>
      </div>
      <h2 className="mt-2 text-white text-lg font-medium text-center">
        {title}
      </h2>
    </Link>
  );
};
