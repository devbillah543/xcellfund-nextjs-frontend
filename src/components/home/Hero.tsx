"use client";

import { useHome } from "@/hooks/useHome";
import React from "react";
import Carousel from "../common/carousel/Carousel";

export default function Hero() {
  const { homeData, loading, error } = useHome();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div className="w-full">
    <Carousel items={homeData?.carousel?.items} />
  </div>;
}
