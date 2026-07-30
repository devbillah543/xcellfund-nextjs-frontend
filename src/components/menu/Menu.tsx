/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useMemo } from "react";
import { MobileMenuButton } from "@/components/menu/MobileMenuButton";
import { MobileMenu } from "@/components/menu/MobileMenu";
import NavSearch from "@/components/menu/NavSearch";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import AppLink from "@/components/common/AppLink";
import Icon from "@/components/common/Icon";
import { usePathname } from "next/navigation";

type IconType = { name: string };
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
  icon: IconType | null;
};
type Brand = { alt_text: string; logo: Logo; link: LinkItem };
type MenuItem = { id: number; menu: LinkItem; submenu: LinkItem[] };
type Props = { brand: Brand; menus: MenuItem[] };

function collectSearchLinks(menus: MenuItem[]) {
  const links: { id: number | string; label: string; url: string }[] = [];
  for (const item of menus || []) {
    if (item.menu?.label && item.menu?.url) {
      links.push({
        id: item.menu.id,
        label: item.menu.label,
        url: item.menu.url,
      });
    }
    for (const sub of item.submenu || []) {
      if (sub.label && sub.url) {
        links.push({ id: sub.id, label: sub.label, url: sub.url });
      }
    }
  }
  return links;
}

export default function Menu({ brand, menus }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen((p) => !p);
  const closeMenu = () => setOpen(false);

  const memoMenus = useMemo(() => menus, [menus]);
  const searchLinks = useMemo(() => collectSearchLinks(menus || []), [menus]);

  return (
    <header className="w-full bg-transparent relative z-50 overflow-visible">
      <div className="w-full max-w-[1140px] mx-auto px-6 md:px-6 relative overflow-visible">
        <div className="flex justify-between items-center py-4 relative overflow-visible">
          {/* Logo */}
          <AppLink
            aria_label={brand.link.aria_label}
            external={brand.link.external}
            target={brand.link.target}
            type={brand.link.type}
            url={brand.link.url}
          >
            <Image
              src={getAbsoluteUrl(brand.logo.url)}
              alt={brand.alt_text || brand.logo.alternativeText || "Logo"}
              width={brand.logo.width || 202}
              height={brand.logo.height || 52}
              priority
              quality={80}
              sizes="202px"
            />
          </AppLink>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {memoMenus.map((item) => {
                const isChildActive = item.submenu.some(
                  (s) => s.url === pathname
                );
                const isParentActive =
                  item.menu.url === pathname || isChildActive;

                return (
                  <div key={item.id} className="relative group">
                    <div className="flex items-center gap-1 text-white">
                      <AppLink
                        aria_label={item.menu.aria_label}
                        external={item.menu.external}
                        target={item.menu.target}
                        type={item.menu.type}
                        url={item.menu.url}
                        label={item.menu.label || ""}
                        className={`montserrat font-medium text-xs uppercase hover:border-b hover:border-white ${
                          isParentActive ? "border-b border-white" : ""
                        }`}
                      />
                      {item.submenu.length > 0 && (
                        <Icon name="faPlus" className="text-xs" />
                      )}
                    </div>
                    {item.submenu.length > 0 && (
                      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute top-full right-0 pt-2 z-50">
                        <div className="bg-white shadow-lg w-56 max-w-[calc(100vw-20px)] px-4 py-2">
                          {item.submenu.map((sub) => {
                            const isActive = sub.url === pathname;
                            return (
                              <div key={sub.id} className="py-1">
                                <AppLink
                                  aria_label={sub.aria_label}
                                  external={sub.external}
                                  target={sub.target}
                                  type={sub.type}
                                  url={sub.url}
                                  label={sub.label || ""}
                                  className={`montserrat font-normal text-xs inline-block uppercase hover:text-(--sand-500) hover:border-b hover:border-(--sand-500) ${
                                    isActive
                                      ? "border-b border-(--sand-500) text-(--sand-500)"
                                      : ""
                                  }`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <NavSearch links={searchLinks} />
          </div>
          {/* Mobile Button + search */}
          <div className="flex md:hidden items-center gap-4">
            <NavSearch links={searchLinks} />
            <MobileMenuButton open={open} toggle={toggleMenu} />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu open={open} close={closeMenu} menus={menus} brand={brand} />
    </header>
  );
}
