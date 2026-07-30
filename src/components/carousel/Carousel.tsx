import Image from "next/image";
import CarouselClient, { type CarouselItem } from "./CarouselClient";
import { getCarouselImageUrl } from "./carouselImage";

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
}

/**
 * Server wrapper: paints the first slide image in HTML (no JS required for LCP).
 * Client layer handles slide changes / controls.
 */
export default function Carousel({ items, interval = 6000 }: CarouselProps) {
  if (!items?.length) return null;

  const first = items[0];
  const lcpSrc = getCarouselImageUrl(first.image);

  return (
    <div className="relative w-full h-[470px] md:h-[745px] overflow-hidden bg-[#1a1a1a]">
      {/* LCP image — in initial HTML, independent of client hydration */}
      <Image
        src={lcpSrc}
        alt={first.image.alternativeText || first.title}
        fill
        priority
        fetchPriority="high"
        quality={70}
        sizes="100vw"
        className="absolute inset-0 object-cover"
      />

      <CarouselClient items={items} interval={interval} />
    </div>
  );
}
