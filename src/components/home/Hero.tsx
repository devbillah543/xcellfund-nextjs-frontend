"use client";

import { useHome } from "@/hooks/useHome";
import React from "react";
import Carousel from "../common/carousel/Carousel";

export default function Hero() {
  const { homeData, loading, error } = useHome();

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        {/* Skeleton banner */}
        <div className="w-full h-[400px] bg-gray-300/50 rounded-lg" />
      </div>
    );
  }

  return <div className="w-full">
    <Carousel items={homeData?.carousel?.items} />
  </div>;
}
