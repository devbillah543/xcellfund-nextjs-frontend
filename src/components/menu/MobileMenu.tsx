"use client";
import React, { useState } from "react";
import AppLink from "@/components/common/AppLink";
import Icon from "@/components/common/Icon";
import { usePathname } from "next/navigation";

type Icon = { name: string };
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
type Brand = { alt_text: string; logo: Logo; link: LinkItem };
type MenuItem = { id: number; menu: LinkItem; submenu: LinkItem[] };
type Props = {
  open: boolean;
  close: () => void;
  menus: MenuItem[];
  brand: Brand;
};

export function MobileMenu({ open, menus }: Props) {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const pathname = usePathname();

  if (!open) return null;

  const toggleSubmenu = (id: number) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="md:hidden bg-white w-full shadow-md border-t hamburger-animate-slideDown">
      <div className="p-4 flex flex-col gap-3">
        {menus.map((item) => {
          // Check if parent or any child is active
          const isChildActive = item.submenu.some((sub) => sub.url === pathname);
          const isParentActive = item.menu.url === pathname || isChildActive;

          return (
            <div
              key={item.id}
              onClick={() => item.submenu.length > 0 && toggleSubmenu(item.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <AppLink
                  aria_label={item.menu.aria_label}
                  external={item.menu.external}
                  target={item.menu.target}
                  type={item.menu.type}
                  url={item.menu.url}
                  label={item.menu.label || ""}
                  className={`montserrat font-medium text-xs uppercase inline-flex items-center min-h-11 py-2 hover:border-b hover:border-white ${isParentActive ? "border-b border-(--sand-500) text-(--sand-500)" : ""}`}
                />
                {item.submenu.length > 0 && (
                  <Icon
                    name="faChevronRight"
                    className="montserrat font-medium text-xs uppercase"
                  />
                )}
              </div>

              {item.submenu.length > 0 && openSubmenu === item.id && (
                <div className="ml-4 flex flex-col gap-1">
                  {item.submenu.map((sub) => {
                    const isActive = sub.url === pathname;
                    return (
                      <div className="py-1" key={sub.id}>
                        <AppLink
                          aria_label={sub.aria_label}
                          external={sub.external}
                          target={sub.target}
                          type={sub.type}
                          url={sub.url}
                          label={sub.label || ""}
                          className={`montserrat font-normal text-xs inline-block uppercase hover:text-(--sand-500) hover:border-b hover:border-(--sand-500) ${
                            isActive ? "border-b border-(--sand-500) text-(--sand-500)" : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
