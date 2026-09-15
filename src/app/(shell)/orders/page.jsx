import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Orders · Starbucks-ish" }

const orders = [
  { id: "#48213", when: "Today, 8:12 AM", store: "Main St & 5th", items: ["Grande Caramel Macchiato", "Butter Croissant"], total: "$8.20", status: "Ready" },
  { id: "#48190", when: "Yesterday, 3:40 PM", store: "Main St & 5th", items: ["Venti Cold Brew"], total: "$4.45", status: "Picked up" },
  { id: "#48102", when: "Sep 10, 7:55 AM", store: "Airport T2", items: ["Tall Cappuccino", "Egg Bites"], total: "$9.70", status: "Picked up" },
]

// Status → badge variant lookup. When you add "Cancelled", add it here, not
// in a ternary chain inside the JSX.
const statusVariant = { Ready: "brand", "Picked up": "secondary" }

export default function OrdersPage() {
  return (
    <>
      <PageHeader eyebrow="You" title="Orders" description="Recent pickups and what's brewing right now." />

      <Stagger className="space-y-3">
        {orders.map((o) => (
          <StaggerItem key={o.id}>
            <Card className="transition-colors hover:bg-accent/40">
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-muted-foreground">{o.id}</p>
                    <Badge variant={statusVariant[o.status] ?? "outline"}>{o.status}</Badge>
                  </div>
                  <p className="mt-1 truncate font-medium">{o.items.join(" · ")}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.when} · {o.store}
                  </p>
                </div>
                <Separator className="sm:hidden" />
                <p className="text-lg font-bold sm:text-right">{o.total}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
