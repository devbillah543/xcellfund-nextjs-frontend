/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/common/Container";
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
    <section className="relative w-full h-[379px] md:h-[519px] overflow-hidden bg-gray-100">
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

      {/*
        Header is position:absolute over this banner. Padding-top matches
        that overlay so justify-center balances the title in the remaining space.
      */}
      <Container className="relative z-10 h-full flex flex-col items-start justify-center pt-[6.5rem] md:pt-[7.75rem] text-white text-left">
        {title && (
          <h1 className="flex items-center gap-4 m-0 text-[26px] md:text-6xl font-normal prata leading-none">
            <span
              aria-hidden="true"
              className="h-16 w-px shrink-0 bg-gray-500 md:h-32"
            />
            <span>{title}</span>
          </h1>
        )}
        {subtitle && <p className="m-0 mt-3 text-lg md:text-2xl">{subtitle}</p>}
      </Container>
    </section>
  );
};

export default Hero;
