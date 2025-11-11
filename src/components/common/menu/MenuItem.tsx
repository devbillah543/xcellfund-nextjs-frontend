"use client";

import React, { useState, useEffect } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import clsx from "clsx";
import LinkItem from "../LinkItem";

export default function MenuItem({ item }: { item: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hover, setHover] = useState(false); // <-- hover state for desktop

  // Detect mobile viewport width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const href =
    item.item?.url_type === "email"
      ? `mailto:${item.item?.url}`
      : item.item?.url_type === "tel"
      ? `tel:${item.item?.url}`
      : item.item?.url;

  const label = item.item?.label?.text ?? item.item?.label ?? "Menu";
  const newTab = !!(item.item?.open_in_new_tab ?? item.item?.new_tab ?? false);
  const hasSubmenu = Array.isArray(item.subitems) && item.subitems.length > 0;

  // Desktop: Popover dropdown; Mobile: Disclosure accordion
  if (hasSubmenu && !isMobile) {
    return (
      // attach hover handlers to the Popover container
      <Popover
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {({ open }) => {
          const visible = open || hover;
          return (
            <>
              <Popover.Button className="flex items-center gap-0 focus:outline-none">
                <LinkItem
                  href={href}
                  label={label}
                  newTab={newTab}
                  className="flex items-center gap-2 text-white hover:border-b transition-all duration-200"
                  fontSize={16}
                />
                <FaPlus
                  className={clsx(
                    "w-3 h-3 ml-1 transition-transform duration-200 text-white"
                  )}
                  aria-hidden
                />
              </Popover.Button>

              {/* render panel always (static) but hide it visually when not visible */}
              <Transition
                show={visible}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className={clsx(
                    "absolute right-0 left-auto top-full z-20 mt-2 bg-white shadow-lg p-3 min-w-[250px] origin-top-right"
                  )}
                >
                  <div className="flex items-start flex-col">
                    {item.subitems.map((sub: any) => {
                      const subHref =
                        sub.url_type === "email"
                          ? `mailto:${sub.url}`
                          : sub.url_type === "tel"
                          ? `tel:${sub.url}`
                          : sub.url;
                      const subLabel = sub.label?.text ?? sub.label;
                      const subNewTab = !!(sub.open_in_new_tab ?? sub.new_tab ?? false);
                      return (
                        <div key={sub.id} className="py-1">
                          <LinkItem
                            href={subHref}
                            label={subLabel}
                            newTab={subNewTab}
                            className="flex items-center gap-2 text-black hover:text-[#cfb795] hover:border-b hover:border-[#cfb795] transition-all duration-150 uppercase"
                            fontSize={14}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    );
  }

  // Mobile or no submenu: simple link (mobile with Disclosure if submenu)
  if (hasSubmenu && isMobile) {
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex items-center justify-between py-2">
              <LinkItem
                href={href}
                label={label}
                newTab={newTab}
                className="w-full text-left flex items-center gap-2 text-black"
                fontSize={16}
              />
              <RxCaretRight
                className={clsx("w-3 h-3 ml-1 transition-transform duration-200 text-black")}
                aria-hidden
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pl-4">
              <div className="flex items-start flex-col">
                {item.subitems.map((sub: any) => {
                  const subHref =
                    sub.url_type === "email"
                      ? `mailto:${sub.url}`
                      : sub.url_type === "tel"
                      ? `tel:${sub.url}`
                      : sub.url;
                  const subLabel = sub.label?.text ?? sub.label;
                  const subNewTab = !!(sub.open_in_new_tab ?? sub.new_tab ?? false);
                  return (
                    <div key={sub.id} className="py-2">
                      <LinkItem
                        href={subHref}
                        label={subLabel}
                        newTab={subNewTab}
                        className="flex items-center gap-2 text-black"
                        fontSize={14}
                      />
                    </div>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  // No submenu: plain link
  return (
    <div className="flex items-start">
      <LinkItem
        href={href}
        label={label}
        newTab={newTab}
        className="flex items-center gap-2 text-black md:text-white hover:border-b transition-all duration-200"
        fontSize={16}
      />
    </div>
  );
}
