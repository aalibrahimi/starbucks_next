import './globals.css'

export const metadata = {
  title: 'Starbucks Inspired Website',
  description: 'A Starbucks-inspired website built with Next.js and shadcn UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}