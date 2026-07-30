import React from "react";
import Icon from "@/components/common/Icon";
import AppLink from "@/components/common/AppLink";

type Icon = {
  name: string;
};

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: Icon | null;
};

type Feature = {
  id?: number;
  title: string;
  subtitle?: string;
  description?: string;
  icon: Icon;
  link: LinkItem;
};

interface FeaturesProps {
  data: Feature[];
}

export default function Features({ data }: FeaturesProps) {
  const features: Feature[] = (data as Feature[]) ?? [];

  return (
    <div className="flex flex-wrap justify-center max-w-[1140px] mx-auto relative top-12 md:top-[-100px] px-12 md:px-6 z-20">
      {features.map((feature) => {
        return (
          <Item
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            link={feature.link}
          />
        );
      })}
    </div>
  );
}

const Item = ({ icon, title, link }: Feature) => {
  return (
    <AppLink
      external={link.external}
      target={link.target}
      type={link.type}
      url={link.url}
      className="w-full sm:w-1/2 lg:w-1/4 bg-[#414345] flex flex-col justify-center items-center 
                 border-solid border-t-0 border-r border-b-0 border-l-0 border-[#3B3A3A] 
                 transition-all duration-300 ease-in-out py-10 px-16 
                 hover:bg-[#333743] hover:shadow-md hover:shadow-[#C6AC83]/30 mb-2 md:mb-0 feature-title"
    >
      <Icon name={icon.name} className="text-(--sand-500) text-[40px]" />
      <p className="prata text-(--sand-500) text-[20px] text-center leading-8 mt-2">{title}</p>
    </AppLink>
  );
};