'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'
import ImageModal from '@/components/ImageModal'
import { scrollToSectionOnHome } from '@/utils/scroll'
import { fixTypography } from '@/utils/typography'
import { useLanguage } from '@/contexts/LanguageContext'
import { TranslationKey } from '@/i18n/translations'
import { getTimelineSteps } from './data'
import { getFunctionsData } from './functions-data'
import CaseTimeline from '@/components/CaseTimeline'

// Динамический импорт ReactMarkdown для code splitting
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: true })
import remarkGfm from 'remark-gfm'

export default function AgroPlatformCasePage() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)
  const { t, language } = useLanguage()
  const timelineSteps = getTimelineSteps(language)
  const functionsData = getFunctionsData(language)

  // Константы для hero section с локализацией
  const HERO_CONFIG = {
    image: {
      src: '/cases/agro-platform/images/agro-platform-hero.png',
      alt: language === 'en' ? 'Agricultural management platform' : 'Платформа для управления сельским хозяйством',
      height: '125%' as const,
    },
    content: {
      headline: t('case.agro.hero.headline'),
      subheadline: t('case.agro.hero.subheadline'),
    },
  } as const
  
  // Сброс скролла при загрузке страницы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])
  
  const markdownContentBeforeProcess = language === 'en'
    ? `## Overview

Platform for agricultural management that allows managing fields, monitoring crop conditions, planning work, and analyzing yields. Uses AI, satellite data, meteorological information, and telemetry to make informed decisions in agricultural operations.

## Problem

- Farmers did not have a unified tool for farm management and crop monitoring.

- Data on field conditions and yields were fragmented.

- There was no convenient visualization of agricultural data and analytics.

- There were no tools for planning and yield forecasting.

## Goals

- Create a unified platform for farm management.

- Provide real-time crop and field condition monitoring.

- Provide analytics and forecasting for decision-making.

- Simplify planning and agricultural operations management processes.`
    : `## Обзор

Платформа для управления сельским хозяйством, которая позволяет управлять полями, мониторить состояние культур, планировать работы и анализировать урожайность. Использует AI, спутниковые данные, метеорологическую информацию и телеметрию для принятия обоснованных решений в сельскохозяйственных операциях.

## Проблема

- Фермеры не имели единого инструмента для управления хозяйством и мониторинга культур.  

- Данные о состоянии полей и урожайности были разрознены.  

- Отсутствовала удобная визуализация сельскохозяйственных данных и аналитики.  

- Не было инструментов для планирования и прогнозирования урожайности.

## Цели

- Создать единую платформу для управления фермерским хозяйством.  

- Обеспечить мониторинг культур и состояния полей в реальном времени.  

- Предоставить аналитику и прогнозирование для принятия решений.  

- Упростить процессы планирования и управления сельскохозяйственными операциями.`

  const markdownContentResults = language === 'en'
    ? `## Results

- Farmers received a unified platform for farm management.

- Visibility of field and crop conditions improved.

- Analytics and forecasting capabilities appeared for decision-making.

- The interface became intuitive and convenient for work in field conditions.`
    : `## Результаты

- Фермеры получили единую платформу для управления хозяйством.  

- Улучшилась видимость состояния полей и культур.  

- Появилась возможность аналитики и прогнозирования для принятия решений.  

- Интерфейс стал интуитивным и удобным для работы в полевых условиях.`

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen">
        <Header showLogo={true} />
      {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          {/* Subtle radial gradient background glow */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 45% at 50% 65%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)',
            }}
          />
        
        {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6">
          <div className="w-full max-w-5xl mx-auto">
              {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center max-w-4xl mx-auto mb-6 sm:mb-8"
              >
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                  {fixTypography(HERO_CONFIG.content.headline)}
                      </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {fixTypography(HERO_CONFIG.content.subheadline)}
                </p>
                    </motion.div>
              
              {/* Dashboard Mockup Image */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-5xl mx-auto flex items-start justify-center cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setZoomedImage({ src: HERO_CONFIG.image.src, alt: HERO_CONFIG.image.alt })}
              >
                <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                      <Image
                    src={HERO_CONFIG.image.src}
                    alt={HERO_CONFIG.image.alt}
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
                          target.src = '/projects/project-3.svg'
                          target.style.opacity = '0.5'
                        }}
                      />
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
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-lg text-gray-400 leading-relaxed mb-6"
                    >
                      {children}
                    </motion.p>
                  )
                },
              ul: ({node, ...props}) => (
                <ul
                    className="list-none text-gray-400 mb-8 space-y-0.5"
                  {...props}
                />
              ),
              li: ({node, ...props}) => (
                <li className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3">
                    <span className="text-gray-500" aria-hidden>◆</span>
                  <span>{props.children}</span>
                </li>
              ),
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-700 pl-6 italic text-gray-300 my-8 bg-gray-900/50 py-4 rounded-r-lg" {...props} />
              ),
            }}
          >
              {markdownContentBeforeProcess}
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

          {/* Team & Role Section */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <div className="bg-gray-900/30 rounded-xl p-8 md:p-10 border border-gray-800/50">
              {/* My Role */}
              <div className="mb-10 pb-10 border-b border-gray-800/50">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl font-semibold text-gray-50 mb-6"
                >
                  {t('case.sections.myRole')}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-400 leading-relaxed"
                >
                  {language === 'en' 
                    ? 'The only product designer on the team. Responsible for user research, information architecture, interface design, design system, and validation of solutions with users.'
                    : 'Единственный продуктовый дизайнер в команде. Отвечал за пользовательское исследование, информационную архитектуру, дизайн интерфейсов, дизайн-систему и валидацию решений с пользователями.'}
                </motion.p>
              </div>

              {/* Team */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl font-semibold text-gray-50 mb-6"
                >
                  {t('case.sections.teamComposition')}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { role: 'case.agro.team.agronomistConsultant', count: 1 },
                    { role: 'case.agro.team.gisAnalyst', count: 2 },
                    { role: 'case.agro.team.mlDeveloper', count: 1 },
                    { role: 'case.agro.team.projectManager', count: 1 },
                    { role: 'case.agro.team.productManager', count: 1 },
                    { role: 'case.agro.team.tester', count: 1 },
                    { role: 'case.agro.team.frontendDeveloper', count: 2 },
                    { role: 'case.agro.team.backendDeveloper', count: 2 },
                    { role: 'case.agro.team.devops', count: 1 },
                    { role: 'case.agro.team.systemArchitect', count: 1 },
                  ].map((item, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                      className="inline-flex items-center px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700/30 text-sm text-gray-300 hover:border-gray-600/50 transition-colors"
                    >
                      {t(item.role as TranslationKey)}{item.count > 1 && ` (${item.count})`}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Roles Section */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                {t('case.sections.roles')}
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mb-8">
                {language === 'en' 
                  ? 'The platform is designed for various roles in agricultural enterprises, each solving their tasks and getting expected results.'
                  : 'Платформа предназначена для различных ролей в агропредприятии, каждая из которых решает свои задачи и получает ожидаемые результаты.'}
              </p>
            </Stagger>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'case.agro.roles.farmer.role',
                  tasks: 'case.agro.roles.farmer.tasks',
                  results: 'case.agro.roles.farmer.results'
                },
                {
                  role: 'case.agro.roles.agronomist.role',
                  tasks: 'case.agro.roles.agronomist.tasks',
                  results: 'case.agro.roles.agronomist.results'
                },
                {
                  role: 'case.agro.roles.manager.role',
                  tasks: 'case.agro.roles.manager.tasks',
                  results: 'case.agro.roles.manager.results'
                },
                {
                  role: 'case.agro.roles.fieldWorker.role',
                  tasks: 'case.agro.roles.fieldWorker.tasks',
                  results: 'case.agro.roles.fieldWorker.results'
                },
                {
                  role: 'case.agro.roles.economist.role',
                  tasks: 'case.agro.roles.economist.tasks',
                  results: 'case.agro.roles.economist.results'
                },
                {
                  role: 'case.agro.roles.analyst.role',
                  tasks: 'case.agro.roles.analyst.tasks',
                  results: 'case.agro.roles.analyst.results'
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

          {/* Results */}
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
                ul: ({node, ...props}) => (
                  <ul className="list-none text-gray-400 mb-8 space-y-0.5" {...props} />
                ),
                li: ({node, ...props}) => (
                  <li className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3">
                    <span className="text-gray-500" aria-hidden>◆</span>
                    <span>{props.children}</span>
                  </li>
                ),
              }}
            >
              {markdownContentResults}
            </ReactMarkdown>
          </AnimatedSection>

          {/* Solution Section with Images */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                {functionsData.title}
              </h2>
            </Stagger>
            
            <div className="space-y-32">
            {/* Fields Management */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  {functionsData.sections[0].title}
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {language === 'ru' ? fixTypography(functionsData.sections[0].description) : functionsData.sections[0].description}
                    </p>
                  </Stagger>
                  <div className="space-y-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management.png', alt: functionsData.sections[0].title })}
                    >
                      <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                        <Image
                  src="/cases/agro-platform/images/fields-management.png"
                  alt={functionsData.sections[0].title}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          priority
                          quality={90}
                        />
                      </div>
                    </motion.div>
                    <div>
                      <p className="text-lg text-gray-400 max-w-3xl mb-6">
                        {language === 'ru' ? fixTypography(functionsData.sections[0].details![0]) : functionsData.sections[0].details![0]}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3, once: false }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management2.png', alt: 'Детальный анализ индексов поля' })}
                      >
                        <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                          <Image
                            src="/cases/agro-platform/images/fields-management2.png"
                            alt="Детальный анализ индексов поля"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain"
                            quality={85}
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-lg text-gray-400 max-w-3xl mb-6">
                        {language === 'ru' ? fixTypography(functionsData.sections[0].details![1]) : functionsData.sections[0].details![1]}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3, once: false }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management3.png', alt: 'Метеорологические данные и слои карты' })}
                      >
                        <div className="relative w-full border border-gray-700/50 rounded-lg overflow-hidden">
                          <Image
                            src="/cases/agro-platform/images/fields-management3.png"
                            alt="Метеорологические данные и слои карты"
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
            </div>
              </AnimatedSection>

            {/* Crop Monitoring */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  {functionsData.sections[1].title}
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {language === 'ru' ? fixTypography(functionsData.sections[1].description) : functionsData.sections[1].description}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/crop-monitoring.png', alt: functionsData.sections[1].title })}
                  >
                    <div className="relative w-full">
                      <Image
                  src="/cases/agro-platform/images/crop-monitoring.png"
                  alt={functionsData.sections[1].title}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain rounded-lg"
                        unoptimized
                        priority
                />
              </div>
                  </motion.div>
            </div>
              </AnimatedSection>

            {/* Технологические карты */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  {functionsData.sections[2].title}
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                  {language === 'ru' ? fixTypography(functionsData.sections[2].description) : functionsData.sections[2].description}
                </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/gantt.png', alt: functionsData.sections[2].title })}
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/gantt.png"
                        alt="Диаграмма Ганта"
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain rounded-lg"
                        unoptimized
                        priority
                />
              </div>
                  </motion.div>
            </div>
              </AnimatedSection>

              {/* Planning Calendar */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      {functionsData.sections[3].title}
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {language === 'ru' ? fixTypography(functionsData.sections[3].description) : functionsData.sections[3].description}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/planning-calendar.png', alt: functionsData.sections[3].title })}
                  >
                    <div className="relative w-full">
                      <Image
                  src="/cases/agro-platform/images/planning-calendar.png"
                        alt={functionsData.sections[3].title}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain rounded-lg"
                        unoptimized
                        priority
                />
              </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* AI Assistant */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      {functionsData.sections[4].title}
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {language === 'ru' ? fixTypography(functionsData.sections[4].description) : functionsData.sections[4].description}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/ai.png', alt: functionsData.sections[4].title })}
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/ai.png"
                        alt={functionsData.sections[4].title}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain rounded-lg"
                        unoptimized
                        priority
                      />
                    </div>
                  </motion.div>
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
                  
                  <motion.a
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 w-full sm:w-auto min-w-[200px] sm:min-w-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="whitespace-nowrap">{t('case.cta.viewOtherProjects')}</span>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
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
