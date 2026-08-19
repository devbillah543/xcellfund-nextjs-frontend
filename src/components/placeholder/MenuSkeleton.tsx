import React from "react";
import Container from "@/components/common/Container";

export default function MenuSkeleton() {
  return (
    <div className="w-full bg-gray-100 py-2">
      <Container className="flex justify-between items-center">
        <div className="w-36 h-8 bg-gray-300 rounded animate-pulse" />
        <div className="hidden md:flex gap-10 items-center">
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="md:hidden w-6 h-6 flex flex-col justify-between items-center cursor-pointer">
          <div className="w-full h-1 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-1 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-1 bg-gray-300 rounded animate-pulse" />
        </div>
      </Container>
    </div>
  );
}
