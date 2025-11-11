"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import config from "@/config";
import { useGlobal } from "@/providers/GlobalProvider";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { motion, AnimatePresence, Variants } from "framer-motion";

type MenuItemType = {
  id: number | string;
  label?: string;
  url?: string;
  // add other fields you expect from your API if needed
};

export default function Menu() {
  const { global, loading } = useGlobal();
  const menu: MenuItemType[] = (global?.navigation?.menus as MenuItemType[]) || [];

  // treat as loading if provider indicates loading or global is not yet available
  const isLoading = Boolean(loading) || !global;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer Motion variants (explicitly typed)
  const panelVariant: Variants = {
    hidden: {
      opacity: 0,
      y: -8,
      height: 0,
      transition: { when: "afterChildren" },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        when: "beforeChildren",
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      height: 0,
      transition: { when: "afterChildren" },
    },
  };

  const listVariant: Variants = {
    hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.06, staggerDirection: 1 } },
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: { opacity: 0, y: 6, transition: { duration: 0.16 } },
  };

  return (
    <header className="w-full">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        {isLoading ? (
          <div
            className="inline-block w-32 h-8 bg-gray-200 rounded animate-pulse"
            aria-hidden
          />
        ) : (
          global?.navigation?.brand?.logo && (
            <Link href="/" className="inline-block" onClick={() => setMobileOpen(false)}>
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
          )
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 relative" aria-label="Primary">
          {isLoading ? (
            // simple skeleton placeholders for desktop menu
            <>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </>
          ) : (
            menu.map((item) => <MenuItem key={String(item.id)} item={item} />)
          )}
        </nav>

        {/* Hamburger for mobile */}
        <button
          className={clsx(
            "lg:hidden ml-4 z-40 p-2 rounded-md focus:outline-none focus:ring-0 transform transition-transform duration-200",
            mobileOpen ? "scale-105 rotate-6" : "scale-100 rotate-0"
          )}
          onClick={() => setMobileOpen((s) => !s)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          disabled={isLoading}
        >
          {mobileOpen ? (
            <FaTimes className="text-white" size={20} />
          ) : (
            <FaBars className="text-white" size={20} />
          )}
        </button>
      </div>

      {/* AnimatePresence controls mount/unmount animations */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariant}
            className="lg:hidden w-full left-0 right-0 overflow-hidden origin-top"
            aria-hidden={!mobileOpen}
          >
            {/* animated container (slide + fade) */}
            <motion.div
              className="w-full bg-white shadow-md"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="container mx-auto p-4">
                <motion.nav
                  className="flex flex-col gap-2"
                  variants={listVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {isLoading
                    ? // mobile skeleton list
                      Array.from({ length: 4 }).map((_, i) => (
                        <motion.div key={i} variants={itemVariant}>
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse my-2" />
                        </motion.div>
                      ))
                    : menu.map((item) => (
                        <motion.div key={String(item.id)} variants={itemVariant}>
                          {/* MenuItem will render mobile Disclosure UI */}
                          <MenuItem item={item} />
                        </motion.div>
                      ))}
                </motion.nav>

                {/* optional mobile CTA */}
                {!isLoading && global?.navigation?.mobile_cta && (
                  <motion.div className="mt-6" variants={itemVariant} style={{ originY: 0 }}>
                    <Link
                      href={global.navigation.mobile_cta.url || "/"}
                      className="block px-4 py-2 rounded-md border text-center uppercase"
                      onClick={() => setMobileOpen(false)}
                    >
                      {global.navigation.mobile_cta.label || "Action"}
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
