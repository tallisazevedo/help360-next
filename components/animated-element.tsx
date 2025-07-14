"use client"

import type { ReactNode } from "react"
import { motion, type Variant } from "framer-motion"

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  variants?: {
    hidden: Variant
    visible: Variant
  }
  animation?: "fadeIn" | "slideUp" | "slideRight" | "slideLeft" | "scale" | "none"
}

export function AnimatedElement({
  children,
  className,
  delay = 0,
  duration = 0.5,
  variants,
  animation = "fadeIn",
}: AnimatedElementProps) {
  const defaultVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  }

  const selectedVariants = variants || defaultVariants[animation]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
