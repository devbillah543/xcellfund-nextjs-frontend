/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLink from "@/components/common/AppLink";
import React from "react";
import PicturePreview from "@/components/common/PicturePreview";

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
  return (
    <div className="relative w-full h-[400px] flex justify-center items-center text-center px-6 md:px-12">
      {/* Responsive Picture Background */}
      <div className="absolute inset-0 -z-10">
        <PicturePreview alt_text={title} image={background_image} />
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-normal prata capitalize leading-14 md:leading-[1.2rem] mb-2 md:mb-5 text-white">
          {title}
        </h1>
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
            className="px-6 py-2 bg-[#333743] rounded text-[15px] font-light uppercase text-white hover:bg-(--sand-500) transition"
          />
        )}
      </div>
    </div>
  );
}
