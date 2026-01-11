'use client'

import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Header from '@/components/Header'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'
import Timeline from '@/components/Timeline'

// Константы для hero section
const HERO_CONFIG = {
  image: {
    src: '/cases/isy-iseeyou/images/laptop-dashboard.png',
    alt: 'Дашборд для топ-менеджмента',
    height: '125%' as const,
  },
  content: {
    headline: 'Дашборд для топ-менеджмента',
    subheadline: 'Автоматизированный дашборд для быстрого сбора статистики по инфраструктуре. Заменил ручную выгрузку в Excel и построение графиков на автоматическую визуализацию в реальном времени.',
  },
} as const

export default function ISYCasePage() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  
  const markdownContentBeforeProblem = `## Обзор

Автоматизированный дашборд для быстрого сбора статистики по всей инфраструктуре. Единое окно метрик, рисков и статусов процессов для C-level, комплаенса и сотрудников информационной безопасности. Дашборд помогает выявлять аномалии, отслеживать отклонения и принимать оперативные решения. Заменил ручной процесс выгрузки данных в Excel и построения графиков на автоматизированную визуализацию в реальном времени.`

  const markdownContentProblem = `## Проблема

- Статистика по инфраструктуре собиралась вручную: данные выгружались в Excel, графики и отчёты строились вручную, что занимало часы работы.  

- Метрики были разрознены, не было единого источника правды.  

- Руководство и комплаенс-подразделение тратили много времени на поиск данных и построение отчётов.  

- Не было автоматизированной визуализации: трендов, рисков, глубокой аналитики в реальном времени.`

  const markdownContentGoals = `## Цели

- Создать автоматизированный дашборд для сбора статистики по всей инфраструктуре в реальном времени.  

- Заменить ручной процесс выгрузки в Excel и построения графиков на автоматизированный.  

- Снизить время генерации отчётов с часов до минут.  

- Сделать визуально понятные risk-метрики с детальной навигацией: от общей картины → к деталям.`

  const markdownContentResults = `## Результаты

- Автоматизирован сбор статистики по всей инфраструктуре: дашборд заменяет ручную выгрузку в Excel и построение графиков.  

- Руководство получило "единое окно" для быстрого доступа к статистике инфраструктуры в реальном времени.  

- Комплаенс и сотрудники ИБ стали быстрее находить отклонения и аномалии благодаря автоматизированной визуализации и детальной навигации от общей картины к конкретным данным.  

- Интерфейс стал визуально стандартизированным и понятным для non-tech пользователей, что упростило работу с данными.`

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
                      target.src = '/cases/isy-iseeyou/images/isy-exec-dashboard.svg'
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
            {markdownContentProblem}
          </ReactMarkdown>
          
          {/* Before Image Section - после Проблемы, перед Целями */}
          <AnimatedSection className="my-12" amount={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Старый процесс
                </span>
              </div>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950">
                <Image
                  src="/cases/isy-iseeyou/images/OLD ISY.png"
                  alt="Старый процесс: ручная выгрузка в Excel"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Ручная выгрузка данных в Excel, построение графиков вручную
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
            {markdownContentGoals}
          </ReactMarkdown>
          </AnimatedSection>
          
          {/* Process Section with Vertical Timeline */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-8 mt-12 first:mt-0">
                Процесс
              </h2>
            </Stagger>
            
            {/* Card wrapper for process timeline */}
            <div className="bg-gray-900/30 rounded-xl p-8 md:p-10 border border-gray-800/50">
              {/* Vertical Timeline with Details */}
              <div className="relative">
              {/* Vertical line - goes through all 3 blocks */}
              <motion.div
                className="absolute left-[calc(1.5rem-1px)] md:left-[calc(2rem-1px)] top-2 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              <div className="space-y-12 md:space-y-16">
                {/* Step 1: Исследование и анализ */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-900 shadow-lg z-10">
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/30 blur-md" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4">
                      01. Исследование и анализ
                    </h3>
                    <ul className="list-none text-gray-400 space-y-2">
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Изучил текущий процесс сбора статистики: ручная выгрузка в Excel, построение графиков вручную, время генерации отчётов — несколько часов.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Проанализировал источники данных инфраструктуры и систему метрик, которые нужно автоматизировать.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Сегментировал целевую аудиторию: C-level, комплаенс, security-team.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Определил ключевые сценарии использования: быстрый доступ к статистике инфраструктуры, weekly review, risk overview, operational monitoring.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Step 2: Информационная архитектура */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-gray-900 shadow-lg z-10">
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-purple-500/30 blur-md" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4">
                      02. Информационная архитектура
                    </h3>
                    <ul className="list-none text-gray-400 space-y-2">
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Построил структуру от общего к частному: начиная с главных общих сущностей, заканчивая детализированными авточеками по каждому сервису.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Спроектировал логику автоматического сбора данных и визуализации, заменившую ручной процесс в Excel.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Спроектировал фильтры и уровни вложенности для детальной навигации от общего к частному.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Определил визуальный язык для уровней риска и статусов инфраструктуры.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Step 3: UI-дизайн */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-[calc(1.5rem-8px)] md:left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-red-500 border-2 border-gray-900 shadow-lg z-10">
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-500/30 blur-md" />
            </div>

                  {/* Content */}
            <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-50 mb-4">
                      03. UI-дизайн
                    </h3>
                    <ul className="list-none text-gray-400 space-y-2">
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Изначально сервис разрабатывался на Angular, но в связи с требованиями руководства стояла задача перейти на единую B2B дизайн-систему на React.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Переиспользовал виджеты и компоненты, которые были реализованы в другом продукте компании, адаптировав их под специфику дашборда инфраструктуры.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Вместе с командой дизайн-системы адаптировал существующие компоненты под наш сервис: автоматизированные карточки статистики, диаграммы, таблицы, статусы инфраструктуры.</span>
                      </li>
                      <li className="text-lg leading-relaxed flex items-baseline gap-3">
                        <span className="text-gray-500">•</span>
                        <span>Стиль: строгий, корпоративный, читаемый, ориентированный на данные. Единообразие с другими B2B продуктами компании обеспечило быструю адаптацию пользователей.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              </div>
            </div>

            {/* Results Section */}
            <AnimatedSection className="mt-16 mb-24" amount={0.1}>
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
                }}
              >
                {markdownContentResults}
              </ReactMarkdown>
            </AnimatedSection>
          </AnimatedSection>

          {/* Roles Section */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                Роли пользователей
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mb-8">
                Дашборд предназначен для различных ролей в организации, каждая из которых решает свои задачи и получает ожидаемые результаты.
              </p>
            </Stagger>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'Администратор хостов',
                  tasks: 'Обнаруживать и устранять нарушения ИБ-чеков на своих серверах',
                  results: 'Быстро видеть проблему и эффективно её устранять'
                },
                {
                  role: 'Специалист по ИБ',
                  tasks: 'Контролировать выполнение требований ИБ и анализировать динамику нарушений',
                  results: 'Иметь актуальные отчеты и минимизировать количество нарушений'
                },
                {
                  role: 'Руководитель подразделения',
                  tasks: 'Следить за общим уровнем ИБ-состояния в подразделении',
                  results: 'Понимать риски и вовремя устранять их в своей зоне ответственности'
                },
                {
                  role: 'ИТ-оператор / Инженер сопровождения',
                  tasks: 'Быстро устранять критические нарушения ИБ на продакшн-серверах',
                  results: 'Получать уведомления и инструкции для оперативного реагирования'
                },
                {
                  role: 'Аудитор',
                  tasks: 'Проводить проверки соответствия и документировать результаты',
                  results: 'Легко формировать отчеты о проверках для аудиторской документации'
                },
                {
                  role: 'Разработчик',
                  tasks: 'Проверять соответствие серверов ИБ-требованиям до вывода продукта',
                  results: 'Минимизировать риски отклонений при релизах'
                },
                {
                  role: 'CISO / Директор по безопасности',
                  tasks: 'Следить за общей картиной ИБ-состояния в компании и приоритизировать риски',
                  results: 'Иметь агрегированные метрики для защиты бизнеса от ИБ-угроз'
                },
                {
                  role: 'Процессный менеджер ИБ',
                  tasks: 'Анализировать тренды по соблюдению требований ИБ в подразделениях',
                  results: 'Иметь данные для анализа эффективности процессов ИБ'
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

          {/* Solution Section with Images */}
          <AnimatedSection className="mb-24" amount={0.1}>
            <Stagger staggerDelay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4 mt-12 first:mt-0">
                Обзор функций
              </h2>
            </Stagger>
            
            <div className="space-y-32">
              {/* Executive Dashboard */}
              <AnimatedSection amount={0.1}>
                <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Дашборд для топ-менеджмента
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl mb-6">
                      Главный экран для C-level и комплаенса: автоматизированный сбор статистики по всей инфраструктуре в реальном времени. Единое окно метрик, рисков и статусов процессов, заменяющее ручной процесс выгрузки в Excel.
                    </p>
                  </Stagger>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full">
                        <Image
                          src="/cases/isy-iseeyou/images/laptop-dashboard.png"
                          alt="Дашборд для топ-менеджмента"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-lg"
                          unoptimized
                          priority
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full">
                        <Image
                          src="/cases/isy-iseeyou/images/laptop-dashboard-2.png"
                          alt="Дашборд для топ-менеджмента"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-lg"
                          unoptimized
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
                      Карточка сервиса
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl mb-6">
                      Переработанный интерфейс карточки сервиса с улучшенной навигацией и структурой информации. Вертикальная боковая панель заменила горизонтальные вкладки, что упростило навигацию и сделало интерфейс более современным и читаемым.
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
                        src="/cases/isy-iseeyou/images/service_card.png"
                        alt="Карточка сервиса"
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

              {/* Requirement Card */}
              <AnimatedSection amount={0.1}>
            <div>
                  <Stagger className="mb-6" staggerDelay={0.08}>
                    <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                      Карточка требования
                    </h3>
                    <p className="text-lg text-gray-400 max-w-3xl">
                      Карточка требования содержит информацию по всем авточекам, которые входят в это требование ИБ. Позволяет видеть детальную информацию о каждом авточеке, его статусе и результатах проверки в едином месте.
                    </p>
                  </Stagger>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full">
                        <Image
                          src="/cases/isy-iseeyou/images/autocheck_card.png"
                          alt="Карточка требования"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-lg"
                          unoptimized
                          priority
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3, once: false }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative w-full rounded-lg overflow-hidden"
                    >
                      <div className="relative w-full">
                        <Image
                          src="/cases/isy-iseeyou/images/autocheck_card_details.png"
                          alt="Детали карточки требования"
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-lg"
                          unoptimized
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
                      Дополнительные экраны и функции
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
                        Состояние: все в порядке
                      </h4>
                      <div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setZoomedImage('/cases/isy-iseeyou/images/success.png')}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/success.png"
                          alt="Состояние: все в порядке"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
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
                        Интерактивные подсказки
                      </h4>
                      <div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setZoomedImage('/cases/isy-iseeyou/images/tooltips.png')}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/tooltips.png"
                          alt="Интерактивные подсказки"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
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
                        Глобальная фильтрация
                      </h4>
                      <div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setZoomedImage('/cases/isy-iseeyou/images/global_filter.png')}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/global_filter.png"
                          alt="Глобальная фильтрация"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
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
                        Настройки таблицы
                      </h4>
                      <div 
                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-950 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setZoomedImage('/cases/isy-iseeyou/images/table_filter.png')}
                      >
                        <Image
                          src="/cases/isy-iseeyou/images/table_filter.png"
                          alt="Настройки таблицы"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </motion.div>
                  </div>
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
                Есть вопросы по проекту?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-400 mb-8"
              >
                Давайте обсудим детали или посмотрите другие проекты
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
                  <span>Написать в Telegram</span>
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
                  <span>Посмотреть другие проекты</span>
                </motion.a>
              </motion.div>
            </div>
          </AnimatedSection>
          </div>
    </main>

    {/* Image Zoom Modal */}
    <AnimatePresence>
      {zoomedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Закрыть"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={zoomedImage}
                alt="Увеличенное изображение"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </SmoothScrollProvider>
  )
}
