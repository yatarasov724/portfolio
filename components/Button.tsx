'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<MotionProps, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  target?: string
  rel?: string
}

const buttonVariants = {
  primary: 'px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-base w-full sm:w-auto',
  secondary: 'px-8 py-3.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-base w-full sm:w-auto text-center border border-gray-700',
  outline: 'px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  target,
  rel,
  ...motionProps
}: ButtonProps) {
  const baseClasses = buttonVariants[variant]
  const combinedClasses = `${baseClasses} ${className}`

  const motionPropsWithDefaults = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    ...motionProps,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={onClick}
        {...motionPropsWithDefaults}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      {...motionPropsWithDefaults}
    >
      {children}
    </motion.button>
  )
}
