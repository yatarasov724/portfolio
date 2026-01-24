'use client'

import { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { handleSmoothScroll } from '@/utils/scroll'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeaderProps {
  showLogo?: boolean
}

function Header({ showLogo = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isCasePage = pathname?.startsWith('/cases')
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
  ]

  // Предотвращаем скролл body при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    if (isCasePage) {
      // На странице кейса - переходим на главную с якорем
      e.preventDefault()
      window.location.href = `/#${itemId}`
    } else {
      // На главной странице - используем плавный скролл
      handleSmoothScroll(e, itemId)
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full px-4 sm:px-6 py-6 sm:py-8 z-50 transition-all pointer-events-auto"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(3, 7, 18, 0.8)',
        }}
      >
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="min-w-[180px] h-[28px] flex items-center">
            <AnimatePresence mode="wait">
              {showLogo ? (
                <motion.div
                  key="header-logo"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-lg sm:text-xl font-semibold text-gray-50 z-50"
                >
                  <Link 
                    href="/" 
                    className="hover:text-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Yaroslav Tarasov
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="header-spacer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                />
              )}
            </AnimatePresence>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={isCasePage ? `/#${item.id}` : `#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
              className="text-gray-400 hover:text-gray-100 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-700/50 hover:border-gray-600/50"
              aria-label="Switch language"
            >
              {language === 'en' ? 'RU' : 'EN'}
            </button>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-[60] w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            type="button"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-gray-50 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-gray-50 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-gray-50 rounded-full"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay - вынесено из header */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-gray-950 border-l border-gray-800 z-[55] md:hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col pt-24 px-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={isCasePage ? `/#${item.id}` : `#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-lg font-medium text-gray-300 hover:text-gray-50 py-4 border-b border-gray-800 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                {/* Language Switcher for Mobile */}
                <motion.button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'ru' : 'en')
                    setIsMenuOpen(false)
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="text-lg font-medium text-gray-300 hover:text-gray-50 py-4 border-b border-gray-800 transition-colors text-left"
                >
                  {language === 'en' ? 'Русский' : 'English'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Header)

