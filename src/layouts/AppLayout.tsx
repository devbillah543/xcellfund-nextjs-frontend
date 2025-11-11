'use client';

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/providers/GlobalProvider";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"       // toggles .light/.dark on <html>
      defaultTheme="system"   // "system" or "light"
      enableSystem
    >
      <GlobalProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </GlobalProvider>
    </ThemeProvider>
  );
}
