"use client";

import { useHome } from "@/hooks/useHome";
import React from "react";

export default function Services() {
  const { homeData } = useHome();

  return (
    <div className="max-w-[1140px] mx-auto mb-10 px-4">
      <h2 className="text-[#c6ac83] text-4xl uppercase mb-12 text-center md:text-left">
        Our Services
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {homeData?.services?.cards?.map((service) => (
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
