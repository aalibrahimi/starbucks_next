import { AppShell } from "@/components/nav/app-shell"

// Harsh — the folder is called (shell) with parentheses. That's a Next.js
// "route group": it groups pages under one layout WITHOUT adding a URL
// segment. So src/app/(shell)/menu/page.jsx is served at /menu, not /shell/menu.
//
// The storefront at / stays outside this group, so it keeps its own header
// and doesn't get the sidebar. Two different frames, one app.
export default function ShellLayout({ children }) {
  return <AppShell>{children}</AppShell>
}
