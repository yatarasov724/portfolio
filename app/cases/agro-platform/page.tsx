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

// Динамический импорт ReactMarkdown для code splitting
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: true })
import remarkGfm from 'remark-gfm'

// Константы для hero section
const HERO_CONFIG = {
  image: {
    src: '/cases/agro-platform/images/agro-hero-section.png',
    alt: 'Платформа для управления сельским хозяйством',
    height: '125%' as const,
  },
  content: {
    headline: 'Агроплатформа на базе AI для управления агропредприятием',
    subheadline: 'Платформа для управления агропредприятием, которая позволяет управлять полями, мониторить состояние культур, планировать работы и анализировать урожайность. Использует AI, спутниковые данные, метеорологическую информацию и телеметрию.',
  },
} as const

export default function AgroPlatformCasePage() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)
  
  // Сброс скролла при загрузке страницы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])
  
  const markdownContentBeforeProcess = `## Обзор

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

  const markdownContentResults = `## Результаты

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
                className="relative w-full max-w-5xl mx-auto flex items-start justify-center cursor-pointer border border-gray-700/50 rounded-lg"
                onClick={() => setZoomedImage({ src: HERO_CONFIG.image.src, alt: HERO_CONFIG.image.alt })}
              >
                <div className="relative w-full">
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
                Процесс
          </h2>
            </Stagger>
            <div className="bg-gray-900/30 rounded-xl p-8 md:p-10 border border-gray-800/50">
              <div className="relative">
                {/* 01. Исследование */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-12 md:pl-16 pb-12 md:pb-16"
                >
                  {/* Vertical line from this point to next */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-[calc(0.5rem+4px)] bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-purple-500/50" />
                  <motion.div
                    className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-900 shadow-lg z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/30 blur-md" />
                  </motion.div>
                  <div className="pt-2">
                      <motion.h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>01. Исследование</motion.h3>
                      <motion.ul className="list-none text-gray-400 space-y-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Сегментировал аудиторию (фермеры, агрономы, управляющие) и зафиксировал их роли, цели и точки боли: разрозненные данные, планирование «в головах», отсутствие единой картины по полям и культурам.')}</span></motion.li>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.5 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Совместно с агрономом провёл интервью и наблюдал за реальными процессами: как принимают решения по севу и обработке, какие данные нужны в поле и в офисе, как работают с погодой и спутниковыми индексами.')}</span></motion.li>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.6 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Сформулировал ключевые сценарии и базовый функционал первой итерации, опираясь на критичные для сезона задачи: мониторинг полей, планирование работ, анализ урожайности.')}</span></motion.li>
                    </motion.ul>
                  </div>
                </motion.div>

                {/* 02. Информационная архитектура */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-12 md:pl-16 pb-12 md:pb-16"
                >
                  {/* Vertical line from previous point to this point */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-0 h-[calc(0.5rem+4px)] w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-purple-500/50" />
                  {/* Vertical line from this point to next */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-[calc(0.5rem+4px)] bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-pink-500/50" />
                  <motion.div
                    className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-gray-900 shadow-lg z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-purple-500/30 blur-md" />
                  </motion.div>
                  <div className="pt-2">
                      <motion.h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>02. Информационная архитектура</motion.h3>
                      <motion.ul className="list-none text-gray-400 space-y-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Выстроил структуру от целей пользователей: обзор хозяйства → поля и культуры → детали по полю (карты, индексы, погода, история) → планирование и аналитика.')}</span></motion.li>
                    </motion.ul>
                  </div>
                </motion.div>

                {/* 03. Анализ и приоритизация */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-12 md:pl-16 pb-12 md:pb-16"
                >
                  {/* Vertical line from previous point to this point */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-0 h-[calc(0.5rem+4px)] w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-pink-500/50" />
                  {/* Vertical line from this point to next */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-[calc(0.5rem+4px)] bottom-0 w-0.5 bg-gradient-to-b from-pink-500/50 via-rose-500/50 to-rose-500/50" />
                  <motion.div
                    className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 border-2 border-gray-900 shadow-lg z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-500/30 blur-md" />
                  </motion.div>
                  <div className="pt-2">
                      <motion.h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>03. Анализ и приоритизация</motion.h3>
                      <motion.ul className="list-none text-gray-400 space-y-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Провёл сравнительный анализ аналогов и решений в AgTech: что уже решают пользователи, какие паттерны привычны, где есть разрывы.')}</span></motion.li>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.5 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Приоритизировал бэклог под первый релиз: зафиксировал объём первой итерации и критерии «готово» для каждого блока.')}</span></motion.li>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.6 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Разложил ключевые сценарии на описания и требования к экранам, чтобы валидация и дизайн опирались на одни и те же допущения.')}</span></motion.li>
                    </motion.ul>
                  </div>
                </motion.div>

                {/* 04. Валидация с пользователями */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-12 md:pl-16 pb-12 md:pb-16"
                >
                  {/* Vertical line from previous point to this point */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-0 h-[calc(0.5rem+4px)] w-0.5 bg-gradient-to-b from-pink-500/50 via-rose-500/50 to-rose-500/50" />
                  {/* Vertical line from this point to next */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-[calc(0.5rem+4px)] bottom-0 w-0.5 bg-gradient-to-b from-rose-500/50 via-red-500/50 to-red-500/50" />
                  <motion.div
                    className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 to-red-500 border-2 border-gray-900 shadow-lg z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-rose-500/30 blur-md" />
                  </motion.div>
                  <div className="pt-2">
                      <motion.h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>04. Валидация с пользователями</motion.h3>
                      <motion.ul className="list-none text-gray-400 space-y-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Собрал обратную связь по эскизам и прототипам: интервью и демо с агрономом и стейкхолдерами, проверка сценариев и терминологии.')}</span></motion.li>
                        <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.5 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Презентовал функционал, зафиксировал правки по приоритетам и UX, встроил обратную связь в следующую итерацию структуры и прототипов.')}</span></motion.li>
                    </motion.ul>
                  </div>
                </motion.div>

                {/* 05. UI и дизайн‑система */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Vertical line from previous point to this point */}
                  <div className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-0 h-[calc(0.5rem+4px)] w-0.5 bg-gradient-to-b from-rose-500/50 via-red-500/50 to-red-500/50" />
                  <motion.div
                    className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-gray-900 shadow-lg z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-500/30 blur-md" />
                  </motion.div>
                  <div className="pt-2">
                    <motion.h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>05. UI и дизайн‑система</motion.h3>
                    <motion.ul className="list-none text-gray-400 space-y-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.3 }}>
                      <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Спроектировал и унифицировал компоненты: карточки полей, карты с индексами и слоями, графики, календари, дашборды — с учётом работы в поле (читаемость, контраст, понятная иерархия).')}</span></motion.li>
                      <motion.li className="text-lg leading-relaxed flex items-baseline gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.5 }}><span className="text-gray-500" aria-hidden>◆</span><span>{fixTypography('Масштабировал UI‑набор в дизайн‑систему платформы, чтобы новые экраны и фичи собирались из единых, переиспользуемых блоков.')}</span></motion.li>
                    </motion.ul>
                  </div>
                </motion.div>
              </div>
            </div>
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
                  Моя роль
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-400 leading-relaxed"
                >
                  Единственный продуктовый дизайнер в команде. Отвечал за пользовательское исследование, информационную архитектуру, дизайн интерфейсов, дизайн-систему и валидацию решений с пользователями.
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
                  Состав команды
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { role: 'Агроном-консультант', count: 1 },
                    { role: 'GIS-аналитик', count: 2 },
                    { role: 'ML-разработчик', count: 1 },
                    { role: 'Project Manager', count: 1 },
                    { role: 'Product Manager', count: 1 },
                    { role: 'Тестировщик', count: 1 },
                    { role: 'Frontend-разработчик', count: 2 },
                    { role: 'Backend-разработчик', count: 2 },
                    { role: 'DevOps', count: 1 },
                    { role: 'Системный архитектор', count: 1 },
                  ].map((item, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                      className="inline-flex items-center px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700/30 text-sm text-gray-300 hover:border-gray-600/50 transition-colors"
                    >
                      {item.role}{item.count > 1 && ` (${item.count})`}
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
                Роли пользователей
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mb-8">
                Платформа предназначена для различных ролей в агропредприятии, каждая из которых решает свои задачи и получает ожидаемые результаты.
              </p>
            </Stagger>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'Фермер / Владелец хозяйства',
                  tasks: 'Принимать стратегические решения по развитию хозяйства, контролировать финансовые показатели и урожайность',
                  results: 'Иметь полную картину состояния хозяйства и принимать обоснованные решения на основе данных'
                },
                {
                  role: 'Агроном',
                  tasks: 'Планировать севооборот, контролировать состояние культур, анализировать спутниковые данные и метеорологию',
                  results: 'Эффективно планировать работы и своевременно реагировать на проблемы с культурами'
                },
                {
                  role: 'Управляющий / Директор хозяйства',
                  tasks: 'Координировать работу подразделений, контролировать выполнение планов и анализировать операционные показатели',
                  results: 'Оптимизировать процессы и повышать эффективность сельскохозяйственных операций'
                },
                {
                  role: 'Полевой работник / Механизатор',
                  tasks: 'Получать задания на полевые работы, фиксировать выполненные операции и отмечать проблемы в поле',
                  results: 'Четко понимать задачи и эффективно выполнять работы согласно плану'
                },
                {
                  role: 'Экономист / Финансовый менеджер',
                  tasks: 'Анализировать затраты на операции, прогнозировать урожайность и рассчитывать рентабельность',
                  results: 'Иметь актуальные финансовые данные для планирования бюджета и оценки эффективности'
                },
                {
                  role: 'Специалист по аналитике',
                  tasks: 'Анализировать исторические данные, выявлять тренды и формировать отчеты для руководства',
                  results: 'Предоставлять аналитические инсайты для принятия стратегических решений'
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
                      {item.role}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Основные задачи
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {item.tasks}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Ожидаемые результаты
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {item.results}
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
                Обзор функций
              </h2>
            </Stagger>
            
            <div className="space-y-32">
            {/* Fields Management */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Управление полями
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {fixTypography('Комплексный анализ состояния полей на основе спутниковых данных. Визуализация вегетационных индексов (NDVI, EVI, NDMI) для оценки здоровья культур и продуктивности. Интерактивная карта с переключением слоев и метеорологическими данными для принятия обоснованных решений.')}
                    </p>
                  </Stagger>
                  <div className="space-y-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden cursor-pointer border border-gray-700/50"
                      onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management.png', alt: 'Управление полями' })}
                    >
                      <div className="relative w-full">
                        <Image
                  src="/cases/agro-platform/images/fields-management.png"
                  alt="Управление полями"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-lg"
                          priority
                          quality={90}
                        />
                      </div>
                    </motion.div>
                    <div>
                      <p className="text-lg text-gray-400 max-w-3xl mb-6">
                        {fixTypography('Детальная информационная панель поля с данными о вегетации, влажности почвы, прогнозе урожайности, культуре и сорте, прогнозом погоды на неделю, окнами для внесения средств защиты растений и картами предписаний.')}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3, once: false }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative w-full rounded-lg overflow-hidden cursor-pointer border border-gray-700/50"
                        onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management2.png', alt: 'Детальный анализ индексов поля' })}
                      >
                        <div className="relative w-full">
                          <Image
                            src="/cases/agro-platform/images/fields-management2.png"
                            alt="Детальный анализ индексов поля"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain rounded-lg"
                            quality={85}
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-lg text-gray-400 max-w-3xl mb-6">
                        {fixTypography('Графики для анализа показателей в динамике времени: индекс вегетации, влажность почвы, эффективные температуры и осадки. Визуализация трендов и изменений для оценки состояния поля и принятия решений.')}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3, once: false }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative w-full rounded-lg overflow-hidden cursor-pointer border border-gray-700/50"
                        onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/fields-management3.png', alt: 'Метеорологические данные и слои карты' })}
                      >
                        <div className="relative w-full">
                          <Image
                            src="/cases/agro-platform/images/fields-management3.png"
                            alt="Метеорологические данные и слои карты"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain rounded-lg"
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
                  Мониторинг культур
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {fixTypography('Планирование севооборота с визуализацией всей картины хозяйства. Агроном видит полную схему чередования культур по каждому полю: культуру, дату сева, дату высева и урожайность за гектар для оптимизации долгосрочной стратегии хозяйства.')}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/crop-monitoring.png', alt: 'Мониторинг культур' })}
                  >
                    <div className="relative w-full">
                      <Image
                  src="/cases/agro-platform/images/crop-monitoring.png"
                  alt="Мониторинг культур"
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
                  Технологические карты
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                  {fixTypography('Визуализация и планирование работ по культуре в виде диаграммы Ганта. Агроном видит временные рамки операций, последовательность обработок, может планировать использование техники и контролировать выполнение работ по каждому полю. Позволяет оптимизировать расписание и избегать конфликтов в использовании ресурсов.')}
                </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/gantt.png', alt: 'Диаграмма Ганта' })}
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

              {/* Телеметрия */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Телеметрия
                </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {fixTypography('Отслеживание добавленной техники в реальном времени и исторически. Просмотр статуса техники, местоположения и данных о работе для контроля и оптимизации использования сельскохозяйственного оборудования.')}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/planning-calendar.png', alt: 'Телеметрия' })}
                  >
                    <div className="relative w-full">
                      <Image
                  src="/cases/agro-platform/images/planning-calendar.png"
                        alt="Телеметрия"
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
                      AI-ассистент
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      {fixTypography('Раздел с AI-ассистентом, который может ответить на любые вопросы по агрономии. Помогает пользователям получать консультации, рекомендации и разъяснения по работе с платформой, состоянию полей, планированию работ и другим аспектам сельскохозяйственной деятельности.')}
                    </p>
                  </Stagger>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ src: '/cases/agro-platform/images/ai.png', alt: 'AI-ассистент' })}
                  >
                    <div className="relative w-full">
                      <Image
                        src="/cases/agro-platform/images/ai.png"
                        alt="AI-ассистент"
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
                  Есть вопросы по проекту?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Давайте обсудим детали проекта или посмотрите другие кейсы из моего портфолио
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
                    <span className="whitespace-nowrap">Написать в Telegram</span>
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
                    <span className="whitespace-nowrap">Посмотреть другие проекты</span>
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
