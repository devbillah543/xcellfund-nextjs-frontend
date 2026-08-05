import AppLink from "@/components/common/AppLink";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import Image from "next/image";
import React from "react";

type Icon = {
  name: string;
};

type Logo = {
  url: string;
  alternativeText?: string;
  name?: string;
  width?: number;
  height?: number;
};

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: Icon | null;
};

type Brand = {
  alt_text: string;
  logo: Logo;
  link: LinkItem;
};

type Address = {
  id: string;
  heading: string;
  address: string;
  links: LinkItem[];
};

type Branding = {
  company_description: string;
  brand: Brand;
};

type QuickLinks = {
  heading: string;
  links: LinkItem[];
};

type Props = {
  address: Address;
  branding: Branding;
  quicklinks: QuickLinks;
};

export default function Footer({ address, branding, quicklinks }: Props) {
  return (
    <footer className="w-full bg-[#f9f9f9] py-10 px-4 md:px-6">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
          {/* Branding */}
          <div className="flex-1 flex flex-col items-start gap-4">
            {branding.brand.logo && (
              <Image
                src={getAbsoluteUrl(branding.brand.logo.url)}
                alt={
                  branding.brand.alt_text ||
                  branding.brand.logo.alternativeText ||
                  branding.brand.logo.name ||
                  "xcellfund"
                }
                width={branding.brand.logo.width || 150}
                height={branding.brand.logo.height || 117}
                loading="lazy"
                quality={80}
                sizes="150px"
              />
            )}
            {branding.company_description && (
              <p className="text-gray-800 text-lg font-light lato pt-5">
                {branding.company_description}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex-1 flex flex-col items-start gap-2">
            <h3 className="font-semibold text-gray-800 mb-2">
              {quicklinks.heading || "Quick Links"}
            </h3>
            <nav className="flex flex-col items-start gap-2 text-left">
              {/**text-gray-800 hover:text-black transition-colors duration-200 */}
              {quicklinks?.links?.map((link: LinkItem, index: number) => (
                <AppLink
                  key={index}
                  aria_label={link.aria_label}
                  external={link.external}
                  label={link.label ?? ""}
                  target={link.target}
                  type={link.type}
                  url={link.url}
                  className="inline-flex items-center text-gray-800 font-light hover:text-(--sand-500) transition-colors duration-200 text-base lato"
                />
              ))}
            </nav>
          </div>

          {/* Location */}
          <div className="flex-1 flex flex-col items-start gap-2">
            <h3 className="font-semibold text-gray-800 mb-2">
              {address.heading || "Location"}
            </h3>
            {address.address && (
              <p className="text-gray-800 font-light whitespace-pre-line">
                {address.address}
              </p>
            )}
            {address?.links?.map((link: LinkItem, index: number) => {
              if (link.type === "email") {
                return (
                  <AppLink
                    key={index}
                    aria_label={link.aria_label}
                    external={link.external}
                    label={link.label ?? ""}
                    target={link.target}
                    type={link.type}
                    url={link.url}
                    className="inline-flex items-center font-light text-(--sand-text) transition-colors duration-200 text-base"
                  />
                );
              } else {
                return (
                  <AppLink
                    key={index}
                    aria_label={link.aria_label}
                    external={link.external}
                    label={link.label ?? ""}
                    target={link.target}
                    type={link.type}
                    url={link.url}
                    className="inline-flex items-center font-light text-gray-800 transition-colors duration-200 text-base"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
