import React from "react";
import Container from "@/components/common/Container";

type Props = {
  inputCount?: number;
  socialsCount?: number;
};

export default function SubscriptionSkeleton({ socialsCount = 3 }: Props) {
  return (
    <div className="w-full bg-gray-950 py-6">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-1/3">
            <div className="flex w-full rounded overflow-hidden">
              <div className="h-12 bg-gray-700/40 w-full animate-pulse" />
              <div className="h-12 w-28 bg-gray-700/40 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-4 md:justify-end justify-center w-full md:w-auto">
            {Array.from({ length: socialsCount }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-6 rounded bg-gray-700/40 animate-pulse"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
