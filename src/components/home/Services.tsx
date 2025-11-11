"use client";

import { useHome } from "@/hooks/useHome";
import React from "react";

export default function Services() {
  const { homeData, loading } = useHome();

  return (
    <div className="max-w-[1140px] mx-auto mb-10 px-4">
      <h2 className="text-[#c6ac83] text-4xl uppercase mb-12 text-center md:text-left">
        {loading ? (
          <div className="w-64 h-8 bg-white/10 rounded animate-pulse mx-auto md:mx-0" />
        ) : (
          homeData?.services?.title
        )}
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
          : homeData?.services?.cards?.map((service) => (
              <Item
                key={service.id}
                title={service.title}
                description={service.description}
              />
            ))}
      </div>
    </div>
  );
}

interface ItemProps {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemProps) => {
  return (
    <div
      className="group bg-white flex flex-col border border-[#eff0f0] shadow-lg
                 p-6 text-left
                 transition-all duration-500 ease-in-out 
                 hover:-translate-y-3 hover:bg-black hover:shadow-lg hover:shadow-[#C6AC83]/40"
    >
      <h3 className="text-black text-2xl font-semibold transition-colors duration-300 ease-in-out group-hover:text-white">
        {title}
      </h3>
      <p className="text-[#3B3A3A] text-justify pt-4 transition-colors duration-300 ease-in-out group-hover:text-white">
        {description}
      </p>
    </div>
  );
};

const ServiceSkeleton = () => (
  <div className="bg-white border border-[#eff0f0] shadow-lg p-6 animate-pulse rounded">
    <div className="w-3/4 h-6 bg-gray-300/50 rounded mb-4"></div>
    <div className="w-full h-4 bg-gray-300/50 rounded mb-2"></div>
    <div className="w-5/6 h-4 bg-gray-300/50 rounded mb-2"></div>
    <div className="w-4/6 h-4 bg-gray-300/50 rounded"></div>
  </div>
);
