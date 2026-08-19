import React from "react";
import Container from "@/components/common/Container";

export const WhoAreWeBannerSkeleton = () => {
  return (
    <div className="bg-white">
      <Container className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">

        {/* Left Skeleton */}
        <div className="w-full md:w-[35%] flex justify-center mb-10 md:justify-start">
          <LeftSkeleton />
        </div>

        {/* Right Skeleton */}
        <div className="w-full md:w-[65%] flex justify-center md:justify-start">
          <RightSkeleton />
        </div>
      </Container>
    </div>
  );
};

/* ------------------------------------
      LEFT SIDE (TEXT) SKELETON
------------------------------------- */

const LeftSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Subtitle */}
    <div className="w-28 h-4 bg-gray-300/20 rounded mb-4"></div>

    {/* Title lines */}
    <div className="w-64 h-7 bg-gray-300/20 rounded mb-3"></div>
    <div className="w-52 h-7 bg-gray-300/20 rounded mb-3"></div>

    {/* Paragraph */}
    <div className="w-full h-4 bg-gray-300/20 rounded mb-2"></div>
    <div className="w-4/5 h-4 bg-gray-300/20 rounded mb-2"></div>
    <div className="w-3/5 h-4 bg-gray-300/20 rounded mb-2"></div>

    {/* Button */}
    <div className="w-32 h-10 bg-gray-300/30 rounded mt-5"></div>
  </div>
);

/* ------------------------------------
        RIGHT SIDE (IMAGES) SKELETON
------------------------------------- */

const RightSkeleton = () => (
  <div className="w-full relative top-[-60px] animate-pulse">
    <div className="relative flex flex-col gap-4 md:grid md:grid-cols-8">

      {/* Main large hero image */}
      <div className="md:col-start-3 md:col-end-13 bg-gray-300/25 h-60 md:h-[360px] rounded-lg shadow"></div>

      {/* Left small image */}
      <div className="md:col-start-2 md:col-end-4 md:-mt-10 bg-gray-300/25 h-60 md:h-[180px] rounded-lg shadow"></div>

      {/* Right medium image */}
      <div className="md:col-start-4 md:col-end-13 md:-mt-10 bg-gray-300/25 h-[200px] md:h-60 rounded-lg shadow"></div>
    </div>
  </div>
);
