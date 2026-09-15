"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

// Harsh — three states, not two. "System" is what most people actually want:
// dark at night, light in the morning, without touching anything.
export function ThemeToggle({ className }) {
  const { theme, resolvedTheme, setTheme } = useTheme()

  // The classic gotcha: on the server we have no idea what the theme is, so
  // `resolvedTheme` is undefined until the component mounts on the client.
  // If we render the moon on the server and the sun on the client, React
  // yells about a hydration mismatch. So: render a neutral icon until mounted.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const Icon = mounted && resolvedTheme === "dark" ? Moon : Sun
  const iconKey = mounted ? resolvedTheme : "ssr"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change theme"
          className={cn("relative overflow-hidden", className)}>
          {/*
            mode="wait" = let the old icon finish leaving before the new one
            enters. The sun drops out the bottom and the moon rises in — the
            direction of motion tells a tiny story. That's what "polish" means.
          */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={iconKey}
              initial={{ y: 12, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -12, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex">
              <Icon className="h-5 w-5" />
            </motion.span>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {OPTIONS.map((opt) => (
          <DropdownMenuItem key={opt.value} onSelect={() => setTheme(opt.value)} className="gap-2">
            <opt.icon className="h-4 w-4" />
            {opt.label}
            {mounted && theme === opt.value && <Check className="ml-auto h-4 w-4 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
