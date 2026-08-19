import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import AppLink from "@/components/common/AppLink";
import { getAbsoluteUrl } from "@/utils/assetUrl";

type IconType = { name: string };

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: IconType | null;
};

type Content = {
  id: number;
  title?: string;
  subtitle?: string;
  description: string;
  link?: LinkItem;
};

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

interface WhoAreWeBannerProps {
  content: Content;
  images: Media[];
}

const getOptimizedImage = (image: Media) =>
  image.formats?.small?.url ??
  image.formats?.medium?.url ??
  image.formats?.large?.url ??
  image.url;

export default function WhoAreWeBanner({ data }: { data: WhoAreWeBannerProps }) {
  return (
    <div className="bg-white md:h-[631px]">
      <Container className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-6">
        {/* Left (Text) */}
        <div className="w-full md:w-[35%] flex justify-center mb-10 md:justify-start">
          <LeftContent {...data.content} />
        </div>

        {/* Right (Images) */}
        <div className="w-full md:w-[65%] flex justify-center md:justify-start">
          <RightContent images={data.images || []} />
        </div>
      </Container>
    </div>
  );
}

const LeftContent = ({ subtitle, title, description, link }: Content) => (
  <div className="w-full flex flex-col items-start text-left">
    <div className="uppercase font-bold text-xs tracking-[2px] text-(--muted-text) lato">
      <div className="w-32 bg-[#cbd2d7] text-gray-400 h-px relative -left-44 top-2.5"></div>
      {subtitle}
    </div>
    <h2 className="text-(--sand-text) text-4xl leading-[1.56em] mt-3 prata">
      {title}
    </h2>
    <p className="text-[#333473] text-lg font-light lato leading-[30px] w-full md:w-[396px]">
      {description}
    </p>

    {link?.url && link.label && (
      <AppLink
        external={link.external}
        target={link.target}
        type={link.type}
        url={link.url}
        className="mt-6 px-6 py-2 bg-(--sand-btn) text-white rounded text-base font-normal lato sentence-case hover:bg-[#333743] transition-colors flex items-center gap-1"
      >
        <span className="sr-only">{title}: </span>
        <span>{link.label}</span>
        <Icon name={link.icon?.name || ""} />
      </AppLink>
    )}
  </div>
);

const RightContent = ({ images }: { images: Media[] }) => {
  const hero = images?.[0];
  const left = images?.[1];
  const right = images?.[2];

  if (!images || images.length === 0) return null;

  const leftW = left?.width || 259;
  const leftH = left?.height || 209;

  return (
    <div className="w-full relative top-[-40px]">
      {/* Mobile — original stacked layout */}
      <div className="flex flex-col gap-0 md:hidden">
        {hero && (
          <div className="overflow-hidden shadow-lg h-60 relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(hero))}
              alt={hero.alternativeText || "Hero Image"}
              width={hero.width}
              height={hero.height}
              className="w-full h-full object-cover"
              quality={75}
              sizes="100vw"
              loading="lazy"
            />
          </div>
        )}
        {left && (
          <div className="overflow-hidden shadow-md h-60 relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(left))}
              alt={left.alternativeText || "Left Image"}
              width={leftW}
              height={leftH}
              className="w-full h-full object-cover"
              quality={70}
              sizes="100vw"
              loading="lazy"
            />
          </div>
        )}
        {right && (
          <div className="overflow-hidden shadow-md h-60 relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(right))}
              alt={right.alternativeText || "Right Image"}
              width={right.width}
              height={right.height}
              className="w-full h-full object-cover"
              quality={70}
              sizes="100vw"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Desktop — collage; left image uses uploaded 259×209 */}
      <div className="relative hidden md:block" style={{ minHeight: 520 }}>
        {hero && (
          <div
            className="absolute top-0 right-0 overflow-hidden shadow-lg"
            style={{ width: "75%", height: 344 }}
          >
            <Image
              src={getAbsoluteUrl(getOptimizedImage(hero))}
              alt={hero.alternativeText || "Hero Image"}
              width={hero.width}
              height={hero.height}
              className="w-full h-full object-cover"
              quality={75}
              sizes="55vw"
              loading="lazy"
            />
          </div>
        )}

        {left && (
          <div
            className="absolute z-10 overflow-hidden shadow-md"
            style={{
              left: "8%",
              top: 304, // sits under hero with overlap (344 - 40)
              width: leftW,
              height: leftH,
            }}
          >
            <Image
              src={getAbsoluteUrl(getOptimizedImage(left))}
              alt={left.alternativeText || "Left Image"}
              width={leftW}
              height={leftH}
              className="object-cover"
              style={{ width: leftW, height: leftH }}
              quality={70}
              sizes={`${leftW}px`}
              loading="lazy"
            />
          </div>
        )}

        {right && (
          <div
            className="absolute overflow-hidden shadow-md"
            style={{
              left: `calc(8% + ${leftW}px)`,
              top: 304,
              right: 0,
              height: 286,
            }}
          >
            <Image
              src={getAbsoluteUrl(getOptimizedImage(right))}
              alt={right.alternativeText || "Right Image"}
              width={right.width}
              height={right.height}
              className="w-full h-full object-cover"
              quality={70}
              sizes="45vw"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};
