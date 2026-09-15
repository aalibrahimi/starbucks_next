import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'Starbucks Inspired Website',
  description: 'A Starbucks-inspired website built with Next.js and shadcn UI',
}

// Harsh — `suppressHydrationWarning` on <html> is required with next-themes.
// The server doesn't know your theme, the client does, so the `class` attr
// differs on first paint. That's expected; this just tells React to chill
// about that one element (it doesn't suppress warnings for children).
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
