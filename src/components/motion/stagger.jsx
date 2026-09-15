"use client"

import { motion } from "framer-motion"

// Harsh — reusable "cards cascade in" effect. Wrap a grid in <Stagger>, wrap
// each card in <StaggerItem>, done. Every page in the demo uses this, which
// is the point: motion should feel like ONE system, not seven different
// experiments. Same spring, same offset, same delay, everywhere.

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
}

export function Stagger({ children, className }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
