import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import AppLink from "@/components/common/AppLink";
import Hero from "@/components/common/Hero";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";

export const metadata = createMetadata({
  title: "Sitemap | XCell Fund",
  description: "Browse every page on the XCell Fund website, organized by section.",
  canonical: "sitemap",
});

type IconType = { name: string };
type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon?: IconType | null;
};
type MenuItem = { id: number; menu: LinkItem; submenu: LinkItem[] };
type Section = { heading: string; links: LinkItem[] };

type Group = {
  id: string | number;
  label: string;
  url?: string;
  type?: LinkItem["type"];
  external?: boolean;
  target?: LinkItem["target"];
  aria_label?: string;
  links: LinkItem[];
};

export default async function SitemapPage() {
  const globalData = await fetchApi("global");
  const contactData = await fetchApi("contactUs");

  const mainMenus: MenuItem[] = globalData?.data?.mainmenu?.menus || [];
  const quicklinks: Section = globalData?.data?.footer_section?.quicklinks;
  const legalLinks: LinkItem[] = globalData?.data?.footer_section?.copyright?.links || [];

  const hasHome = mainMenus.some((item) => item.menu?.url === "/");

  const groups: Group[] = [
    ...(hasHome ? [] : [{ id: "home", label: "Home", url: "/", links: [] }]),
    ...mainMenus.map((item) => ({
      id: item.id,
      label: item.menu?.label || "",
      url: item.menu?.url,
      type: item.menu?.type,
      external: item.menu?.external,
      target: item.menu?.target,
      aria_label: item.menu?.aria_label,
      links: item.submenu || [],
    })),
    ...(quicklinks?.links?.length
      ? [{ id: "quicklinks", label: quicklinks.heading || "Quick Links", links: quicklinks.links }]
      : []),
    ...(legalLinks.length ? [{ id: "legal", label: "Legal", links: legalLinks }] : []),
  ];

  return (
    <AppLayout pathname="/sitemap">
      <Hero
        title="Sitemap"
        subtitle={contactData?.data?.hero?.subtitle}
        image={contactData?.data?.hero?.background_image}
      />
      <section className="max-w-[1140px] mx-auto px-5 md:px-0 py-16">
        <div className="columns-2 sm:columns-3 md:columns-4 gap-x-10">
          {groups.map((group) => (
            <div key={group.id} className="break-inside-avoid mb-9">
              {group.url ? (
                <AppLink
                  aria_label={group.aria_label}
                  external={group.external}
                  target={group.target}
                  type={group.type}
                  url={group.url}
                  label={group.label}
                  className="lato text-[15px] font-semibold text-[#1d1d1f] hover:underline"
                />
              ) : (
                <h2 className="lato text-[15px] font-semibold text-[#1d1d1f]">
                  {group.label}
                </h2>
              )}

              {group.links.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <AppLink
                        aria_label={link.aria_label}
                        external={link.external}
                        target={link.target}
                        type={link.type}
                        url={link.url}
                        label={link.label || ""}
                        className="lato text-[15px] text-[#333743] hover:text-(--sand-500) hover:underline"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
