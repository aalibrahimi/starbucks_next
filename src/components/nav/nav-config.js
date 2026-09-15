import {
  LayoutDashboard,
  Coffee,
  Gift,
  CreditCard,
  ReceiptText,
  MapPin,
  Settings,
} from "lucide-react"

// Harsh — ONE list, consumed by the desktop sidebar, the mobile sheet, the
// tooltips, the keyboard shortcuts, and the page header breadcrumb.
// If you ever find yourself copy-pasting a link into two components,
// stop and put it here instead.
//
// Note the icon is the component itself (Coffee), not JSX (<Coffee />).
// That lets each consumer decide the size/class: the rail wants h-5,
// the mobile sheet wants h-6, the breadcrumb wants h-4. Passing pre-built
// JSX (like the menuItems in starbucks-home.jsx) locks you into one size.

export const NAV_SECTIONS = [
  {
    label: "Explore",
    items: [
      { href: "/overview", label: "Overview", icon: LayoutDashboard, shortcut: "1" },
      { href: "/menu", label: "Menu", icon: Coffee, shortcut: "2", badge: "New" },
      { href: "/rewards", label: "Rewards", icon: Gift, shortcut: "3" },
      { href: "/gift-cards", label: "Gift Cards", icon: CreditCard, shortcut: "4" },
    ],
  },
  {
    label: "You",
    items: [
      { href: "/orders", label: "Orders", icon: ReceiptText, shortcut: "5", badge: 3 },
      { href: "/stores", label: "Stores", icon: MapPin, shortcut: "6" },
      { href: "/settings", label: "Settings", icon: Settings, shortcut: "7" },
    ],
  },
]

// Flat list — handy for "find the item for the current URL" lookups.
export const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items)

// Active-route check lives here so desktop + mobile can't disagree about it.
// `/menu` is active for `/menu` AND `/menu/hot-coffees`. Exact-match only
// would break the moment we add nested pages.
export function isActiveRoute(pathname, href) {
  return pathname === href || pathname.startsWith(href + "/")
}
