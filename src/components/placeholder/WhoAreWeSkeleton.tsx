import React from "react";
import Container from "@/components/common/Container";


export const WhoAreWeSkeleton = () => {
  return (
    <div className="bg-gray-950">
      <div
        className="bg-[radial-gradient(circle_at_center,#363e44_0%,#202326_100%)]
                   opacity-100 
                   transition-[background,border-radius,opacity] duration-300 
                   py-16 md:py-24"
      >
        <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Skeleton */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <LeftSkeleton />
          </div>

          {/* Vertical line (hidden on mobile) */}
          <div className="hidden md:block md:w-[5%] min-h-52 border-l border-[#ffffff33]"></div>

          {/* Right Skeleton */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <RightSkeleton />
          </div>

          {/* Empty div for layout balance */}
          <div className="w-full md:w-[25%]"></div>
        </Container>
      </div>
    </div>
  );
};

/* ----------------------------
   🩶 Left Skeleton
-----------------------------*/
const LeftSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="w-28 h-4 bg-white/10 rounded mb-3"></div>
    <div className="w-full h-7 bg-white/10 rounded mb-2"></div>
    <div className="w-5/6 h-7 bg-white/10 rounded mb-2"></div>
    <div className="w-2/3 h-7 bg-white/10 rounded"></div>
  </div>
);

/* ----------------------------
   🩶 Right Skeleton
-----------------------------*/
const RightSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="space-y-3 mb-6">
      <div className="w-full h-4 bg-white/10 rounded"></div>
      <div className="w-10/12 h-4 bg-white/10 rounded"></div>
      <div className="w-8/12 h-4 bg-white/10 rounded"></div>
      <div className="w-6/12 h-4 bg-white/10 rounded"></div>
    </div>
    <div className="w-28 h-9 bg-[#c6ac83]/30 rounded"></div>
  </div>
);
