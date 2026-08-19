/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLink from "@/components/common/AppLink";
import Container from "@/components/common/Container";
import React from "react";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import { buildLcpImageHref } from "@/components/carousel/carouselImage";

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

type BannerLink = {
  aria_label?: string;
  external?: boolean;
  label?: string;
  target?: string;
  type?: "text" | "email" | "phone";
  url?: string;
  className?: string;
};

type Props = {
  title: string;
  subtitle: string;
  link: BannerLink;
  background_image: Media;
};

export default function Banner({
  title,
  subtitle,
  background_image,
  link,
}: Props) {
  const src = getAbsoluteUrl(
    background_image.formats?.large?.url ??
      background_image.formats?.medium?.url ??
      background_image.formats?.small?.url ??
      background_image.url
  );
  const bgUrl = buildLcpImageHref(src, 1200, 75);

  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center bg-no-repeat bg-[#1a1a1a]"
      style={{ backgroundImage: `url('${bgUrl}')` }}
      role="img"
      aria-label={
        background_image.alternativeText || title || "Contact banner"
      }
    >
      <Container className="h-full flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-5xl font-normal prata capitalize leading-14 md:leading-[1.2rem] mb-2 md:mb-5 text-white">
          {title}
        </h2>
        <div className="w-32 mx-auto bg-gray-400 h-px relative top-2.5"></div>
        <p className="max-w-2xl mx-auto text-xs lato font-bold mb-5 tracking-[2px] uppercase text-white">
          {subtitle}
        </p>
        {link.label && (
          <AppLink
            aria_label={link.aria_label}
            external={link.external}
            label={link.label}
            target={link.target}
            type={link.type}
            url={link.url}
            className="px-6 py-2 bg-[#333743] rounded text-[15px] font-light uppercase text-white hover:bg-(--sand-500) transition min-h-11 inline-flex items-center"
          />
        )}
      </Container>
    </div>
  );
}
