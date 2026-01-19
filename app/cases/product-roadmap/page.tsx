'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'

// Динамический импорт ReactMarkdown для code splitting
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: true })
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
    alt: 'Дашборд Product Roadmap',
    height: '125%' as const,
  },
  content: {
    headline: 'Product Roadmap',
    subheadline: 'Инструмент для согласования релизов и планирования сервисов на год. Единый инструмент для упрощения координации между командами, избежания конфликтов в карточках релизов и повышения прозрачности процессов.',
  },
} as const

export default function ProductRoadmapCasePage() {
  const markdownContent = `## Обзор

Проект — создание roadmap для согласования релизов и планирования сервисов на год: единый инструмент для упрощения согласования между командами, избежания конфликтов в карточках релизов и повышения прозрачности процессов.

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
                  fill
                  priority
                  quality={95}
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
                <ul className="list-none text-lg text-gray-400 max-w-3xl space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden>◆</span>
                    <span>Отсутствовала возможность переключения между годовыми периодами, что ограничивало планирование на долгосрочную перспективу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden>◆</span>
                    <span>Интерфейс был построен только вокруг сущности релизов, без учёта годового цикла планирования</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden>◆</span>
                    <span>Не существовало годового цикла роадмепа и статусной модели для отслеживания этапов планирования</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden>◆</span>
                    <span>Отсутствовала цветовая легенда, что создавало неоднозначность в интерпретации статусов и приоритетов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden>◆</span>
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
                  priority
                  quality={90}
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
              Обзор функций
            </h2>
          </Stagger>
          
          <div className="space-y-32">
            {/* Roadmap Overview */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    Обзор Roadmap
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
                      alt="Обзор Roadmap"
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

            {/* Product Card */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    Карточка продукта
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
                      alt="Карточка продукта"
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

            {/* History */}
            <AnimatedSection amount={0.1}>
              <div>
                <Stagger className="mb-6" staggerDelay={0.08}>
                  <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                    История изменений
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
                      alt="История изменений"
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
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                    </svg>
                    <span className="whitespace-nowrap">Написать в Telegram</span>
                  </motion.a>
                  
                  <motion.a
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 w-full sm:w-auto min-w-[200px] sm:min-w-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="whitespace-nowrap">Посмотреть другие проекты</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
    </SmoothScrollProvider>
  )
}


