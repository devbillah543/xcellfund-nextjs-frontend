"use client";
import React from "react";
import { useHome } from "@/hooks/useHome";
import Link from "next/link";

export default function Features() {
  const { homeData } = useHome();

  return (
    <div className="flex flex-wrap justify-center max-w-[1140px] mx-auto relative top-[-125px] px-5 md:px-0">
      {homeData?.features?.map((feature) => (
        <Item
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          link={feature.link?.url}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  icon: string;
  title: string;
  link: string;
}

const Item = ({ icon, title, link }: ItemProps) => {
  return (
    <Link
      href={link || "#"}
      className="w-full sm:w-1/2 lg:w-1/4 bg-[#414345] flex flex-col justify-center items-center 
                 border-solid border-t-0 border-r border-b-0 border-l-0 border-[#3B3A3A] 
                 transition-all duration-300 ease-in-out py-10 px-6 
                 hover:bg-black hover:shadow-md hover:shadow-[#C6AC83]/30 mb-2 md:mb-0"
    >
      <div>
        <i
          aria-hidden="true"
          className={`${icon} text-[#C6AC83] text-[40px]`}
        ></i>
      </div>
      <h2 className="mt-2 text-white text-lg font-medium text-center">
        {title}
      </h2>
    </Link>
  );
};
