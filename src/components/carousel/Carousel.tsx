import Container from "@/components/common/Container";
import CarouselClient, { type CarouselItem } from "./CarouselClient";
import { buildLcpImageHref, getCarouselImageUrl } from "./carouselImage";

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
}

/**
 * CSS-background LCP hero (avoids object-cover aspect-ratio BP fails).
 * Mobile/desktop URLs match page preloads for cache reuse.
 */
export default function Carousel({ items, interval = 6000 }: CarouselProps) {
  if (!items?.length) return null;

  const first = items[0];
  const lcpSrc = getCarouselImageUrl(first.image);
  const mobileBg = buildLcpImageHref(lcpSrc, 750, 70);
  const desktopBg = buildLcpImageHref(lcpSrc, 1920, 70);

  return (
    <div className="relative w-full h-[470px] md:h-[745px] overflow-hidden bg-[#1a1a1a]">
      <style
        dangerouslySetInnerHTML={{
          __html: `.hero-lcp-bg{background-image:url("${mobileBg}")}@media (min-width:768px){.hero-lcp-bg{background-image:url("${desktopBg}")}}`,
        }}
      />
      <div
        className="hero-lcp-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        role="img"
        aria-label={first.image.alternativeText || first.title}
      />

      <div className="absolute inset-0 flex items-center text-white z-[1] pointer-events-none">
        <Container className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-24">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-[62px] prata font-light leading-[39px] md:leading-[82px] max-w-[690px]">
              {first.title}
            </h1>
            <div
              className="lato text-[16px] md:text-2xl font-light leading-[25px] md:leading-9 mt-4 max-w-[725px]"
              dangerouslySetInnerHTML={{ __html: first.description }}
            />
          </div>
        </Container>
      </div>

      <CarouselClient items={items} interval={interval} />
    </div>
  );
}
