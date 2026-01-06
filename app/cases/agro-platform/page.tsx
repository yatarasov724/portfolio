'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Header from '@/components/Header'
import CaseImage from '@/components/CaseImage'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import AnimatedSection from '@/components/animations/AnimatedSection'
import Stagger from '@/components/animations/Stagger'

export default function AgroPlatformCasePage() {
  
  const markdownContent = `## Обзор

Проект — создание агроплатформы для управления фермерским хозяйством, мониторинга культур и сельскохозяйственной аналитики.

**Роль:** Product / UI/UX Designer  

**Формат работы:** аналитика → архитектура → прототипы → UI → итоговый дизайн

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
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Gradient Background with Grid Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Background - от светло-оранжевого к фиолетовому, адаптированный для агро тематики */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 237, 213, 0.15) 0%, rgba(255, 218, 185, 0.12) 20%, rgba(255, 200, 160, 0.10) 40%, rgba(200, 180, 255, 0.12) 60%, rgba(180, 200, 255, 0.15) 80%, rgba(160, 220, 255, 0.18) 100%)'
            }}
          />
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Dark overlay to maintain readability */}
          <div className="absolute inset-0 bg-gray-950/40" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 md:pt-24 pb-8 px-6">
          <div className="w-full max-w-5xl mx-auto">
            {/* Card with Text and Image */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="relative w-full overflow-visible"
            >
              {/* Card Container - карточка с рамкой без фона */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
                <div className="relative w-full min-h-[450px] md:min-h-[500px] flex flex-col">
                  {/* Text Content Inside Card - в верхней части */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-5 md:pt-6 pb-2 md:pb-3 bg-gradient-to-b from-gray-950/90 via-gray-950/60 to-transparent">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      className="text-center max-w-4xl mx-auto"
                    >
                      {/* Main Headline */}
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                        AI-powered agricultural enterprise<br />
                        management platform
                      </h1>
                      
                      {/* Sub-headline */}
                      <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Agro-platform for farm management, crop monitoring, and agricultural analytics
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Dashboard Mockup Image - видно больше изображения, крупнее */}
                  <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 w-full" style={{ height: '125%' }}>
                      <Image
                        src="/cases/agro-platform/images/agro-platform-hero.png?v=2"
                        alt="Agro Platform Dashboard"
                        unoptimized
                        fill
                        priority
                        quality={100}
                        className="object-cover object-top"
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
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Scroll Indicator - ниже карточки */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative mt-8 flex justify-center"
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
        <article className="prose prose-invert prose-lg max-w-none mb-24">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => (
                <h2
                  className="text-3xl md:text-4xl font-bold text-gray-50 mb-8 mt-20 first:mt-0"
                  {...props}
                >
                  {props.children}
                </h2>
              ),
              h3: ({node, ...props}) => (
                <h3
                  className="text-2xl font-semibold text-gray-50 mb-6 mt-16"
                  {...props}
                >
                  {props.children}
                </h3>
              ),
              p: ({node, ...props}) => (
                <p
                  className="text-lg text-gray-400 leading-relaxed mb-6"
                  {...props}
                />
              ),
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
        </article>

        {/* Solution Section with Images */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-16">
            Решение
          </h2>
          
          <div className="space-y-32">
            {/* Dashboard Overview */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Dashboard Overview
                </h3>
                <p className="text-lg text-gray-400 italic max-w-3xl">
                  Главный экран платформы: обзор состояния хозяйства, ключевые метрики и быстрый доступ к функциям.
                </p>
              </div>
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/agro-platform/images/dashboard-overview.png"
                  alt="Dashboard Overview"
                  className="object-cover"
                  fallbackSrc="/cases/agro-platform/images/dashboard-overview.svg"
                />
              </div>
            </div>

            {/* Fields Management */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Fields Management
                </h3>
                <p className="text-lg text-gray-400 italic max-w-3xl">
                  Управление полями: карточки полей с информацией о культурах, состоянии и истории работ.
                </p>
              </div>
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/agro-platform/images/fields-management.png"
                  alt="Fields Management"
                  className="object-cover"
                  fallbackSrc="/cases/agro-platform/images/fields-management.svg"
                />
              </div>
            </div>

            {/* Crop Monitoring */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Crop Monitoring
                </h3>
                <p className="text-lg text-gray-400 italic max-w-3xl">
                  Мониторинг культур: визуализация состояния посевов, прогнозы развития и рекомендации.
                </p>
              </div>
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/agro-platform/images/crop-monitoring.png"
                  alt="Crop Monitoring"
                  className="object-cover"
                  fallbackSrc="/cases/agro-platform/images/crop-monitoring.svg"
                />
              </div>
            </div>

            {/* Analytics & Reports */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Analytics & Reports
                </h3>
                <p className="text-lg text-gray-400 italic max-w-3xl">
                  Аналитика и отчёты: графики урожайности, анализ эффективности и прогнозирование.
                </p>
              </div>
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/agro-platform/images/analytics-reports.png"
                  alt="Analytics & Reports"
                  className="object-cover"
                  fallbackSrc="/cases/agro-platform/images/analytics-reports.svg"
                />
              </div>
            </div>

            {/* Planning & Calendar */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Planning & Calendar
                </h3>
                <p className="text-lg text-gray-400 italic max-w-3xl">
                  Планирование работ: календарь сельскохозяйственных операций и управление задачами.
                </p>
              </div>
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/agro-platform/images/planning-calendar.png"
                  alt="Planning & Calendar"
                  className="object-cover"
                  fallbackSrc="/cases/agro-platform/images/planning-calendar.svg"
                />
              </div>
            </div>
          </div>
        </section>

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
