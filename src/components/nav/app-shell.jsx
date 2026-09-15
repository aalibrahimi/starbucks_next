"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ChevronRight, LogOut, Settings, Store, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"
import { NAV_ITEMS, isActiveRoute } from "./nav-config"

// Harsh — the shell is the frame every page sits in: sidebar + header + main.
// Pages know nothing about navigation. They just render their content.
// That separation is what lets you redesign the nav without touching 7 pages.

const STORAGE_KEY = "sidebar:collapsed"

// Remember collapsed/expanded across reloads. Reading localStorage during
// render would break SSR (no window on the server), so we read it in an
// effect after mount. Tiny hook, one job.
function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(STORAGE_KEY) === "1")
    } catch {}
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {}
      return next
    })
  }, [])

  return [collapsed, toggle]
}

function isTypingTarget(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
}

// Keyboard shortcuts: `[` toggles the sidebar, 1-7 jump to a page.
// Two rules that make shortcuts not-annoying:
//   1. Ignore when the user is typing in a field.
//   2. Ignore when a modifier is held (don't hijack Ctrl+1 = browser tab 1).
function useKeyboardNav(onToggleSidebar) {
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return

      if (e.key === "[") {
        e.preventDefault()
        onToggleSidebar()
        return
      }
      const item = NAV_ITEMS.find((i) => i.shortcut === e.key)
      if (item) {
        e.preventDefault()
        router.push(item.href)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [router, onToggleSidebar])
}

export function AppShell({ children }) {
  const [collapsed, toggle] = useSidebarCollapsed()
  useKeyboardNav(toggle)

  const pathname = usePathname()
  const current = NAV_ITEMS.find((item) => isActiveRoute(pathname, item.href))
  const CurrentIcon = current?.icon

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggle} />

      {/* min-w-0 so a wide table/pre in a page can't push the sidebar off-screen. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
          {/* Only renders its trigger below md — the desktop Sidebar takes over above. */}
          <MobileNav />

          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
            <Link href="/overview" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">
              Starbucks-ish
            </Link>
            <ChevronRight className="hidden h-4 w-4 text-muted-foreground sm:inline" />
            <span className="flex items-center gap-2 truncate font-medium">
              {CurrentIcon && <CurrentIcon className="h-4 w-4 text-brand" />}
              {current?.label ?? "Page"}
            </span>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5" />
              {/* ring-background punches a gap between dot and icon so it reads as "on top of", not "touching". */}
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-background" />
            </Button>
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-brand/15 text-xs text-brand">HR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">Harsh</p>
                  <p className="text-xs font-normal text-muted-foreground">harsh@example.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* asChild = "don't render your own element, use mine". So the
                    menu item IS the <Link>, with all the menu keyboard behaviour
                    AND real client-side navigation. */}
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer gap-2">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer gap-2">
                    <Settings className="h-4 w-4" /> Settings
                    <DropdownMenuShortcut>7</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer gap-2">
                    <Store className="h-4 w-4" /> Back to storefront
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 bg-dot-grid">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
