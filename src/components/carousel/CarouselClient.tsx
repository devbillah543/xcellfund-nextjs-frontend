"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import ScrollButton from "@/components/carousel/ScrollButton";
import { getCarouselImageUrl } from "./carouselImage";

type MediaFormat = { url: string; width: number; height: number };
export type Media = {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats?: {
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
    webp?: MediaFormat;
  };
};
export type CarouselItem = {
  id: number;
  title: string;
  description: string;
  image: Media;
};

interface CarouselClientProps {
  items: CarouselItem[];
  interval?: number;
}

export default function CarouselClient({
  items,
  interval = 6000,
}: CarouselClientProps) {
  const [current, setCurrent] = useState(0);
  const [animBorder, setAnimBorder] = useState("animate-ltr");
  const [animTitle, setAnimTitle] = useState("animate-ttb");
  const [animDesc, setAnimDesc] = useState("animate-btt");
  const [lineHeight, setLineHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [autoplayReady, setAutoplayReady] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const slide = items[current];

  const directions = [
    "animate-ltr",
    "animate-rtl",
    "animate-ttb",
    "animate-btt",
  ];

  const changeSlide = useCallback(
    (next = true) => {
      setCurrent((prev) =>
        next ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length
      );
      setAnimBorder(directions[Math.floor(Math.random() * directions.length)]);
      setAnimTitle(directions[Math.floor(Math.random() * directions.length)]);
      setAnimDesc(directions[Math.floor(Math.random() * directions.length)]);
    },
    [items.length]
  );

  const nextSlide = () => changeSlide(true);
  const prevSlide = () => changeSlide(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Defer autoplay well past Lighthouse's LCP window on mobile
  useEffect(() => {
    const id = setTimeout(() => setAutoplayReady(true), 10000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!autoplayReady || !isVisible || items.length < 2) return;

    const timer = setInterval(() => changeSlide(true), interval);
    return () => clearInterval(timer);
  }, [autoplayReady, isVisible, interval, items.length, changeSlide]);

  useLayoutEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current]);

  const isFirstSlide = current === 0;

  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* Later slides: opaque layer so SSR first-slide copy stays hidden underneath */}
      {!isFirstSlide && (
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 animate-zoomSlow">
            <Image
              src={getCarouselImageUrl(slide.image)}
              alt={slide.image.alternativeText || slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              quality={70}
            />
          </div>

          <div className="absolute inset-0 flex items-center text-white">
            <Container className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-24">
              <div
                className={`hidden md:block w-px bg-gray-400 ${animBorder}`}
                style={{ height: `${lineHeight}px` }}
              />

              <div
                className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
                ref={textRef}
              >
                <h2
                  className={`text-4xl md:text-[62px] prata font-light leading-[39px] md:leading-[82px] max-w-[690px] ${animTitle}`}
                >
                  {slide.title}
                </h2>

                <div
                  className={`lato text-[16px] md:text-2xl font-light leading-[25px] md:leading-9 mt-4 max-w-[725px] ${animDesc}`}
                  dangerouslySetInnerHTML={{ __html: slide.description }}
                />
              </div>
            </Container>
          </div>
        </div>
      )}

      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
