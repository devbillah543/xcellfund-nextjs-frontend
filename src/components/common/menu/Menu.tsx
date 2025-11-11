"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import config from "@/config";
import { useGlobal } from "@/providers/GlobalProvider";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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

  // Framer Motion variants
  const panelVariant = {
    hidden: { opacity: 0, y: -8, height: 0, transition: { when: "afterChildren" } },
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
    exit: { opacity: 0, y: -8, height: 0, transition: { when: "afterChildren" } },
  };

  const listVariant = {
    hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.06, staggerDirection: 1 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } },
    exit: { opacity: 0, y: 6, transition: { duration: 0.16 } },
  };

  return (
    <header className="w-full">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        {global?.navigation.brand?.logo && (
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
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 relative">
          {menu.map((item: any) => (
            <MenuItem key={item.id} item={item} />
          ))}
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
        >
          {mobileOpen ? <FaTimes className="text-white" size={20} /> : <FaBars className="text-white" size={20} />}
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
                  {menu.map((item: any) => (
                    <motion.div key={item.id} variants={itemVariant}>
                      {/* MenuItem will render mobile Disclosure UI */}
                      <MenuItem item={item} />
                    </motion.div>
                  ))}
                </motion.nav>

                {/* optional mobile CTA */}
                {global?.navigation?.mobile_cta && (
                  <motion.div
                    className="mt-6"
                    variants={itemVariant}
                    style={{ originY: 0 }}
                  >
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
