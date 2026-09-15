"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Coffee, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NAV_SECTIONS } from "./nav-config"
import { NavLink } from "./nav-link"

// Harsh — desktop sidebar. Two modes: full (256px) and "rail" (68px, icons only).
// These numbers also live in tailwind.config.js as spacing.sidebar /
// spacing.sidebar-rail. Framer wants raw px, Tailwind wants rem — if you
// change one, change the other.
export const SIDEBAR_WIDTH = 256
export const SIDEBAR_RAIL_WIDTH = 68

// Springs > durations for layout changes. A spring settles naturally; a
// fixed 300ms ease always feels either too slow or too abrupt somewhere.
const widthSpring = { type: "spring", stiffness: 320, damping: 32, mass: 0.8 }
const fade = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
  transition: { duration: 0.15 },
}

export function Sidebar({ collapsed, onToggle }) {
  return (
    // delayDuration={0}: in the collapsed rail you're scanning icons fast,
    // a 700ms tooltip delay would feel broken.
    <TooltipProvider delayDuration={0}>
      <motion.aside
        // initial={false} = don't animate the width on first paint, just be there.
        initial={false}
        animate={{ width: collapsed ? SIDEBAR_RAIL_WIDTH : SIDEBAR_WIDTH }}
        transition={widthSpring}
        data-collapsed={collapsed}
        className="sticky top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        {/* ---- Brand ---------------------------------------------------- */}
        <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
          <Link
            href="/overview"
            className="flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand/60">
            <motion.span
              whileHover={{ rotate: -12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-md shadow-brand/30">
              <Coffee className="h-5 w-5" />
            </motion.span>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span key="wordmark" {...fade} className="whitespace-nowrap">
                  <span className="block text-sm font-semibold leading-tight">Starbucks-ish</span>
                  <span className="block text-[11px] leading-tight text-sidebar-muted">Design system demo</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* ---- Nav ------------------------------------------------------ */}
        {/* min-h-0 is the flexbox incantation that lets a child actually scroll
            instead of pushing the footer off-screen. Ask me how many hours
            I lost to that one before I learned it. */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-6 px-3 py-4">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label}>
                <div className="mb-2 flex h-4 items-center px-3">
                  <AnimatePresence initial={false} mode="wait">
                    {collapsed ? (
                      <motion.div key="sep" {...fade} className="w-full">
                        <Separator className="bg-sidebar-border" />
                      </motion.div>
                    ) : (
                      <motion.p
                        key="label"
                        {...fade}
                        className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
                        {section.label}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <nav aria-label={section.label} className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink key={item.href} item={item} collapsed={collapsed} layoutId="sidebar-active" />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* ---- Footer / user -------------------------------------------- */}
        <div className="border-t border-sidebar-border p-3">
          <div className={cn("flex items-center gap-3 rounded-lg p-2", collapsed && "justify-center p-0")}>
            <Avatar className="h-9 w-9 ring-2 ring-brand/30">
              <AvatarFallback className="bg-brand/15 text-xs text-brand">HR</AvatarFallback>
            </Avatar>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div key="user" {...fade} className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">Harsh</p>
                  <p className="truncate text-xs text-sidebar-muted">Gold member · 240 ★</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Sign out"
                    className="h-8 w-8 text-sidebar-muted hover:text-sidebar-foreground">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Sign out</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* ---- Collapse handle ------------------------------------------ */}
        {/* Sits ON the border, half in / half out. Small detail, but it reads
            as "this edge is draggable/adjustable" without a label. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onToggle}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className="absolute -right-3 top-[4.5rem] z-50 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-muted shadow-sm transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60">
              <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex">
                <ChevronLeft className="h-3.5 w-3.5" />
              </motion.span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {collapsed ? "Expand" : "Collapse"}
            <kbd className="ml-2 rounded bg-primary-foreground/20 px-1 font-mono text-[10px]">[</kbd>
          </TooltipContent>
        </Tooltip>
      </motion.aside>
    </TooltipProvider>
  )
}
