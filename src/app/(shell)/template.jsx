import { PageTransition } from "@/components/motion/page-transition"

// See the comment in page-transition.jsx for why this is a template, not a layout.
export default function ShellTemplate({ children }) {
  return <PageTransition>{children}</PageTransition>
}
