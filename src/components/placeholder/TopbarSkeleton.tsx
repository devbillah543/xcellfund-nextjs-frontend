import React from "react";
import Container from "@/components/common/Container";

type Props = {
  contactsCount?: number;
  socialsCount?: number;
};

export default function TopbarSkeleton({
  contactsCount = 2,
  socialsCount = 3,
}: Props) {
  return (
    <div className="bg-transparent w-full border-b border-gray-200 py-2">
      <Container>
        <div className="flex flex-row justify-end gap-2 items-center md:justify-between md:gap-0">
          {/* LEFT: CONTACTS large screen */}
          <div className="hidden md:flex flex-row items-center gap-10">
            {Array.from({ length: contactsCount }).map((_, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                {/* Icon Placeholder */}
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded"></div>
                {/* Text Placeholder */}
                <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))}
          </div>

          {/* LEFT: CONTACTS mobile screen */}
          <div className="flex md:hidden flex-row items-center gap-3">
            {Array.from({ length: contactsCount }).map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-gray-300 animate-pulse rounded"
              ></div>
            ))}
          </div>

          {/* RIGHT: SOCIALS */}
          <div className="flex flex-row items-center gap-3">
            {Array.from({ length: socialsCount }).map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-gray-300 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
