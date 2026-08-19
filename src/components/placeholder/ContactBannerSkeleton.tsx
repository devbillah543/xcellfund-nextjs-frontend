import React from "react";
import Container from "@/components/common/Container";

type Props = {
  hasButton?: boolean;
};

export default function ContactBannerSkeleton({ hasButton = true }: Props) {
  return (
    <div className="relative w-full h-[400px] bg-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      <Container className="h-full flex flex-col items-center justify-center gap-4 text-center relative z-10">
        <div className="h-12 md:h-16 w-3/4 md:w-1/2 bg-gray-400 animate-pulse rounded"></div>
        <div className="w-32 h-px bg-gray-400 animate-pulse mx-auto"></div>
        <div className="h-4 md:h-6 w-5/6 md:w-2/3 bg-gray-400 animate-pulse rounded"></div>
        {hasButton && (
          <div className="h-10 w-32 md:w-40 bg-gray-400 animate-pulse rounded mt-4"></div>
        )}
      </Container>
    </div>
  );
}
