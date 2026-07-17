'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { NAV_SECTIONS } from '@/lib/chat/nav'
import type { NavItem } from '@/lib/chat/nav'
import { AboutIcon, BarChartIcon, SproutIcon, MailIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from './icons'

const ICON_COMPONENTS = {
  about: AboutIcon,
  isy: BarChartIcon,
  agro: SproutIcon,
  contact: MailIcon,
}

const NAV_COPY: Record<NavItem['id'], { ru: { title: string; meta: string }; en: { title: string; meta: string } }> = {
  about: {
    ru: { title: 'Обо мне', meta: 'Кто я и что умею' },
    en: { title: 'About', meta: 'Who I am' },
  },
  isy: {
    ru: { title: 'Мониторинг инфраструктуры', meta: 'B2B · 2025' },
    en: { title: 'Infrastructure Monitoring', meta: 'B2B · 2025' },
  },
  agro: {
    ru: { title: 'Агроплатформа', meta: 'AgTech · 2023–2024' },
    en: { title: 'Agricultural Platform', meta: 'AgTech · 2023–2024' },
  },
  contact: {
    ru: { title: 'Контакты', meta: 'Telegram · LinkedIn · CV' },
    en: { title: 'Contact', meta: 'Telegram · LinkedIn · CV' },
  },
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-3 pb-5 mb-4 border-b border-gray-200 dark:border-gray-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
          YT
        </div>
        <div>
          <div className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Yaroslav Tarasov</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Product Designer
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {NAV_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {sectionIndex > 0 && <div className="h-px bg-gray-200 dark:bg-gray-800/50 my-2.5 mx-3" />}
            {section.items.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon]
              const copy = NAV_COPY[item.id][language]
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 transition-colors ${
                    isActive ? 'bg-blue-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] mt-0.5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-500 dark:text-gray-500'}`} />
                  <div>
                    <div className={`text-[13.5px] font-medium leading-snug ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      {copy.title}
                    </div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">{copy.meta}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800/50 flex items-center justify-between px-3 pb-1 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 bg-gray-100 dark:bg-gray-900/50 rounded-lg p-0.5">
            {(['ru', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  language === lang
                    ? 'bg-gray-300 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900/50 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </div>
        <a
          href="/Tarasov Yaroslav (4).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          {language === 'ru' ? '↓ Резюме' : '↓ Resume'}
        </a>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <aside className="hidden md:flex w-72 flex-shrink-0 flex-col bg-gray-50 dark:bg-gray-900/40 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800/50 px-3 py-5 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 text-gray-700 dark:text-gray-300"
        aria-label="Open menu"
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-50 md:hidden px-3 py-5 flex flex-col"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400"
                aria-label="Close menu"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
              <SidebarContent onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
