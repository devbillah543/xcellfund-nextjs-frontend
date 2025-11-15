"use client";

import BannerSection from "@/components/common/BannerSection";
import Hero from "@/components/common/Hero";
import RichtextContent from "@/components/common/rich-text-content/RichtextContent";
import { useCommonPattern } from "@/hooks/useCommonPattern";
import React from "react";

export default function RegAFunding() {
  const { data, loading, error } = useCommonPattern("regAFunding");
  return (
    <div>
      <Hero hero={data?.hero} loading={loading} />
      <div className="py-10">
        <div className="max-w-[1140px] mx-auto px-5 md:px-0">
          <RichtextContent content={data?.content} loading={loading} />
        </div>
      </div>
      <BannerSection
        title={data?.contact_banner.card.title}
        subtitle={data?.contact_banner.card.subtitle}
        link={data?.contact_banner.card.link}
        background={data?.contact_banner.background}
        loading={loading}
      />
    </div>
  );
}
