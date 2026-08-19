import React from "react";
import Container from "@/components/common/Container";
import FormSkeleton from "@/components/placeholder/FormSkeleton";

type Props = {
  inputCount: number;
  linkCount: number;
};

export default function ContactusContactSkeleton({
  inputCount = 5,
  linkCount = 2,
}: Props) {
  return (
    <Container className="py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:flex-1">
          <FormSkeleton inputCount={inputCount} />
        </div>
        <div className="w-full md:w-1/3 flex-none">
          <div className="flex flex-col items-start gap-4 animate-pulse">
            <div className="h-6 bg-gray-300 w-2/3 mb-2 pb-2 rounded" />
            <div className="h-4 bg-gray-300 w-full rounded mb-1" />
            <div className="h-4 bg-gray-300 w-5/6 rounded mb-1" />
            <div className="h-4 bg-gray-300 w-3/4 rounded mb-1" />
            {Array.from({ length: linkCount }).map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-300 w-1/2 rounded mb-1" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
