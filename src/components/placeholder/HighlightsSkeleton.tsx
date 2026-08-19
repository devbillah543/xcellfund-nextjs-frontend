import React from "react";
import Container from "@/components/common/Container";

export const HighlightsSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="bg-transparent bg-[radial-gradient(at_center_center,#1d2022_0%,#202326_100%)] opacity-100 transition-[background,border-radius,opacity] duration-300">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-[#2C2F31] p-6 animate-pulse">

      {/* Subtitle */}
      <div className="h-4 w-1/3 bg-gray-400/40 rounded mb-3" />

      {/* Title lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-400/40 rounded w-full" />
        <div className="h-3 bg-gray-400/40 rounded w-full" />
        <div className="h-3 bg-gray-400/40 rounded w-full" />
        <div className="h-3 bg-gray-400/40 rounded w-5/6" />
      </div>

      {/* Button */}
      <div className="h-10 w-28 bg-gray-400/40 rounded" />
    </div>
  );
};
