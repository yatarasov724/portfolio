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
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('about')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            О себе
          </a>
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('projects')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            Проекты
          </a>
          <a 
            href="#skills" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('skills')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            Навыки
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            Контакты
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

