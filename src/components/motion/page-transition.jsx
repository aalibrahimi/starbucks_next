"use client"

import { motion, useReducedMotion } from "framer-motion"

// Harsh — every route change fades/slides the new page in. This lives in
// src/app/(shell)/template.jsx (NOT layout.jsx): a template re-mounts on every
// navigation, a layout doesn't. Re-mount = `initial` fires again = animation.
//
// You'll notice there's no exit animation. In the App Router the old page is
// gone the instant the new one arrives, so exit animations need hacks
// (freezing the router context). Not worth it — a good enter is 90% of the feel.
export function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      // Custom cubic-bezier: fast start, soft landing. Feels "expensive".
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
