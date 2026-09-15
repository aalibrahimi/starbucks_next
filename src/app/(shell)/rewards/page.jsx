import { Star, Gift, Coffee, Cake } from "lucide-react"

import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = { title: "Rewards · Starbucks-ish" }

const tiers = [
  { stars: 25, title: "Customize your drink", body: "Extra shot, syrup, or dairy alternative on the house.", icon: Coffee },
  { stars: 100, title: "Brewed coffee or bakery", body: "Hot coffee, tea, or a pastry to go with it.", icon: Cake },
  { stars: 200, title: "Handcrafted drink", body: "Any latte, frappuccino, or cold brew, any size.", icon: Star },
  { stars: 400, title: "Merch or packaged coffee", body: "A bag of beans or a tumbler you'll actually use.", icon: Gift },
]

const BALANCE = 240

export default function RewardsPage() {
  const next = tiers.find((t) => t.stars > BALANCE)
  const progress = next ? Math.round((BALANCE / next.stars) * 100) : 100

  return (
    <>
      <PageHeader eyebrow="Explore" title="Rewards" description="Earn Stars with every order and cash them in for the good stuff." />

      {/* Progress card. The gradient + big number is the "hero" of this page;
          everything else steps back. Every page should have one focal point. */}
      <Card className="mb-8 overflow-hidden border-brand/20 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent">
        <CardHeader>
          <CardDescription>Your balance</CardDescription>
          <CardTitle className="flex items-baseline gap-2 text-4xl">
            {BALANCE} <Star className="h-6 w-6 fill-brand text-brand" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand/15">
            <div className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
          {next && (
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{next.stars - BALANCE} Stars</span> to your next reward: {next.title.toLowerCase()}
            </p>
          )}
        </CardContent>
      </Card>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => {
          const unlocked = BALANCE >= t.stars
          return (
            <StaggerItem key={t.stars}>
              <Card className={unlocked ? "h-full border-brand/40" : "h-full opacity-70"}>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      {t.stars} <Star className="h-3.5 w-3.5 fill-current text-brand" />
                    </span>
                  </div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <CardDescription>{t.body}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          )
        })}
      </Stagger>
    </>
  )
}
