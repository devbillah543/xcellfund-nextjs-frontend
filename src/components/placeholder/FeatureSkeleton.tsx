import React from "react";
import Container from "@/components/common/Container";

export default function FeatureSkeleton({ count }: { count: number }) {
  return (
    <Container className="flex flex-wrap justify-center relative top-12 md:top-[-100px]">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="w-full sm:w-1/2 lg:w-1/4 bg-[#414345] flex flex-col justify-center items-center 
                       border-solid border-t-0 border-r border-b-0 border-l-0 border-[#3B3A3A] 
                       py-10 px-6 mb-2 md:mb-0 animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-400/30 rounded mb-4"></div>
          <div className="w-3/4 h-5 bg-gray-400/30 rounded"></div>
        </div>
      ))}
    </Container>
  );
}
