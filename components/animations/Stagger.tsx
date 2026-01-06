'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode, Children } from 'react'

interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
  amount?: number
  once?: boolean
}

export default function Stagger({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
  amount = 0.2,
  once = false,
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  const childrenArray = Children.toArray(children)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}







