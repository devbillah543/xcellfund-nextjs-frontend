"use client";

import { useHome } from "@/hooks/useHome";
import Link from "next/link";
import React from "react";

export default function WhoAreWe() {
  const { homeData, loading } = useHome();

  return (
    <div className="bg-[#2b3034]">
      <div
        className="bg-[radial-gradient(circle_at_center,#363e44_0%,#202326_100%)]
                   opacity-100 
                   transition-[background,border-radius,opacity] duration-300 
                   py-16 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-0"
      >
        {/* Left */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end md:pr-4">
          {loading ? (
            <LeftSkeleton />
          ) : (
            <LeftContent {...homeData?.who_we_are?.left_content} />
          )}
        </div>

        {/* Vertical line (hidden on mobile) */}
        <div className="hidden md:block w-px bg-[#ffffff33] h-52 mx-4"></div>

        {/* Right */}
        <div className="w-full md:w-3/5 flex justify-center md:justify-start md:pl-4">
          {loading ? (
            <RightSkeleton />
          ) : (
            <RightContent {...homeData?.who_we_are?.right_content} />
          )}
        </div>
      </div>
    </div>
  );
}

interface LeftContentProps {
  title: string;
  description: string;
}

const LeftContent = ({ title, description }: LeftContentProps) => (
  <div className="flex flex-col md:flex-row items-start gap-4 md:ps-28">
    {/* Horizontal line (only desktop) */}
    <div className="hidden md:block w-32 h-px bg-[#ffffff33] mt-3"></div>

    {/* Text */}
    <div className="flex flex-col items-start text-left">
      <div className="text-white uppercase text-lg">{title}</div>
      <h1 className="text-[#c6ac83] text-3xl md:text-4xl font-bold tracking-tight leading-snug mt-3">
        {description}
      </h1>
    </div>
  </div>
);

interface RightContentProps {
  description: string;
  link: {
    url: string;
    label: string;
  };
}

const RightContent = ({ description, link }: RightContentProps) => (
  <div className="flex flex-col w-full md:w-1/2 text-left md:text-left pb-10 md:pb-0">
    <p className="text-[#cbd2d7] text-[14px] tracking-widest leading-relaxed">
      {description}
    </p>

    {link?.url && link?.label && (
      <Link
        href={link.url}
        className="bg-[#c6ac83] px-3 py-2 text-white rounded text-sm font-semibold uppercase
             transition-all duration-300 ease-in-out hover:bg-[#2b3034] mt-6 inline-block w-fit"
      >
        {link.label}
      </Link>
    )}
  </div>
);

/* ----------------------------
   🩶 Skeleton Placeholders
-----------------------------*/

const LeftSkeleton = () => (
  <div className="flex flex-col md:flex-row items-start gap-4 md:ps-28 animate-pulse">
    <div className="hidden md:block w-32 h-px bg-white/10 mt-3"></div>
    <div className="flex flex-col items-start text-left">
      <div className="w-32 h-5 bg-white/10 rounded mb-3"></div>
      <div className="w-60 h-8 bg-white/10 rounded mb-2"></div>
      <div className="w-48 h-8 bg-white/10 rounded"></div>
    </div>
  </div>
);

const RightSkeleton = () => (
  <div className="flex flex-col w-full md:w-1/2 text-left md:text-left pb-10 md:pb-0 animate-pulse">
    <div className="space-y-2">
      <div className="w-full h-4 bg-white/10 rounded"></div>
      <div className="w-5/6 h-4 bg-white/10 rounded"></div>
      <div className="w-3/4 h-4 bg-white/10 rounded"></div>
      <div className="w-2/3 h-4 bg-white/10 rounded"></div>
    </div>
    <div className="w-28 h-8 bg-[#c6ac83]/30 rounded mt-6"></div>
  </div>
);
