'use client'

import React from "react"
import { ThemeProvider } from "next-themes"
// import ThemeToggle from '@/components/common/ThemeToggle'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"       // attaches .light or .dark to <html>
      defaultTheme="system"   // can be "system" or "light"
      enableSystem
    >
      <div className="p-4 flex flex-col items-center gap-6">
        {/* <ThemeToggle /> */}
        {children}
      </div>
    </ThemeProvider>
  )
}
