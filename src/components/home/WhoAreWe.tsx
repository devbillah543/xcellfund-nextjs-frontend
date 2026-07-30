import React from "react";
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

type Content = {
  id: number;
  title?: string;
  subtitle?: string;
  description: string;
  link?: LinkItem;
};

interface WhoAreWeProps {
  left_content: Content;
  right_content: Content;
}

export default function WhoAreWe({ data }: { data: WhoAreWeProps }) {
  return (
    <div className="bg-gray-950 md:h-[508px]">
      <div
        className="w-full h-full bg-[radial-gradient(circle_at_center,#363e44_0%,#202326_100%)]
                   opacity-100 
                   transition-[background,border-radius,opacity] duration-300 flex flex-col 
                   items-center justify-center
                   py-16 md:py-0"
      >
        <div className="w-full max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 px-10 md:px-6">
          {/* Left */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <LeftContent {...data?.left_content} />
          </div>

          {/* Vertical line (hidden on mobile) */}
          <div className="hidden md:block md:w-[5%] min-h-52 border-l border-[#ffffff33]"></div>

          {/* Right */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <RightContent {...data?.right_content} />
          </div>
          <div className="w-full md:w-[25%]">
            {/* Empty div to balance the flex layout */}
          </div>
        </div>
      </div>
    </div>
  );
}

const LeftContent = ({ title, description }: Content) => (
  <div className="w-full flex flex-col items-start text-left">
    <div className="text-white uppercase font-bold text-xs tracking-[2px]">
      <div className="w-32 bg-[#ffffff33] h-px relative -left-44 top-2.5 lato"></div>
      {title}
    </div>
    <h2 className="text-[#c6ac83] text-4xl leading-14 mt-3 prata">
      {description}
    </h2>
  </div>
);

const RightContent = ({ description, link, title }: Content) => (
  <div className="w-full flex flex-col text-left md:text-left pb-10 md:pb-0">
    <p className="text-[#cbd2d7] text-lg font-light lato leading-[30px] w-full md:w-[381px]">
      {description}
    </p>
    {link && (
      <AppLink
        external={link.external}
        target={link.target}
        type={link.type}
        url={link.url}
        className="bg-(--sand-btn) px-3 py-2 text-white rounded text-base font-normal lato sentence-case
             transition-all duration-300 ease-in-out hover:bg-[#333743] mt-6 inline-block w-fit lato"
      >
        <span className="sr-only">{title || "About us"}: </span>
        {link.label}
      </AppLink>
    )}
  </div>
);
