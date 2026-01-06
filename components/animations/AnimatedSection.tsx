'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  once?: boolean
  id?: string
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
  once = true,
  id,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // easeOut
      },
    },
  }

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: '0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}







