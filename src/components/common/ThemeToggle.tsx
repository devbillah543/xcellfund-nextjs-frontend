'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon,SunIcon } from '@heroicons/react/16/solid'


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // defer the state update to avoid synchronous setState inside the effect
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  if (!mounted) return null  // prevents hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="theme-toggle fixed bottom-4 right-4 z-50 p-2 rounded-lg border border-foreground/20 hover:bg-foreground/10 transition cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon className="size-4 text-blue-500" />  : <SunIcon className="size-4 text-yellow-400" />}
    </button>
  )
}
