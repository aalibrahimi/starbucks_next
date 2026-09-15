import { Coffee, Snowflake, Leaf, Croissant } from "lucide-react"

import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Menu · Starbucks-ish" }

const drinks = [
  { name: "Caramel Macchiato", price: "$4.95", cat: "Hot", icon: Coffee, tag: "Popular" },
  { name: "Pumpkin Spice Latte", price: "$5.25", cat: "Hot", icon: Leaf, tag: "Seasonal" },
  { name: "Iced Brown Sugar Shaken Espresso", price: "$5.45", cat: "Cold", icon: Snowflake, tag: "New" },
  { name: "Cold Brew", price: "$3.95", cat: "Cold", icon: Snowflake },
  { name: "Cappuccino", price: "$3.95", cat: "Hot", icon: Coffee },
  { name: "Butter Croissant", price: "$3.25", cat: "Bakery", icon: Croissant },
]

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Menu"
        description="Every card here is the same shadcn Card with a hover lift. Consistency beats cleverness.">
        <Button variant="outline">Filter</Button>
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Start an order</Button>
      </PageHeader>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drinks.map((d) => (
          <StaggerItem key={d.name}>
            {/* group + hover translate: the whole card lifts, the icon tilts.
                Two tiny transforms, and it suddenly feels touchable. */}
            <Card className="group h-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <CardContent className="flex h-full flex-col p-5">
                <div className="mb-4 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
                    <d.icon className="h-5 w-5" />
                  </span>
                  {d.tag && <Badge variant="brand">{d.tag}</Badge>}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{d.cat}</p>
                <h3 className="mt-1 font-semibold leading-snug">{d.name}</h3>
                <p className="mt-auto pt-4 text-lg font-bold text-brand">{d.price}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
