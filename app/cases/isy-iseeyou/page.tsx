'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import CaseImage from '@/components/CaseImage'

export default function ISYCasePage() {
  const markdownContent = `## Обзор

ISY — корпоративная платформа для мониторинга безопасности и комплаенса.  

Проект — создание дашбордов для C-level: единое окно метрик, рисков и статусов процессов.

**Роль:** Product / UI/UX Designer  

**Формат работы:** аналитика → архитектура → прототипы → UI → итоговый дизайн

## Проблема

- Метрики были разрознены, отчёты собирались вручную.  

- Руководство не имело единого источника правды.  

- Комплаенс-подразделение тратили много времени на поиск отклонений.  

- Не было удобной визуализации: трендов, рисков, глубокой аналитики.

## Цели

- Создать единый executive-дашборд для топ-менеджмента.  

- Снизить время анализа отчётов.  

- Сделать визуально понятные KPI и risk-метрики.  

- Обеспечить drill-down: от общей картины → к деталям.

## Процесс

### 01. Исследование и анализ

- Изучил источники данных и систему метрик.  

- Сегментировал целевую аудиторию: C-level, комплаенс, security-team.  

- Определил ключевые сценарии использования: weekly review, risk overview, operational monitoring.

### 02. Информационная архитектура

- Построил структуру дашбордов: KPI → Risks → Trends → Details.  

- Спроектировал логику фильтров и уровни вложенности.  

- Определил визуальный язык для уровней риска.

### 03. UX-каркасы и прототипирование

Создал варианты группировки метрик:  

- карточки KPI;  

- risk-heat-map;  

- тренды и графики;  

- таблицы для детального анализа.

### 04. UI-дизайн

- Стиль: строгий, корпоративный, читаемый.  

- Компоненты: карточки, диаграммы, таблицы, статусы.  

- Дизайн-системный набор блоков для аналитики.

## Результаты

- Руководство получило "единое окно" для еженедельных встреч.  

- Сократилось время анализа данных (в разы — если есть цифры, можно добавить).  

- Комплаенс стал быстрее находить отклонения.  

- Интерфейс стал визуально стандартизированным и понятным для non-tech пользователей.

## Выводы

- Как показывать сложные метрики простым языком.  

- Как строить информационную архитектуру для enterprise-дашбордов.  

- Как балансировать: много данных ≠ перегруженный интерфейс.  

- Как дизайн-система ускоряет работу над аналитикой.

## Артефакты

Можно добавить:  

- mind-map структуры дашборда;  

- варианты концептов;  

- сравнение "каркас → финальный UI".`

  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-85" />
          
          {/* Hero image with fallback */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-image.png"
              alt="ISY IseeYou Dashboard on laptop"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              loading="lazy"
              decoding="async"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                // Fallback to SVG if PNG fails
                const target = e.currentTarget
                target.src = '/cases/isy-iseeyou/images/hero.svg'
                target.style.opacity = '0.25'
              }}
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gray-400 mb-4 text-lg md:text-xl">Корпоративная платформа мониторинга и аналитики</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 text-gray-50">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                ISY IseeYou
              </span>
              <br />
              <span className="text-gray-400 text-4xl md:text-5xl lg:text-6xl">C-Level & Compliance Dashboards</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Executive-дашборды для единого представления метрик, рисков и статусов процессов
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-24"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors mb-16"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к портфолио
        </Link>

        <article className="prose prose-invert prose-lg max-w-none mb-24">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => <h2 className="text-3xl font-semibold text-gray-50 mb-6 mt-16 first:mt-0" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-semibold text-gray-50 mb-4 mt-12" {...props} />,
              p: ({node, ...props}) => <p className="text-lg text-gray-400 leading-relaxed mb-6" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside text-gray-400 mb-6 space-y-3 ml-6" {...props} />,
              li: ({node, ...props}) => <li className="text-lg leading-relaxed text-gray-400" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-200" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-700 pl-6 italic text-gray-300 my-6" {...props} />,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>

        {/* Solution Section with Images */}
        <section className="mb-24">
          <h2 className="text-3xl font-semibold text-gray-50 mb-12">Решение</h2>
          
          <div className="space-y-24">
            {/* Executive Dashboard */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-4">Executive Dashboard</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Главный экран для руководителей: ключевые метрики, статус процессов и риски.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/isy-iseeyou/images/isy-exec-dashboard.png"
                  alt="Executive Dashboard"
                  className="object-cover"
                  fallbackSrc="/cases/isy-iseeyou/images/isy-exec-dashboard.svg"
                />
              </div>
            </div>

            {/* KPI & Status Cards */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-4">KPI & Status Cards</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Быстрый просмотр состояния компании "в один взгляд".
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/isy-iseeyou/images/isy-kpi-cards.png"
                  alt="KPI & Status Cards"
                  className="object-cover"
                  fallbackSrc="/cases/isy-iseeyou/images/isy-kpi-cards.svg"
                />
              </div>
            </div>

            {/* Risk Overview & Heat-Map */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-4">Risk Overview & Heat-Map</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Карта рисков по направлениям / департаментам.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/isy-iseeyou/images/isy-risk-map.png"
                  alt="Risk Overview & Heat-Map"
                  className="object-cover"
                  fallbackSrc="/cases/isy-iseeyou/images/isy-risk-map.svg"
                />
              </div>
            </div>

            {/* Trends & Analytics */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-4">Trends & Analytics</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Графики изменений, паттерны, аномалии.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/isy-iseeyou/images/isy-trends.png"
                  alt="Trends & Analytics"
                  className="object-cover"
                  fallbackSrc="/cases/isy-iseeyou/images/isy-trends.svg"
                />
              </div>
            </div>

            {/* Drill-Down Screens */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-4">Drill-Down Screens</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Детализация метрик: от общей картины → к конкретным событиям или департаментам.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/isy-iseeyou/images/isy-drilldown.png"
                  alt="Drill-Down Screens"
                  className="object-cover"
                  fallbackSrc="/cases/isy-iseeyou/images/isy-drilldown.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}
