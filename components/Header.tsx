'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { handleSmoothScroll } from '@/utils/scroll'

const navItems = [
  { id: 'about', label: 'О себе' },
  { id: 'projects', label: 'Проекты' },
  { id: 'skills', label: 'Навыки' },
  { id: 'contact', label: 'Контакты' },
]

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 max-w-5xl mx-auto px-6 py-8 z-20"
    >
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-50 hover:text-gray-100 transition-colors">
          Yaroslav Tarasov
        </Link>
        <div className="flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleSmoothScroll(e, item.id)}
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}

export default memo(Header)

