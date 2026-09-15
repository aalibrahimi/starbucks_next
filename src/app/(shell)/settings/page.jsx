import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/nav/theme-toggle"

export const metadata = { title: "Settings · Starbucks-ish" }

// Harsh — a server component rendering a client component (ThemeToggle).
// Totally fine. The rule is only that client components can't import server
// components — not the other way round.
export default function SettingsPage() {
  return (
    <>
      <PageHeader eyebrow="You" title="Settings" description="Profile, appearance, and the little things." />

      <Stagger className="grid gap-4 lg:grid-cols-2">
        <StaggerItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>How you show up on receipts and rewards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Click into a field and press 1-7 or [ — nothing happens.
                  That's isTypingTarget() in app-shell.jsx doing its job. */}
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium">Display name</span>
                <Input defaultValue="Harsh" />
              </label>
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium">Email</span>
                <Input type="email" defaultValue="harsh@example.com" />
              </label>
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Save changes</Button>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>Same toggle as the header — one component, rendered twice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Light, dark, or follow your OS.</p>
                </div>
                <ThemeToggle />
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Sidebar</p>
                <p className="text-xs text-muted-foreground">
                  Press <kbd className="rounded border bg-muted px-1 font-mono text-[11px]">[</kbd> to collapse or expand. Your choice is remembered in localStorage.
                </p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </Stagger>
    </>
  )
}
