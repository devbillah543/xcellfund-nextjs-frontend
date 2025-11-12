"use client";
import Image from "next/image";
import React from "react";
import config from "@/config";

const STRAPI_URL = config.API_URL || "";

type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string | null;
  width?: number;
  height?: number;
  size?: number;
  sizeInBytes?: number;
  url: string;
};

type ImageFormats = {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
  [key: string]: ImageFormat | undefined;
};

export type BackgroundImage = {
  id: number;
  documentId?: string | null;
  name?: string | null;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: ImageFormats | null;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string | null;
  previewUrl?: string | null;
  provider?: string | null;
  provider_metadata?: any;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type HeroType = {
  id?: number;
  title?: string | null;
  subtitle?: string | null;
  background_image?: BackgroundImage | null;
};

type Props = {
  hero?: HeroType;
  loading?: boolean;
};

// Utility: choose the best available image
function pickBestImageUrl(bg?: BackgroundImage | null): string | null {
  if (!bg) return null;
  const f = bg.formats;
  const candidate =
    f?.large?.url ??
    f?.medium?.url ??
    f?.small?.url ??
    f?.thumbnail?.url ??
    bg.url ??
    null;
  if (!candidate) return null;

  if (candidate.startsWith("http://") || candidate.startsWith("https://"))
    return candidate;

  const prefix = STRAPI_URL.replace(/\/$/, "");
  return prefix ? `${prefix}${candidate}` : candidate;
}

export default function Hero({ hero, loading }: Props) {
  const imageUrl = pickBestImageUrl(hero?.background_image);
  const alt =
    hero?.background_image?.alternativeText ?? hero?.title ?? "Hero background";

  // ----------------------------------
  // Loading Placeholder (Skeleton)
  // ----------------------------------
  if (loading || !hero) {
    return (
      <header
        aria-label="Loading hero"
        className="relative w-full overflow-hidden"
      >
        <div className="relative w-full min-h-[450px] md:min-h-[420px] lg:min-h-[500px]">
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 md:px-8 z-10">
            <div className="space-y-4 w-full max-w-2xl">
              <div className="h-10 bg-gray-400/60 rounded w-3/4 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-400/50 rounded w-1/2 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ----------------------------------
  // Actual Hero Content
  // ----------------------------------
  return (
    <header
      aria-label={hero?.title ?? "Hero"}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full min-h-[450px] md:min-h-[420px] lg:min-h-[500px]">
        {imageUrl ? (
          <Image
            loader={({ src }) => src}
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800/40" />
        )}

        {/* overlay */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* centered text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 md:px-8 z-10">
          <div className="text-white">
            {hero?.title && (
              <h1 className="flex flex-nowrap gap-4 items-center justify-center text-3xl md:text-5xl font-semibold leading-tight">
                <span className="h-20 w-px bg-gray-400 inline-block"></span>
                <span>{hero.title}</span>
              </h1>
            )}

            {hero?.subtitle && (
              <p className="mt-4 text-base md:text-lg max-w-3xl opacity-90 mx-auto">
                {hero.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
