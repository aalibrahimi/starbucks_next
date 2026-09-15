import { Coffee } from "lucide-react"

import { PageHeader } from "@/components/nav/page-header"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Gift Cards · Starbucks-ish" }

// Harsh — gradients are defined with Tailwind classes, not inline styles, so
// they get purged/optimized like everything else and stay themeable.
const designs = [
  { name: "Thank You", gradient: "from-emerald-500 to-teal-700" },
  { name: "Happy Birthday", gradient: "from-pink-500 to-rose-600" },
  { name: "Congrats", gradient: "from-amber-400 to-orange-600" },
  { name: "Just Because", gradient: "from-sky-500 to-indigo-600" },
  { name: "Holiday", gradient: "from-red-600 to-emerald-800" },
  { name: "Classic", gradient: "from-slate-700 to-slate-900" },
]

export default function GiftCardsPage() {
  return (
    <>
      <PageHeader eyebrow="Explore" title="Gift Cards" description="Pick a design, add a note, send it in seconds.">
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Send a gift card</Button>
      </PageHeader>

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((d) => (
          <StaggerItem key={d.name}>
            <button
              type="button"
              className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              {/* aspect-[1.586] is the real credit card ratio. Details like that
                  are why something "looks right" without anyone knowing why. */}
              <div
                className={`relative aspect-[1.586] overflow-hidden rounded-2xl bg-gradient-to-br ${d.gradient} p-5 text-white shadow-lg transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-[-1deg] group-hover:shadow-2xl`}>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <Coffee className="h-7 w-7 opacity-90" />
                <p className="absolute bottom-5 left-5 text-lg font-semibold tracking-wide">{d.name}</p>
                <p className="absolute bottom-5 right-5 font-mono text-xs opacity-70">•••• 4821</p>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  )
}
