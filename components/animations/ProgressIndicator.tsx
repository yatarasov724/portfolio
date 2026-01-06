'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface ProgressIndicatorProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export default function ProgressIndicator({
  orientation = 'vertical',
  className = '',
}: ProgressIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const progress = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 1]
  )

  if (shouldReduceMotion) {
    return null
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {orientation === 'vertical' ? (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gray-500 origin-top"
            style={{ scaleY: progress, height: '100%' }}
          />
        </div>
      ) : (
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-800">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gray-500 origin-left"
            style={{ scaleX: progress, width: '100%' }}
          />
        </div>
      )}
    </div>
  )
}







