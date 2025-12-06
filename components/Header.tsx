'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 max-w-5xl mx-auto px-6 py-8 z-20"
    >
      <nav className="flex justify-between items-center">
        <a href="/" className="text-xl font-semibold text-gray-50 hover:text-gray-100 transition-colors">
          Yaroslav Tarasov
        </a>
        <div className="flex gap-8">
          <a href="#projects" className="text-gray-400 hover:text-gray-100 transition-colors">
            Projects
          </a>
          <a href="#about" className="text-gray-400 hover:text-gray-100 transition-colors">
            About
          </a>
          <a href="#contact" className="text-gray-400 hover:text-gray-100 transition-colors">
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

