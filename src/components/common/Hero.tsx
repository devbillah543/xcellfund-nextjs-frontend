/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAbsoluteUrl } from "@/utils/assetUrl";
import Image from "next/image";
import React from "react";

type MediaFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
    [key: string]: MediaFormat | undefined;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  alt_text?: string;
  image: Media;
  priority?: boolean;
};

const Hero: React.FC<Props> = ({
  title,
  subtitle,
  image,
  alt_text,
  priority = true,
}) => {
  if (!image) return null;

  const src = getAbsoluteUrl(
    image.formats?.large?.url ??
      image.formats?.medium?.url ??
      image.formats?.small?.url ??
      image.url
  );

  return (
    <section className="relative w-full h-[379px] md:h-[519px] overflow-hidden flex items-center justify-center bg-gray-100">
      <Image
        src={src}
        alt={alt_text || image.alternativeText || title || "Hero Image"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={75}
        className="absolute inset-0 w-full h-full object-cover"
        sizes="100vw"
        fill
      />

      <div
        className="
          relative z-10 px-5 py-5
          flex flex-col gap-3
          text-white
          items-start
          justify-end
          bottom-16
          w-full max-w-[1140px] h-full
          text-left md:bottom-20
        "
      >
        {title && (
          <h1 className="flex flex-nowrap gap-4 items-center text-[26px] md:text-6xl font-normal prata">
            <span className="h-16 md:h-32 w-px bg-gray-500 inline-block mr-5 md:mr-10"></span>
            <span>{title}</span>
          </h1>
        )}
        {subtitle && <p className="text-lg md:text-2xl">{subtitle}</p>}
      </div>
    </section>
  );
};

export default Hero;
