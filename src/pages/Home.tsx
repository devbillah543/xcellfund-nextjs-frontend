"use client";

import Contact from "@/components/home/Contact";
import Features from "@/components/home/Features";
import Form from "@/components/home/Form";
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
      <Contact />
      <Form />
    </div>
  );
}
