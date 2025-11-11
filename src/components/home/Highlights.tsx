"use client";
import { useHome } from "@/hooks/useHome";
import React from "react";

export default function Highlights() {
  const { homeData } = useHome();

  return (
    <div className="bg-transparent [background-image:radial-gradient(at_center_center,#1d2022_0%,#202326_100%)] opacity-100 transition-[background,border-radius,opacity] duration-300">
      <div className="max-w-[1140px] mx-auto py-12 px-4">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeData?.highlights?.map((highlight: any) => (
            <Item key={highlight.id} {...highlight} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ItemProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  link?: {
    url: string;
    label: string;
  };
}

const Item = ({ icon, title, subtitle, description, link }: ItemProps) => {
  return (
    <div className="bg-[#2C2F31] p-6 hover:bg-[#3B3A3A] transition-colors duration-300">
      {subtitle && (
        <div className="text-[#C6AC83] uppercase tracking-widest text-sm mb-2">
          {subtitle}
        </div>
      )}
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-[#cbcbcb] mb-4 leading-relaxed">{description}</p>
      {link && (
        <a
          href={link.url}
          className="p-2 bg-[#333743] text-white font-medium hover:bg-[#C6AC83]"
        >
          {link.label}
        </a>
      )}
    </div>
  );
};
