'use client'

import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'

// Динамический импорт ReactMarkdown для code splitting
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: true })
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'
import Timeline from '@/components/Timeline'
import ImageModal from '@/components/ImageModal'
import { scrollToSectionOnHome } from '@/utils/scroll'
import { fixTypography } from '@/utils/typography'
import { useLanguage } from '@/contexts/LanguageContext'
import { TranslationKey } from '@/i18n/translations'
import { getTimelineSteps } from './data'
import CaseTimeline from '@/components/CaseTimeline'

// Константы для hero section будут использоваться с переводами

export default function ISYCasePage() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)
  const { t, language } = useLanguage()
  const timelineSteps = getTimelineSteps(language)
  
  // Сброс скролла при загрузке страницы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])
  
  const markdownContentBeforeProblem = language === 'en' 
    ? `## Overview

Automated dashboard for quick collection of statistics across the entire infrastructure. A unified window of metrics, risks, and process statuses for C-level, compliance, and information security employees. The dashboard helps identify anomalies, track deviations, and make operational decisions. Replaced the manual process of exporting data to Excel and building charts with automated real-time visualization.`
    : `## Обзор

Автоматизированный дашборд для быстрого сбора статистики по всей инфраструктуре. Единое окно метрик, рисков и статусов процессов для C-level, комплаенса и сотрудников информационной безопасности. Дашборд помогает выявлять аномалии, отслеживать отклонения и принимать оперативные решения. Заменил ручной процесс выгрузки данных в Excel и построения графиков на автоматизированную визуализацию в реальном времени.`
  
  const markdownContentProblem = language === 'en'
    ? `## Problem

- Management and compliance department spent hours on manual data collection: exporting to Excel, building charts, and preparing reports.

- Metrics were stored in different systems, there was no single source of truth for assessing infrastructure status.

- Lack of automation led to delays in identifying anomalies and making decisions.

- Complexity of data visualization made it difficult to quickly analyze trends and risks.`
    : `## Проблема

- Руководство и комплаенс-подразделение тратили часы на ручной сбор данных: выгрузку в Excel, построение графиков и подготовку отчётов.  

- Метрики хранились в разных системах, не было единого источника правды для оценки состояния инфраструктуры.  

- Отсутствие автоматизации приводило к задержкам в выявлении аномалий и принятии решений.  

- Сложность визуализации данных затрудняла быстрый анализ трендов и рисков.`
  
  const markdownContentGoals = language === 'en'
    ? `## Goals

- Create a single point of access to infrastructure metrics with automatic real-time data updates.

- Provide visualization of risks and process statuses with the ability for detailed analysis.

- Reduce time for report preparation and information search from hours to minutes.

- Design an interface understandable for non-tech users with intuitive navigation from general to specific.`
    : `## Цели

- Создать единую точку доступа к метрикам инфраструктуры с автоматическим обновлением данных в реальном времени.  

- Обеспечить визуализацию рисков и статусов процессов с возможностью детального анализа.  

- Сократить время на подготовку отчётов и поиск информации с часов до минут.  

- Спроектировать интерфейс, понятный для non-tech пользователей, с интуитивной навигацией от общего к частному.`
  
  const markdownContentResults = language === 'en'
    ? `## Results

- Automated collection of statistics across the entire infrastructure: the dashboard replaces manual Excel exports and chart building.

- Management received a "unified window" for quick access to real-time infrastructure statistics.

- Compliance and security employees became faster at finding deviations and anomalies thanks to automated visualization and detailed navigation from the big picture to specific data.

- The interface became visually standardized and understandable for non-tech users, simplifying work with data.`
    : `## Результаты

- Автоматизирован сбор статистики по всей инфраструктуре: дашборд заменяет ручную выгрузку в Excel и построение графиков.  

- Руководство получило "единое окно" для быстрого доступа к статистике инфраструктуры в реальном времени.  

- Комплаенс и сотрудники ИБ стали быстрее находить отклонения и аномалии благодаря автоматизированной визуализации и детальной навигации от общей картины к конкретным данным.  

- Интерфейс стал визуально стандартизированным и понятным для non-tech пользователей, что упростило работу с данными.`
  

  return (
    <SmoothScrollProvider>
    <main className="min-h-screen">
      <Header showLogo={true} />
      {/* Hero Section */}
        <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center">
          {/* Enhanced background with animated gradient glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            style={{ 
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse 60% 45% at 50% 65%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)',
                  'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 75%)',
                  'radial-gradient(ellipse 60% 45% at 50% 65%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            </div>
            
          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 md:pb-10">
            <div className="w-full flex flex-col items-center">
              {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center max-w-4xl mx-auto mb-6 sm:mb-8"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
                >
                  {language === 'en' ? 'Executive Dashboard' : fixTypography('Дашборд для топ-менеджмента')}
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                  {language === 'en' 
                    ? 'Dashboard for executive management and information security team. A unified window of metrics, risks, and process statuses for quick access to real-time infrastructure statistics.'
                    : fixTypography('Дашборд для топ-менеджмента и команды информационной безопасности. Единое окно метрик, рисков и статусов процессов для быстрого доступа к статистике инфраструктуры в реальном времени.')}
              </motion.p>
            </motion.div>
              
              {/* Dashboard Mockup Image with glow effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ amount: 0.3, once: false }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative w-full max-w-5xl mx-auto"
              >
                {/* Glow effect behind image */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                    filter: 'blur(60px)',
                  }}
                />
                
                {/* Image container */}
                <div className="relative w-full rounded-2xl shadow-md overflow-hidden">
                  <div className="relative w-full border border-gray-700/50 rounded-2xl overflow-hidden">
                    <Image
                      src="/cases/isy-iseeyou/images/laptop-dashboard.png"
                      alt={language === 'en' ? 'Executive Dashboard' : 'Дашборд для топ-менеджмента'}
                      width={1920}
                      height={1080}
                      priority
                      quality={95}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px"
                      style={{
                        imageRendering: 'crisp-edges',
                        WebkitImageRendering: 'crisp-edges',
                      } as React.CSSProperties}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget
                        target.src = '/cases/isy-iseeyou/images/isy-exec-dashboard.svg'
                        target.style.opacity = '0.5'
                      }}
                    />
          </div>
        </div>
        </motion.div>
            </div>
          </div>
      </section>

      {/* Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-24">
          <AnimatedSection className="prose prose-invert prose-lg max-w-none mb-24" amount={0.1}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0"
                    >
                      {children}
                    </motion.h2>
                  )
                },
                h3: ({node, ...props}) => (
                  <h3
                    className="text-2xl font-semibold text-gray-50 mb-6 mt-16"
                    {...props}
                  >
                    {props.children}
                  </h3>
                ),
                p: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg text-gray-400 leading-relaxed mb-6"
                    >
                      {children}
                    </motion.p>
                  )
                },
                ul: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="list-none text-gray-400 mb-8 space-y-0.5"
                    >
                      {children}
                    </motion.ul>
                  )
                },
                li: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3"
                    >
                      <span className="text-gray-500" aria-hidden>◆</span>
                      <span>{children}</span>
                    </motion.li>
                  )
                },
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-700 pl-6 italic text-gray-300 my-8 bg-gray-900/50 py-4 rounded-r-lg" {...props} />
                ),
            }}
          >
            {markdownContentBeforeProblem}
          </ReactMarkdown>
          
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0"
                    >
                      {children}
                    </motion.h2>
                  )
                },
                p: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg text-gray-400 leading-relaxed mb-6"
                    >
                      {children}
                    </motion.p>
                  )
                },
                ul: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="list-none text-gray-400 mb-8 space-y-0.5"
                    >
                      {children}
                    </motion.ul>
                  )
                },
                li: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3"
                    >
                      <span className="text-gray-500" aria-hidden>◆</span>
                      <span>{children}</span>
                    </motion.li>
                  )
                },
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-700 pl-6 italic text-gray-300 my-8 bg-gray-900/50 py-4 rounded-r-lg" {...props} />
                ),
            }}
          >
            {markdownContentProblem}
          </ReactMarkdown>
          
          {/* Before Image Section - после Проблемы, перед Целями */}
          <AnimatedSection className="my-12" amount={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6
              }}
              className="relative"
            >
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {t('case.sections.oldProcess')}
                </span>
              </div>
              <div 
                className="relative w-full rounded-lg overflow-hidden bg-gray-950 cursor-pointer border border-gray-700/50"
                onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/OLD ISY.png', alt: language === 'en' ? 'Old Process: Manual Excel Export' : 'Старый процесс: ручная выгрузка в Excel' })}
              >
                <Image
                  src="/cases/isy-iseeyou/images/OLD ISY.png"
                  alt={language === 'en' ? 'Old Process: Manual Excel Export' : 'Старый процесс: ручная выгрузка в Excel'}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                {language === 'en' 
                  ? 'Manual data export to Excel, manual chart building'
                  : 'Ручная выгрузка данных в Excel, построение графиков вручную'}
              </p>
            </motion.div>
          </AnimatedSection>
          
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0"
                    >
                      {children}
                    </motion.h2>
                  )
                },
                p: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg text-gray-400 leading-relaxed mb-6"
                    >
                      {children}
                    </motion.p>
                  )
                },
                ul: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="list-none text-gray-400 mb-8 space-y-0.5"
                    >
                      {children}
                    </motion.ul>
                  )
                },
                li: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3"
                    >
                      <span className="text-gray-500" aria-hidden>◆</span>
                      <span>{children}</span>
                    </motion.li>
                  )
                },
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-700 pl-6 italic text-gray-300 my-8 bg-gray-900/50 py-4 rounded-r-lg" {...props} />
                ),
            }}
          >
            {markdownContentGoals}
          </ReactMarkdown>
          </AnimatedSection>
          
          {/* Process Section with Vertical Timeline */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-8 mt-12 first:mt-0">
                {t('case.sections.process')}
              </h2>
            </Stagger>
            
            <CaseTimeline steps={timelineSteps} language={language} />
          </AnimatedSection>

          {/* Results Section */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0"
                    >
                      {children}
                    </motion.h2>
                  )
                },
                p: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg text-gray-400 leading-relaxed mb-6"
                    >
                      {children}
                    </motion.p>
                  )
                },
                ul: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="list-none text-gray-400 mb-8 space-y-0.5"
                    >
                      {children}
                    </motion.ul>
                  )
                },
                li: ({node, ...props}) => {
                  const { children } = props
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.2, once: false }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3"
                    >
                      <span className="text-gray-500" aria-hidden>◆</span>
                      <span>{children}</span>
                    </motion.li>
                  )
                },
              }}
            >
              {markdownContentResults}
            </ReactMarkdown>
          </AnimatedSection>

          {/* Roles Section */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                {t('case.sections.roles')}
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mb-8">
                {language === 'en' 
                  ? 'The dashboard is designed for various roles in the organization, each solving their tasks and getting expected results.'
                  : 'Дашборд предназначен для различных ролей в организации, каждая из которых решает свои задачи и получает ожидаемые результаты.'}
              </p>
            </Stagger>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'case.isy.roles.hostAdmin.role',
                  tasks: 'case.isy.roles.hostAdmin.tasks',
                  results: 'case.isy.roles.hostAdmin.results'
                },
                {
                  role: 'case.isy.roles.securitySpecialist.role',
                  tasks: 'case.isy.roles.securitySpecialist.tasks',
                  results: 'case.isy.roles.securitySpecialist.results'
                },
                {
                  role: 'case.isy.roles.departmentHead.role',
                  tasks: 'case.isy.roles.departmentHead.tasks',
                  results: 'case.isy.roles.departmentHead.results'
                },
                {
                  role: 'case.isy.roles.itOperator.role',
                  tasks: 'case.isy.roles.itOperator.tasks',
                  results: 'case.isy.roles.itOperator.results'
                },
                {
                  role: 'case.isy.roles.auditor.role',
                  tasks: 'case.isy.roles.auditor.tasks',
                  results: 'case.isy.roles.auditor.results'
                },
                {
                  role: 'case.isy.roles.developer.role',
                  tasks: 'case.isy.roles.developer.tasks',
                  results: 'case.isy.roles.developer.results'
                },
                {
                  role: 'case.isy.roles.ciso.role',
                  tasks: 'case.isy.roles.ciso.tasks',
                  results: 'case.isy.roles.ciso.results'
                },
                {
                  role: 'case.isy.roles.processManager.role',
                  tasks: 'case.isy.roles.processManager.tasks',
                  results: 'case.isy.roles.processManager.results'
                }
              ].map((item, index) => (
                <AnimatedSection key={index} amount={0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all h-full"
                  >
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">
                      {t(item.role as TranslationKey)}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {t('case.sections.mainTasks')}
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t(item.tasks as TranslationKey)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {t('case.sections.expectedResults')}
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t(item.results as TranslationKey)}
                        </p>
                      </div>
              </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Solution Section with Images */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                {t('case.sections.functions')}
              </h2>
            </Stagger>
            
            <div className="space-y-32">
              {/* Executive Dashboard */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      {language === 'en' ? 'Executive Dashboard' : 'Дашборд для топ-менеджмента'}
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl mb-6">
                      {language === 'en' 
                        ? 'Main screen with key infrastructure metrics, risk visualization and process statuses. Allows you to quickly assess the overall system state and move to detailed analysis.'
                        : 'Главный экран с ключевыми метриками инфраструктуры, визуализацией рисков и статусов процессов. Позволяет быстро оценить общее состояние системы и перейти к детальному анализу.'}
                    </p>
                  </Stagger>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/laptop-dashboard.png', alt: language === 'en' ? 'Executive Dashboard' : 'Дашборд для топ-менеджмента' })}
                    >
                      <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                        <Image
                          src="/cases/isy-iseeyou/images/laptop-dashboard.png"
                          alt={language === 'en' ? 'Executive Dashboard' : 'Дашборд для топ-менеджмента'}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          priority
                      quality={90}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.1, 
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/laptop-dashboard-2.png', alt: 'Дашборд для топ-менеджмента' })}
                    >
                      <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                        <Image
                          src="/cases/isy-iseeyou/images/laptop-dashboard-2.png"
                          alt={language === 'en' ? 'Executive Dashboard' : 'Дашборд для топ-менеджмента'}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Service Card */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      {t('case.sections.serviceCard')}
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl mb-6">
                      {language === 'en' 
                        ? 'Redesigned service card interface with improved navigation and information structure. Vertical sidebar replaced horizontal tabs, simplifying navigation and making the interface more modern and readable.'
                        : 'Переработанный интерфейс карточки сервиса с улучшенной навигацией и структурой информации. Вертикальная боковая панель заменила горизонтальные вкладки, что упростило навигацию и сделало интерфейс более современным и читаемым.'}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/service_card.png', alt: t('case.sections.serviceCard') })}
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/isy-iseeyou/images/service_card.png"
                        alt={t('case.sections.serviceCard')}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain rounded-lg"
                        priority
                      quality={90}
                />
              </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Requirement Card */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      {t('case.sections.requirementCard')}
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {language === 'en' 
                        ? 'The requirement card contains information about all autochecks that are part of this security requirement. Allows you to see detailed information about each autocheck, its status and check results in one place.'
                        : 'Карточка требования содержит информацию по всем авточекам, которые входят в это требование ИБ. Позволяет видеть детальную информацию о каждом авточеке, его статусе и результатах проверки в едином месте.'}
                    </p>
                  </Stagger>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                        <Image
                          src="/cases/isy-iseeyou/images/autocheck_card.png"
                          alt={t('case.sections.requirementCard')}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          priority
                      quality={90}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.1, 
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                        <Image
                          src="/cases/isy-iseeyou/images/autocheck_card_details.png"
                          alt="Детали карточки требования"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Other Screens and States */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-6">
                      {t('case.sections.additionalScreens')}
                    </h3>
                  </Stagger>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* All Good State */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">
                        {t('case.sections.allGoodState')}
                      </h4>
                      <motion.div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer group"
                        onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/success.png', alt: t('case.sections.allGoodState') })}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/success.png"
                          alt={t('case.sections.allGoodState')}
                          fill
                          className="object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Tooltips */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative"
                    >
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">
                        {t('case.sections.interactiveTooltips')}
                      </h4>
                      <motion.div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer group"
                        onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/tooltips.png', alt: t('case.sections.interactiveTooltips') })}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/tooltips.png"
                          alt={t('case.sections.interactiveTooltips')}
                          fill
                          className="object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Global Filters */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative"
                    >
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">
                        {t('case.sections.globalFilters')}
                      </h4>
                      <motion.div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer group"
                        onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/global_filter.png', alt: t('case.sections.globalFilters') })}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/global_filter.png"
                          alt={t('case.sections.globalFilters')}
                          fill
                          className="object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Table Settings */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="relative"
                    >
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">
                        {t('case.sections.tableSettings')}
                      </h4>
                      <motion.div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer group"
                        onClick={() => setZoomedImage({ src: '/cases/isy-iseeyou/images/table_filter.png', alt: t('case.sections.tableSettings') })}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/table_filter.png"
                          alt={t('case.sections.tableSettings')}
                          fill
                          className="object-contain"
                          quality={85}
                      loading="lazy"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>
              </div>
          </AnimatedSection>

          {/* Contact/CTA Section */}
          <AnimatedSection className="mt-32 mb-16" amount={0.1}>
            <div className="relative">
              {/* Gradient Card */}
              <div className="relative bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-900/50 rounded-2xl p-8 md:p-12 border-2 border-blue-500/20 hover:border-blue-500/40 transition-all overflow-hidden">
                {/* Decorative gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10 text-center">
              <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-gray-50 mb-4"
              >
                    {t('case.cta.title')}
              </motion.h2>
              <motion.p
                    initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                    {t('case.cta.description')}
              </motion.p>
              
              <motion.div
                    initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
              >
                <motion.a
                  href="https://t.me/yatarasov"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto min-w-[200px] sm:min-w-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="whitespace-nowrap">{t('case.cta.telegram')}</span>
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                  </svg>
                </motion.a>
                
                    <motion.button
                      onClick={() => scrollToSectionOnHome('projects')}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 w-full sm:w-auto min-w-[200px] sm:min-w-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="whitespace-nowrap">{t('case.cta.viewOtherProjects')}</span>
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                    </motion.button>
              </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
    </main>

    {/* Image Modal */}
      {zoomedImage && (
      <ImageModal
        src={zoomedImage.src}
        alt={zoomedImage.alt}
        isOpen={true}
        onClose={() => setZoomedImage(null)}
      />
    )}
    </SmoothScrollProvider>
  )
}
