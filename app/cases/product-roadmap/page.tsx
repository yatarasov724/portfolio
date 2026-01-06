'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import CaseImage from '@/components/CaseImage'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'

// Константы для hero section
const HERO_CONFIG = {
  image: {
    src: '/cases/product-roadmap/images/product-roadmap-hero.png',
    alt: 'Product Roadmap Dashboard',
    height: '125%' as const,
  },
  content: {
    headline: 'Product Roadmap',
    subheadline: 'Roadmap tool for coordinating releases and planning services for the year. A unified instrument to simplify coordination between teams, avoid conflicts in release cards, and increase process transparency.',
  },
} as const

export default function ProductRoadmapCasePage() {
  const markdownContent = `## Обзор

Проект — создание roadmap для согласования релизов и планирования сервисов на год: единый инструмент для упрощения согласования между командами, избежания конфликтов в карточках релизов и повышения прозрачности процессов.

**Роль:** Product / UI/UX Designer  

**Формат работы:** сбор требований → формирование статусной модели → проектирование архитектуры → создание сценариев → визуальная структура → рабочие артефакты

**Коллаборация:** Работал вместе с Release Manager (Head of PM) над формированием статусной модели, сбором требований и проектированием архитектуры.

## Проблема

- Текущий сервис был непрозрачным для продакт-менеджеров: интерфейс был сложным, отсутствовали чёткие регламенты и правила работы.  

- Это приводило к ошибкам, задержкам и разрозненному процессу согласования релизов.  

- У всех участников были разные представления о том, как должен работать сервис.  

- Стейкхолдеры опирались на собственные гипотезы и привычные ярлыки — любой шаг требовал аргументации.  

- Продакт-менеджеры не понимали, что именно нужно делать в интерфейсе, и какие шаги обязательны.

## Цели

- Создать единый инструмент для планирования релизов и сервисов на год.  

- Упростить согласование между командами.  

- Избежать конфликтов в карточках релизов.  

- Повысить прозрачность процессов для всех участников.

## Процесс

### 01. Сбор требований и исследование

- Выявлял требования совместно с Release Manager, уточнял их по ходу работы.  

- Собирал требования с участников процесса: продакт-менеджеров и топ-менеджмента.  

- Изучил текущие проблемы и ограничения существующего сервиса.

### 02. Информационная архитектура

- Проектировал информационную архитектуру и продумывал основные сценарии взаимодействия.  

- Разделил логику работы на два ключевых сценария: для продакт-менеджеров и для топ-менеджмента.  

- Проработал статусную модель roadmap'а и отдельную статусную модель релизов.  

- Учитывал технические ограничения: сервис на Angular, дизайн-система на React — адаптировал решения под существующую архитектуру.

### 03. UX-проектирование и сценарии

- Разделил интерфейс на два сценария: заполнение и поддержание roadmap'а PM-ами, и согласование релизов топ-менеджментом.  

- Создал поток действий для каждой роли.  

- Учитывал, что требования менялись по ходу — строил гибкую архитектуру.

### 04. Визуальная структура и артефакты

- Визуализировал карточку продукта со статусами релизов и возможностью детального просмотра.  

- Отвечал за визуальную структуру, логику интерфейса и подготовку рабочих артефактов.  

- Сформировал требования, которые будут донесены до продакт-менеджеров.

## Результаты

- Готовая структура roadmap'а и правила его использования будут переданы продуктовым командам.  

- Создан единый стандарт поддержания данных.  

- Снижено количество ошибок при планировании релизов.  

- Интерфейс стал понятным для продакт-менеджеров с чёткими регламентами и правилами работы.`

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen">
        <Header />
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
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
                    target.src = '/projects/project-2.svg'
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
        </AnimatedSection>

        {/* Before Section */}
        <AnimatedSection className="mb-24" amount={0.1}>
          <AnimatedSection amount={0.1}>
            <div>
              <Stagger className="mb-6" staggerDelay={0.08}>
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Старый интерфейс
                </h3>
                <ul className="text-lg text-gray-400 max-w-3xl space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Отсутствовала возможность переключения между годовыми периодами, что ограничивало планирование на долгосрочную перспективу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Интерфейс был построен только вокруг сущности релизов, без учёта годового цикла планирования</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Не существовало годового цикла роадмепа и статусной модели для отслеживания этапов планирования</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Отсутствовала цветовая легенда, что создавало неоднозначность в интерпретации статусов и приоритетов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Устаревшая техническая архитектура: сервис не обновлялся более 7 лет, что затрудняло поддержку и развитие</span>
                  </li>
                </ul>
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
                    src="/cases/product-roadmap/images/before.png"
                    alt="Старый интерфейс"
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
        </AnimatedSection>

        {/* Solution Section with Images */}
        <AnimatedSection className="mb-24" amount={0.1}>
          <Stagger staggerDelay={0.1}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
              FEATURES OVERVIEW
            </h2>
          </Stagger>
          
          <div className="space-y-32">
            {/* Roadmap Overview */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    Roadmap Overview
                  </h3>
                  <p className="text-lg text-gray-400 max-w-3xl mb-6">
                    Реализована возможность переключения между годовыми периодами, внедрён годовой цикл роадмепа с чёткой статусной моделью, добавлена цветовая легенда для интуитивного понимания статусов и приоритетов. Главный экран roadmap: временная шкала всех сервисов и релизов.
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
                      src="/cases/product-roadmap/images/roadmap%20main.png"
                      alt="Roadmap Overview"
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

            {/* Product Card */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    Product Card
                  </h3>
                  <p className="text-lg text-gray-400 max-w-3xl">
                    Детальные карточки релизов с информацией о статусе, датах и зависимостях.
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
                      src="/cases/product-roadmap/images/card.png"
                      alt="Product Card"
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

            {/* History */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    History
                  </h3>
                  <p className="text-lg text-gray-400 max-w-3xl">
                    История изменений roadmap с возможностью отслеживания изменений.
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
                      src="/cases/product-roadmap/images/history.png"
                      alt="History"
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
      </div>
    </main>
    </SmoothScrollProvider>
  )
}


