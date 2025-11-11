"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import config from "@/config";
import ScrollButton from "./ScrollButton";

interface ImageFormat {
  url: string;
}

interface ImageData {
  url: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
  };
}

interface Item {
  id: number;
  title: string;
  description: string;
  image: ImageData;
}

interface CarouselProps {
  items: Item[];
}

const animationDirections = [
  { x: 0, y: "-100vh" },
  { x: 0, y: "100vh" },
  { x: "-100vw", y: 0 },
  { x: "100vw", y: 0 },
];

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animTitle, setAnimTitle] = useState({ x: 0, y: "-100vh" });
  const [animDesc, setAnimDesc] = useState({ x: 0, y: "100vh" });
  const [animLine, setAnimLine] = useState({ x: 0, y: "-100vh" });
  const [isPaused, setIsPaused] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  useEffect(() => {
    const randomTitle = animationDirections[Math.floor(Math.random() * 4)];
    const randomDesc = animationDirections[Math.floor(Math.random() * 4)];
    const randomLine = animationDirections[Math.floor(Math.random() * 4)];
    setAnimTitle(randomTitle);
    setAnimDesc(randomDesc);
    setAnimLine(randomLine);
  }, [current]);

  useEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current, items]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  if (!items?.length) return null;

  const slide = items[current];
  const imageUrl = slide.image?.formats?.large?.url || slide.image?.url || "";
  const fullImageUrl = `${config.API_URL}${imageUrl}`;

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image */}
      <motion.div
        key={slide.id}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <Image
          loader={({ src }) => src}
          src={fullImageUrl}
          alt={slide.title}
          fill
          priority
          className="brightness-[0.6]"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex justify-center items-center px-6 md:px-10 text-white">
        <div className="max-w-3xl flex items-start gap-6 md:gap-10 flex-col md:flex-row">
          {/* Animated line — hide on small screen */}
          <motion.div
            key={"line" + current}
            initial={animLine}
            animate={{ x: 0, y: 0, height: lineHeight }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden md:block w-[3px] bg-white"
          />

          {/* Text content */}
          <div ref={textRef} className="flex flex-col text-center md:text-left">
            <motion.h2
              key={slide.title + current}
              initial={animTitle}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-[70px] leading-[1.2] font-bold"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              key={slide.description + current}
              initial={animDesc}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="mt-4 text-sm sm:text-base md:text-lg text-gray-200"
            >
              {slide.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Navigation buttons — hidden on small screen */}
      <div
        onClick={prevSlide}
        className="hidden md:block absolute left-5 top-1/2 -translate-y-1/2"
      >
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div
        onClick={nextSlide}
        className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2"
      >
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
