import { cn } from "@/lib/utils"

// Harsh — no "use client" here on purpose. This is a plain server component:
// no state, no effects, no motion. Push interactivity down to the leaves
// (Stagger, NavLink, ThemeToggle) and keep the page skeletons on the server.
export function PageHeader({ eyebrow, title, description, children, className }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-1">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="max-w-prose text-sm text-muted-foreground md:text-base">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  )
}
