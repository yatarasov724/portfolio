'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from './data/projects'
import { handleHashScroll } from '@/utils/scroll'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const [showHeaderLogo, setShowHeaderLogo] = useState(false)
  const { t, language } = useLanguage()
  const projects = getProjects(language)

  useEffect(() => {
    handleHashScroll()
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          // Показываем логотип в header когда проскроллили больше 200px
          setShowHeaderLogo(scrollY > 200)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Проверяем начальное состояние
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Header showLogo={showHeaderLogo} />
      
      {/* Hero Section */}
      <section id="hero-section" className="relative w-full overflow-hidden pt-24 sm:pt-28 md:pt-32">
        <div className="relative z-10 flex flex-col items-center justify-between min-h-[calc(100vh-80px)] px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="w-full max-w-5xl mx-auto flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Logo/Title */}
              <div className="h-[60px] sm:h-[72px] md:h-[84px] lg:h-[96px] flex items-center justify-center mb-6 sm:mb-8">
                <AnimatePresence>
                  {!showHeaderLogo && (
                    <motion.h1
                      key="hero-logo"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                      Yaroslav Tarasov
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2" style={{ textWrap: 'balance' }}>
                {language === 'en' 
                  ? <>Product Designer, specializing in B2B products and complex systems. I create interfaces that make complex workflows easier and team work more efficient.</>
                  : <>Продуктовый дизайнер, специализируюсь на B2B продуктах и сложных системах. Создаю интерфейсы, которые делают рабочие процессы легче, а работу команд эффективнее.</>
                }
              </p>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-gray-400 text-2xl sm:text-3xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>{t('about.title')}</SectionTitle>
          <div className="mt-8 sm:mt-12 max-w-3xl space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed" style={{ textWrap: 'balance' }}>
              {language === 'en' 
                ? <>Product Designer with over 5 years of experience. I specialize in B2B products, complex systems, and enterprise tools. Previously worked at T1, currently working at <span className="font-semibold text-gray-200">Kaspersky Lab</span>, where I design interfaces for dashboards, internal platforms, and applications with large data volumes.</>
                : <>Продуктовый дизайнер с опытом работы более 5 лет. Специализируюсь на B2B продуктах, сложных системах и корпоративных инструментах. Работал в T1, сейчас работаю в <span className="font-semibold text-gray-200">Лаборатории Касперского</span>, где проектирую интерфейсы для дашбордов, внутренних платформ и приложений с большим объемом данных.</>
              }
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed" style={{ textWrap: 'balance' }}>
              {t('about.paragraph2')}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed" style={{ textWrap: 'balance' }}>
              {t('about.paragraph3')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Skills & Focus Section */}
      <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>{t('skills.title')}</SectionTitle>
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Product Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-50 mb-3">{t('skills.productDesign.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ textWrap: 'balance' }}>
                  {t('skills.productDesign.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['UX/UI Design', 'User Research', 'Information Architecture', 'Prototyping', 'Validation', 'Dashboards'].map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-gray-800/30 border border-gray-700/30 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Design Systems */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-50 mb-3">{t('skills.designSystems.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ textWrap: 'balance' }}>
                  {t('skills.designSystems.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Components', 'Tokens', 'Documentation', 'Scalability', 'Consistency'].map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-gray-800/30 border border-gray-700/30 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Processes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-50 mb-3">{t('skills.processes.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ textWrap: 'balance' }}>
                  {t('skills.processes.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Collaboration', 'Strategy', 'Coordination', 'Internal Tools', 'Metrics'].map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-gray-800/30 border border-gray-700/30 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>{t('projects.title')}</SectionTitle>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Gradient Card */}
          <div className="relative bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-900/50 rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-blue-500/20 hover:border-blue-500/40 transition-all overflow-hidden">
            {/* Decorative gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-50 mb-4"
              >
                {t('contact.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
                  style={{ textWrap: 'balance' }}
                >
                  {t('contact.description')}
                </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4"
              >
                <motion.a
                  href="https://t.me/yatarasov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-950"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                  </svg>
                  <span>{t('contact.telegram')}</span>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/yatarasov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-colors border border-gray-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-950"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>{t('contact.linkedin')}</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
