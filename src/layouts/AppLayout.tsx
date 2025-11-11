'use client';

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { AppProps } from "next/app";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
interface AppLayoutProps extends AppProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"       // adds .light/.dark to <html>
      defaultTheme="system"   // "system" or "light"
      enableSystem
    >
      <GlobalProvider>
        <Header />
        {children}
        <Footer />
      </GlobalProvider>
    </ThemeProvider>
  );
}
