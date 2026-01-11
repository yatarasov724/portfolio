'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Header from '@/components/Header'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'
import Timeline from '@/components/Timeline'

// Константы для hero section
const HERO_CONFIG = {
  image: {
    src: '/cases/agro-platform/images/agro-platform-hero.png',
    alt: 'Agricultural Enterprise Management Platform',
    height: '125%' as const,
  },
  content: {
    headline: 'AI-powered agricultural enterprise management platform',
    subheadline: 'Agro-platform for farm management, crop monitoring, and agricultural analytics',
  },
} as const

export default function AgroPlatformCasePage() {
  
  const markdownContent = `## Обзор

Проект — создание агроплатформы для управления фермерским хозяйством, мониторинга культур и сельскохозяйственной аналитики.

## Проблема

- Фермеры не имели единого инструмента для управления хозяйством и мониторинга культур.  

- Данные о состоянии полей и урожайности были разрознены.  

- Отсутствовала удобная визуализация сельскохозяйственных данных и аналитики.  

- Не было инструментов для планирования и прогнозирования урожайности.

## Цели

- Создать единую платформу для управления фермерским хозяйством.  

- Обеспечить мониторинг культур и состояния полей в реальном времени.  

- Предоставить аналитику и прогнозирование для принятия решений.  

- Упростить процессы планирования и управления сельскохозяйственными операциями.

## Процесс

### 01. Исследование и анализ

- Изучил потребности фермеров и процессы управления хозяйством.  

- Сегментировал целевую аудиторию: фермеры, агрономы, управляющие хозяйствами.  

- Определил ключевые сценарии использования: мониторинг полей, планирование работ, анализ урожайности.

### 02. Информационная архитектура

- Построил структуру платформы: Dashboard → Fields → Crops → Analytics → Planning.  

- Спроектировал логику отображения данных о полях и культурах.  

- Определил визуальный язык для статусов культур, погодных условий и прогнозов.

### 03. UX-каркасы и прототипирование

Создал варианты представления данных:  

- карточки полей с основной информацией;  

- карты с визуализацией расположения полей;  

- графики и диаграммы для аналитики;  

- календари для планирования работ.

### 04. UI-дизайн

- Стиль: чистый, функциональный, ориентированный на данные.  

- Компоненты: карточки полей, карты, графики, календари, дашборды.  

- Дизайн-системный набор блоков для агроплатформы.

## Результаты

- Фермеры получили единую платформу для управления хозяйством.  

- Улучшилась видимость состояния полей и культур.  

- Появилась возможность аналитики и прогнозирования для принятия решений.  

- Интерфейс стал интуитивным и удобным для работы в полевых условиях.

## Выводы

- Как визуализировать сельскохозяйственные данные и сделать их понятными.  

- Как строить информационную архитектуру для агроплатформы.  

- Как балансировать функциональность и простоту использования.  

- Как дизайн-система ускоряет работу над специализированными платформами.

## Артефакты

Можно добавить:  

- mind-map структуры платформы;  

- варианты концептов дашборда;  

- сравнение "каркас → финальный UI";  

- примеры визуализации данных о полях и культурах.`

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen">
        <Header />
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
          <div className="relative z-10 flex flex-col items-center pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-6 sm:pb-8 md:pb-10 px-6">
            <div className="w-full max-w-5xl mx-auto">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center max-w-4xl mx-auto mb-6 sm:mb-8"
              >
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                  {HERO_CONFIG.content.headline}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {HERO_CONFIG.content.subheadline}
                </p>
              </motion.div>
              
              {/* Dashboard Mockup Image */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-hidden flex items-start justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={HERO_CONFIG.image.src}
                    alt={HERO_CONFIG.image.alt}
                    unoptimized
                    fill
                    priority
                    quality={100}
                    className="object-contain object-top"
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
              
              {/* Scroll Indicator - ниже изображения */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="relative mt-4 sm:mt-5 md:mt-6 flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gray-400 text-2xl"
                >
                  ↓
                </motion.div>
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
                    className="list-none text-gray-400 mb-8 space-y-1"
                    {...props}
                  />
                ),
                li: ({node, ...props}) => (
                  <li className="text-lg leading-relaxed text-gray-400 flex items-baseline gap-3">
                    <span className="text-gray-500">•</span>
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
              {markdownContent}
            </ReactMarkdown>
            
            {/* Timeline for work format */}
            <AnimatedSection className="my-12" amount={0.1}>
              <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-800/50">
                <h3 className="text-lg font-semibold text-gray-300 mb-6 text-center">
                  Формат работы
                </h3>
                <Timeline
                  items={[
                    { title: 'Аналитика и сбор требований' },
                    { title: 'Изучение технических реализаций', subtitle: 'Архитектура' },
                    { title: 'Wireframes' },
                    { title: 'Правки' },
                    { title: 'UI' },
                  ]}
                />
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Solution Section with Images */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                FEATURES OVERVIEW
              </h2>
            </Stagger>
            
            <div className="space-y-32">
              {/* Dashboard Overview */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Dashboard Overview
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl mb-6">
                      Главный экран платформы: обзор состояния хозяйства, ключевые метрики и быстрый доступ к функциям.
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/dashboard-overview.png"
                        alt="Dashboard Overview"
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

              {/* Fields Management */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Fields Management
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      Управление полями: карточки полей с информацией о культурах, состоянии и истории работ.
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/fields-management.png"
                        alt="Fields Management"
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

              {/* Crop Monitoring */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Crop Monitoring
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      Мониторинг культур: визуализация состояния посевов, прогнозы развития и рекомендации.
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/crop-monitoring.png"
                        alt="Crop Monitoring"
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

              {/* Analytics & Reports */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Analytics & Reports
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      Аналитика и отчёты: графики урожайности, анализ эффективности и прогнозирование.
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/analytics-reports.png"
                        alt="Analytics & Reports"
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

              {/* Planning & Calendar */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Planning & Calendar
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      Планирование работ: календарь сельскохозяйственных операций и управление задачами.
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/planning-calendar.png"
                        alt="Planning & Calendar"
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
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-gray-50 mb-4"
            >
              Have questions about this project?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-400 mb-8"
            >
              Let's discuss the details or check out other projects
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <motion.a
                href="https://t.me/yatarasov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                </svg>
                <span>Contact on Telegram</span>
              </motion.a>
              
              <motion.a
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>View other projects</span>
              </motion.a>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
      </main>
    </SmoothScrollProvider>
  )
}
