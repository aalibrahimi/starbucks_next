"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { isActiveRoute } from "./nav-config"

// Harsh — this ONE component renders every link in both the desktop rail and
// the mobile sheet. Same active logic, same hover, same focus ring. The video
// version had six near-identical <div>s; when you change one you'd have to
// change six. Here you change one.

const spring = { type: "spring", stiffness: 500, damping: 40 }

export function NavLink({ item, collapsed = false, layoutId = "nav-active", onNavigate, className }) {
  const pathname = usePathname()
  const active = isActiveRoute(pathname, item.href)
  const Icon = item.icon
  const hasBadge = item.badge !== undefined && item.badge !== null

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      // aria-current is how screen readers know "you are here". Free win.
      aria-current={active ? "page" : undefined}
      // Collapsed = the visible label is gone, so the link has NO accessible
      // name. A tooltip doesn't count (it's only in the tree while open).
      // I caught this with Playwright: getByRole("link", { name: "Rewards" })
      // found nothing in rail mode. Automated checks find what eyes miss.
      aria-label={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex h-10 items-center rounded-lg px-3 text-sm font-medium outline-none",
        "transition-colors duration-150",
        // Keyboard users get a visible ring. Mouse users never see it. Both happy.
        "focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
        active
          ? "text-sidebar-accent-foreground"
          : "text-sidebar-muted hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
        collapsed && "justify-center px-0",
        className
      )}>
      {/*
        The magic trick: `layoutId`. Every active link renders a span with the
        SAME layoutId. When the active route changes, Framer sees the "same"
        element move to a new position and animates the pill sliding between
        links instead of blinking. Zero manual position math.
      */}
      {active && (
        <motion.span
          layoutId={layoutId}
          transition={spring}
          className="absolute inset-0 rounded-lg bg-sidebar-accent" />
      )}
      {active && (
        <motion.span
          layoutId={`${layoutId}-bar`}
          transition={spring}
          className="absolute -left-3 top-[10px] h-5 w-1 rounded-r-full bg-brand" />
      )}

      <span className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
        <span className="relative shrink-0">
          <Icon
            className={cn(
              "h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95",
              active && "text-brand"
            )} />
          {/* Collapsed rail has no room for a badge — shrink it to a dot. */}
          {collapsed && hasBadge && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-brand ring-2 ring-sidebar" />
          )}
        </span>

        {/* AnimatePresence lets the label fade OUT when collapsing, not just pop. */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="truncate">
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {!collapsed && (
        <span className="relative z-10 ml-2 flex shrink-0 items-center">
          {hasBadge ? (
            <Badge variant="brand" className="px-1.5 py-0 text-[10px] leading-4">
              {item.badge}
            </Badge>
          ) : item.shortcut ? (
            // Shortcut hint only shows on hover so the rail stays quiet.
            <kbd className="hidden rounded border border-sidebar-border bg-sidebar px-1.5 font-mono text-[10px] text-sidebar-muted opacity-0 transition-opacity group-hover:opacity-100 md:inline-block">
              {item.shortcut}
            </kbd>
          ) : null}
        </span>
      )}
    </Link>
  )

  if (!collapsed) return link

  // Collapsed = icon only, so the label moves into a tooltip. Without this,
  // a rail of bare icons is a guessing game for anyone new to the app.
  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={12} className="flex items-center gap-2">
        {item.label}
        {item.shortcut && (
          <kbd className="rounded bg-primary-foreground/20 px-1 font-mono text-[10px]">{item.shortcut}</kbd>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
