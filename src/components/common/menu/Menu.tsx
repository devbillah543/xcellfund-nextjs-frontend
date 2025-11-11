"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import config from "@/config";
import { useGlobal } from "@/providers/GlobalProvider";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export default function Menu() {
  const { global } = useGlobal();
  const menu = global?.navigation?.menus || [];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        {global?.navigation.brand?.logo && (
          <Link
            href="/"
            className="inline-block"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              loader={({ src }) => src}
              priority
              src={`${config.API_URL}${global.navigation.brand.logo.url}`}
              alt={global.navigation.brand.logo.alt || "Brand Logo"}
              width={200}
              height={200}
              unoptimized
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 relative">
          {menu.map((item: any) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="lg:hidden ml-4 z-40 p-2 rounded-md focus:outline-none focus:ring-0"
          onClick={() => setMobileOpen((s) => !s)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <FaTimes className="text-white" size={20} />
          ) : (
            <FaBars className="text-white" size={20} />
          )}
        </button>
      </div>

      {/* -----------------------
          Full-width mobile panel
          Appears below the header, spans the screen width
          ------------------------ */}
      <div
        id="mobile-navigation"
        className={clsx(
          "lg:hidden w-full left-0 right-0 transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* panel background (full width) */}
        <div className="w-full bg-white shadow-md">
          {/* center constrained content to the same container width if you want */}
          <div className="container mx-auto p-4">
            {/* nav items */}
            <nav className="flex flex-col gap-2">
              {menu.map((item: any) => (
                // MenuItem detects mobile via window.innerWidth and will render Disclosure-style items.
                <div key={item.id} onClick={() => { /* optional: keep empty so MenuItem controls its own clicks */ }}>
                  <MenuItem item={item} />
                </div>
              ))}
            </nav>

            {/* optional mobile CTA */}
            {global?.navigation?.mobile_cta && (
              <div className="mt-6">
                <Link
                  href={global.navigation.mobile_cta.url || "/"}
                  className="block px-4 py-2 rounded-md border text-center uppercase"
                  onClick={() => setMobileOpen(false)}
                >
                  {global.navigation.mobile_cta.label || "Action"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
