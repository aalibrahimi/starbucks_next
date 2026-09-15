"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Coffee, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_SECTIONS } from "./nav-config"
import { NavLink } from "./nav-link"
import { ThemeToggle } from "./theme-toggle"

// Harsh — the mobile drawer. Notice it imports the SAME nav-config and the
// SAME NavLink as the desktop sidebar. The only mobile-specific stuff here
// is the container (Sheet) and the entrance choreography.

// Variants = named animation states. The parent says "go to 'show'" and
// staggerChildren makes each child hit 'show' 40ms after the previous one.
// That cascade is the difference between "a menu appeared" and "a menu opened".
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
}

// Three bars that morph into an X. Top and bottom bars move to the middle
// and rotate ±45°, the middle one shrinks away. Pure motion, no icon swap.
function HamburgerIcon({ open }) {
  const bar = "absolute left-0 h-0.5 w-5 rounded-full bg-current"
  const t = { type: "spring", stiffness: 500, damping: 35 }
  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <motion.span className={bar} animate={open ? { top: 9, rotate: 45 } : { top: 3, rotate: 0 }} transition={t} />
      <motion.span className={bar} style={{ top: 9 }} animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={t} />
      <motion.span className={bar} animate={open ? { top: 9, rotate: -45 } : { top: 15, rotate: 0 }} transition={t} />
    </span>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the drawer whenever the URL changes. One effect here beats wiring
  // an onClick onto every single link (and it also handles back/forward).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <HamburgerIcon open={open} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        hideClose
        className="flex w-[85vw] max-w-xs flex-col gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-md shadow-brand/30">
              <Coffee className="h-5 w-5" />
            </span>
            <div>
              {/* SheetTitle/Description aren't decoration — Radix uses them to
                  label the dialog for screen readers and warns if they're missing. */}
              <SheetTitle className="text-sm font-semibold leading-tight text-sidebar-foreground">
                Starbucks-ish
              </SheetTitle>
              <SheetDescription className="text-[11px] leading-tight text-sidebar-muted">
                Design system demo
              </SheetDescription>
            </div>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        {/* The Sheet unmounts its content on close, so this stagger replays
            every time it opens. That's what we want — it's cheap and it's
            the moment the user is actually looking. */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <motion.p
                variants={itemVariants}
                className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
                {section.label}
              </motion.p>
              <nav aria-label={section.label} className="space-y-1">
                {section.items.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    {/* Bigger tap target on touch. 44px is Apple's minimum; h-12 = 48px. */}
                    <NavLink item={item} layoutId="mobile-active" className="h-12 text-base" />
                  </motion.div>
                ))}
              </nav>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center justify-between border-t border-sidebar-border p-4">
          <span className="text-xs text-sidebar-muted">Appearance</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
