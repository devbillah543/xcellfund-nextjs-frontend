import React from "react";
import Container from "@/components/common/Container";

interface ServiceSkeletonProps {
  count: number;
}

export const ServiceSkeleton = ({ count = 4 }: ServiceSkeletonProps) => {
  return (
    <Container className="mb-10">
      <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mx-auto md:mx-0 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-[#eff0f0] shadow-lg p-6 rounded animate-pulse h-80"
          >
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-4" />
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </Container>
  );
};
