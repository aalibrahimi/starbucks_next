import { MapPin, Clock, Car } from "lucide-react"

import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Stores · Starbucks-ish" }

const stores = [
  { name: "Main St & 5th", distance: "0.3 mi", hours: "Open until 9 PM", driveThru: true, open: true },
  { name: "Riverside Plaza", distance: "1.1 mi", hours: "Open until 8 PM", driveThru: false, open: true },
  { name: "Airport Terminal 2", distance: "6.4 mi", hours: "Opens 5 AM", driveThru: false, open: false },
]

export default function StoresPage() {
  return (
    <>
      <PageHeader eyebrow="You" title="Stores" description="Nearby locations, sorted by distance.">
        <Button variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" /> Use my location
        </Button>
      </PageHeader>

      <Stagger className="grid gap-4 md:grid-cols-3">
        {stores.map((s) => (
          <StaggerItem key={s.name}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{s.name}</h3>
                  {/* Color as a status signal: brand green = open, muted = closed.
                      Never rely on color alone though — the text says it too. */}
                  <Badge variant={s.open ? "brand" : "secondary"}>{s.open ? "Open" : "Closed"}</Badge>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {s.distance} away</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> {s.hours}</li>
                  {s.driveThru && <li className="flex items-center gap-2"><Car className="h-4 w-4" /> Drive-thru</li>}
                </ul>
                <Button variant="secondary" className="mt-auto w-full">Order here</Button>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
