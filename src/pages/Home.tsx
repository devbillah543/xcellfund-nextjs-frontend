"use client";

import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import Services from "@/components/home/Services";
import WhoAreWe from "@/components/home/WhoAreWe";
import WhoAreWeBanner from "@/components/home/WhoAreWeBanner";
import React from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Services />
      <WhoAreWe />
      <WhoAreWeBanner />
      <Highlights />
    </div>
  );
}
