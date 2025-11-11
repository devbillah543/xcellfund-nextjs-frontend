"use client";

import config from "@/config";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhoAreWeBanner() {
  const { homeData, loading } = useHome();

  return (
    <div className="bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center">
        
        {/* Left (Text) */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end pr-0 md:pr-4 mt-8 md:mt-0">
          {loading ? <LeftSkeleton /> : <LeftContent {...homeData?.who_we_are_banner?.content} />}
        </div>

        {/* Right (Images) */}
        <div className="w-full md:w-3/5 flex justify-center md:justify-start pl-0 md:pl-4">
          {loading ? <RightSkeleton /> : <RightContent images={homeData?.who_we_are_banner?.images || []} />}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------
   Left Content & Skeleton
-----------------------------*/
interface LeftContentProps {
  subtitle: string;
  title: string;
  description: string;
  link:{
    url: string;
    label: string;
  }
}

const LeftContent = ({ subtitle, title, description, link }: LeftContentProps) => (
  <div className="flex flex-col md:flex-row items-start gap-4 px-5 md:px-0 pb-10 md:pb-0 md:ps-28">
    <div className="hidden md:block w-32 h-px bg-[#cbd2d7] mt-3"></div>

    <div className="flex flex-col items-start text-left">
      <div className="text-[#909aa3] uppercase">{subtitle}</div>
      <div className="text-[#c6ac83] text-3xl md:text-4xl font-bold tracking-tight leading-snug uppercase mt-4">
        {title}
      </div>
      <p className="text-[#909aa3] text-[14px] tracking-widest mt-4 max-w-md">{description}</p>

      {link && link.url && link.label && (
        <Link
          href={link.url}
          className="mt-6 px-6 py-3 bg-[#c6ac83] text-white rounded text-sm font-semibold uppercase hover:bg-gray-900 transition-colors"
        >
          <span>{link.label}</span>
        </Link>
      )}
    </div>
  </div>
);

const LeftSkeleton = () => (
  <div className="flex flex-col md:flex-row items-start gap-4 px-5 md:px-0 pb-10 md:pb-0 md:ps-28 animate-pulse">
    <div className="hidden md:block w-32 h-px bg-white/10 mt-3"></div>
    <div className="flex flex-col items-start text-left space-y-3">
      <div className="w-24 h-4 bg-white/10 rounded"></div>
      <div className="w-48 h-8 bg-white/10 rounded"></div>
      <div className="w-60 h-4 bg-white/10 rounded"></div>
      <div className="w-32 h-8 bg-[#c6ac83]/30 rounded mt-4"></div>
    </div>
  </div>
);

/* ----------------------------
   Right Content & Skeleton
-----------------------------*/
interface ImageType {
  id?: number;
  name?: string;
  url?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
  };
  width?: number;
  height?: number;
}

interface RightContentProps {
  images: ImageType[];
}

const getSrc = (img?: ImageType) => {
  if (!img) return "";
  const relative = img.formats?.small?.url || img.formats?.thumbnail?.url || img.url || "";
  if (!relative) return "";
  if (relative.startsWith("/")) {
    const base = (config.API_URL || "").replace(/\/$/, "");
    return `${base}${relative}`;
  }
  return relative;
};

const RightContent = ({ images }: RightContentProps) => {
  const hero = images?.[0];
  const left = images?.[1];
  const right = images?.[2];

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full px-5 md:px-0 max-w-5xl relative top-[-60px]">
      <div className="relative flex flex-col gap-0 md:grid md:grid-cols-8">
        {hero && (
          <div className="md:col-start-3 md:col-end-13 overflow-hidden shadow-lg h-[240px] md:h-[360px] relative">
            <Image loader={({ src }) => src} priority src={getSrc(hero)} alt={hero.name || "hero"} fill className="object-cover" />
          </div>
        )}
        {left && (
          <div className="md:col-start-2 md:col-end-4 md:-mt-10 overflow-hidden shadow-md h-[240px] md:h-[180px] relative">
            <Image loader={({ src }) => src} priority src={getSrc(left)} alt={left.name || "left"} fill className="object-cover" />
          </div>
        )}
        {right && (
          <div className="md:col-start-4 md:col-end-13 md:-mt-10 overflow-hidden shadow-md h-[200px] md:h-[240px] relative">
            <Image loader={({ src }) => src} priority src={getSrc(right)} alt={right.name || "right"} fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

const RightSkeleton = () => (
  <div className="w-full px-5 md:px-0 max-w-5xl relative top-[-60px] animate-pulse">
    <div className="relative flex flex-col gap-4 md:grid md:grid-cols-8">
      <div className="md:col-start-3 md:col-end-13 bg-white/10 h-[240px] md:h-[360px] rounded shadow-lg"></div>
      <div className="md:col-start-2 md:col-end-4 md:-mt-10 bg-white/10 h-[240px] md:h-[180px] rounded shadow-md"></div>
      <div className="md:col-start-4 md:col-end-13 md:-mt-10 bg-white/10 h-[200px] md:h-[240px] rounded shadow-md"></div>
    </div>
  </div>
);
