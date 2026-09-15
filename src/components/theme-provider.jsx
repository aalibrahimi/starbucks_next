"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

// Harsh — next-themes does three things we'd otherwise get wrong:
//  1. Adds/removes the `.dark` class on <html> (that's what our CSS tokens key off).
//  2. Persists the choice to localStorage.
//  3. Injects a tiny inline script BEFORE hydration so there's no white flash
//     on refresh in dark mode. That flash is the #1 tell of a hand-rolled toggle.
//
// `attribute="class"` matches `darkMode: ["class"]` in tailwind.config.js.
// `enableSystem` means "system" is a third option that follows the OS.
// `disableTransitionOnChange` stops every element from animating its color
// at once when you flip the theme — that looks laggy, not fancy.
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}>
      {children}
    </NextThemesProvider>
  )
}
