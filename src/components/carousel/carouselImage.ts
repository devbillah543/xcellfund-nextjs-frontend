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

/** Prefer medium/small for faster mobile LCP; Next optimizer still serves DPR variants. */
export function getCarouselImageUrl(image: Media) {
  return getAbsoluteUrl(
    image.formats?.medium?.url ??
      image.formats?.small?.url ??
      image.formats?.large?.url ??
      image.url
  );
}

export function buildLcpImageHref(imageUrl: string, width: number, quality = 70) {
  return `/_next/image?url=${encodeURIComponent(imageUrl)}&w=${width}&q=${quality}`;
}

/** Mobile-first srcset for LCP preload (matches Next default deviceSizes). */
export function buildLcpPreloadSrcSet(imageUrl: string, quality = 70) {
  const widths = [640, 750, 828, 1080, 1200, 1920];
  return widths
    .map((w) => `${buildLcpImageHref(imageUrl, w, quality)} ${w}w`)
    .join(", ");
}
