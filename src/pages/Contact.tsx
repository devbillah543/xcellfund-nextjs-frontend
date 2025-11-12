"use client";
import Hero from "@/components/common/Hero";
import LinkItem from "@/components/common/LinkItem";
import Form from "@/components/contact/Form";
import { useContactUs } from "@/hooks/useContactus";
import { useGlobal } from "@/providers/GlobalProvider";
import React from "react";

export default function Contact() {
  const { contactData, loading } = useContactUs();

  return (
    <div className="w-full">
      <Hero hero={contactData?.hero} loading={loading} />
      <div className="w-full flex flex-col md:flex-row justify-between gap-8 mt-32 mb-20 max-w-[1140px] mx-auto px-4">
        <div className="w-2/3">
            <Form />
        </div>
        <div className="w-1/3">
            <Location title={contactData?.location_header ?? "Our location"} />
        </div>
      </div>
    </div>
  );
}

const Location = ({title}: {title: string}) => {
  const { global, loading } = useGlobal();
  const location = global?.footer?.location;
  return (
    <>
      {/* Location */}
      <div className="flex flex-col items-start gap-2">
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-40 h-3 bg-gray-300 rounded"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
            <div className="w-24 h-3 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <>
            <h4 className="font-semibold text-gray-800 border-b border-gray-200 tracking-[2px] w-full mb-2 pb-4">
              {title}
            </h4>
            {location?.address && (
              <p className="text-gray-800 whitespace-pre-line">
                {location.address}
              </p>
            )}
            {location?.email && (
              <LinkItem
                href={`mailto:${location.email.url}`}
                label={location.email.label}
                className="text-[#cfb795] transition-colors duration-200"
                fontSize={14}
              />
            )}
            {location?.phone && (
              <LinkItem
                href={`tel:${location.phone.url}`}
                label={location.phone.label}
                className="text-gray-800 transition-colors duration-200"
                fontSize={14}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
