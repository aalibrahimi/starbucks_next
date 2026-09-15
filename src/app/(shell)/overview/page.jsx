import { Keyboard, MoonStar, Smartphone, Sparkles, Star, ReceiptText, Coffee } from "lucide-react"

import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Overview · Starbucks-ish" }

const stats = [
  { label: "Stars balance", value: "240", hint: "60 more to a free drink", icon: Star },
  { label: "Orders this month", value: "12", hint: "3 ahead of last month", icon: ReceiptText },
  { label: "Go-to drink", value: "Caramel Macchiato", hint: "Ordered 7 times", icon: Coffee },
]

// Harsh — this page is basically a checklist for you. Go through each one
// and then open the component that makes it happen.
const tour = [
  {
    icon: Smartphone,
    title: "Resize the window",
    body: "Under 768px the sidebar disappears and the hamburger takes over. Same links, same active state — one nav-config.js feeds both.",
  },
  {
    icon: Keyboard,
    title: "Press [ and the number keys",
    body: "[ collapses the sidebar into an icon rail (with tooltips). 1–7 jump between pages. Try it while focused in a text field — it correctly does nothing.",
  },
  {
    icon: MoonStar,
    title: "Flip the theme",
    body: "Light, dark, or system. Refresh in dark mode: no white flash. Every color is an HSL token in globals.css — no component knows what 'green' is.",
  },
  {
    icon: Sparkles,
    title: "Watch the active pill",
    body: "Click between pages and watch the highlight slide instead of blink. That's one framer-motion prop: layoutId. Look in nav-link.jsx.",
  },
]

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good afternoon"
        title="Welcome back, Harsh"
        description="This shell is the enhanced version of the sidebar you built. Same idea — collapsible nav, hamburger on mobile, dark/light — but built as a system instead of a one-off.">
        <Badge variant="brand">Gold member</Badge>
      </PageHeader>

      <Stagger className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription>{s.label}</CardDescription>
                <s.icon className="h-4 w-4 text-brand" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Things to try</h2>
      <Stagger className="grid gap-4 md:grid-cols-2">
        {tour.map((t) => (
          <StaggerItem key={t.title}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <t.icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{t.body}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
