import { getAbsoluteUrl } from "@/utils/assetUrl";

type MediaFormat = { url: string; width?: number; height?: number };
type Media = {
  url: string;
  formats?: {
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
    webp?: MediaFormat;
  };
};

/** Prefer original/large — medium is too small and upscales poorly for LCP. */
export function getCarouselImageUrl(image: Media) {
  return getAbsoluteUrl(
    image.url ||
      image.formats?.large?.url ||
      image.formats?.medium?.url ||
      image.formats?.small?.url ||
      ""
  );
}

export function buildLcpImageHref(imageUrl: string, width: number, quality = 70) {
  return `/_next/image?url=${encodeURIComponent(imageUrl)}&w=${width}&q=${quality}`;
}
