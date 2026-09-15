// import StarbucksHome from '@/components/starbucks-home'
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StarbucksHome from '../components/starbucks-home';


export default function Home() {
  return (
    <main>
      <StarbucksHome />
      {/* this is where we will be working on the starbucks react project */}

      {/* Harsh — floating pill into the sidebar/design-system demo at /overview.
          Everything under src/app/(shell)/ gets the new shell; this page doesn't. */}
      <Link
        href="/overview"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2">
        Open the sidebar demo <ArrowRight className="h-4 w-4" />
      </Link>
    </main>
  )
}
