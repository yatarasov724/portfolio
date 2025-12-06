'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import CaseImage from '@/components/CaseImage'

export default function ProductRoadmapCasePage() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Параллакс эффект: opacity уменьшается от 1 до 0 при скролле
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // Параллакс эффект: изображение двигается вверх при скролле
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  // Масштабирование изображения при скролле
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  
  // Интерактивный параллакс при движении мыши
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 50, stiffness: 100 }
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const xPos = (e.clientX - centerX) / rect.width
    const yPos = (e.clientY - centerY) / rect.height
    mouseX.set(xPos)
    mouseY.set(yPos)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  
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

- Интерфейс стал понятным для продакт-менеджеров с чёткими регламентами и правилами работы.

## Выводы

- Как работать с неопределёнными требованиями и выявлять их совместно со стейкхолдерами.  

- Как строить гибкую архитектуру, когда требования меняются по ходу работы.  

- Как учитывать технические ограничения (Angular vs React) при проектировании интерфейса.  

- Как разделять сценарии для разных ролей (PM и топ-менеджмент) в едином инструменте.

## Артефакты

Можно добавить:  

- статусная модель roadmap'а и релизов;  

- варианты концептов интерфейса для разных ролей;  

- сравнение "каркас → финальный UI";  

- потоки действий для PM и топ-менеджмента.`

  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden bg-gray-950">
        {/* Background Image - no image in header area, only in hero */}
        <div className="absolute inset-0 z-0">
          {/* Hero image - увеличенный размер на 10% */}
          <motion.div 
            ref={imageRef}
            className="absolute top-20 left-0 right-0 h-[70%] z-0 overflow-hidden flex items-center justify-center rounded-2xl group cursor-pointer"
            style={{ 
              opacity,
              y,
              scale,
              x,
              rotateY,
              rotateX,
              perspective: 1000,
              transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 -z-10"
              animate={{
                opacity: isHovered ? 0.3 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative w-full max-w-5xl h-full">
              <Image
                src="/projects/project-2.svg"
                alt="Product Roadmap"
                fill
                priority
                quality={100}
                className="object-contain transition-all duration-300"
                style={{
                  imageRendering: 'crisp-edges',
                  WebkitImageRendering: 'crisp-edges',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  // Fallback to placeholder if image fails
                  const target = e.currentTarget
                  target.style.opacity = '0.25'
                }}
              />
            </div>
            
            {/* Animated border gradient */}
            <div
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4) 0%, rgba(239, 68, 68, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
                filter: 'blur(8px)',
                zIndex: -1,
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2"
              style={{
                borderImage: 'linear-gradient(135deg, rgba(249, 115, 22, 0.6) 0%, rgba(239, 68, 68, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%) 1',
              }}
            />
          </motion.div>
          
          {/* Gradient overlay on background image - очень плавный незаметный переход */}
          <motion.div 
            className="absolute inset-0 z-[1]"
            style={{ 
              opacity,
              background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(3, 7, 18, 0.03) 55%, rgba(3, 7, 18, 0.08) 70%, rgba(3, 7, 18, 0.15) 80%, rgba(3, 7, 18, 0.25) 88%, rgba(3, 7, 18, 0.40) 95%, rgba(3, 7, 18, 0.60) 100%)'
            }}
          />
          {/* Плавный градиент слева направо для текста */}
          <motion.div 
            className="absolute inset-0 z-[2]"
            style={{ 
              opacity,
              background: 'linear-gradient(to right, rgba(3, 7, 18, 0.85) 0%, rgba(3, 7, 18, 0.75) 18%, rgba(3, 7, 18, 0.60) 32%, rgba(3, 7, 18, 0.42) 46%, rgba(3, 7, 18, 0.26) 58%, rgba(3, 7, 18, 0.14) 68%, rgba(3, 7, 18, 0.06) 78%, rgba(3, 7, 18, 0.02) 86%, transparent 92%)'
            }}
          />
        </div>
        
        {/* Content - positioned to overlap with image */}
        <div className="absolute left-0 right-0 top-1/2 bottom-0 z-10">
          <div className="max-w-5xl mx-auto px-6 pt-8 pb-24 md:pt-12 md:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-2xl md:text-3xl font-semibold mb-6 text-gray-50 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Product Roadmap
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
              >
                Инструмент согласования релизов и планирования сервисов на год
              </motion.p>
            </motion.div>
          </div>
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
              h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-gray-50 mb-6 mt-16 first:mt-0" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-50 mb-4 mt-12" {...props} />,
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
          <h2 className="text-xl font-semibold text-gray-50 mb-12">Решение</h2>
          
          <div className="space-y-24">
            {/* Roadmap Overview */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">Roadmap Overview</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Главный экран roadmap: временная шкала всех сервисов и релизов.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/product-roadmap/images/roadmap-overview.png"
                  alt="Roadmap Overview"
                  className="object-cover"
                  fallbackSrc="/cases/product-roadmap/images/roadmap-overview.svg"
                />
              </div>
            </div>

            {/* Service Timeline */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">Service Timeline</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Временная шкала релизов по сервисам с визуализацией зависимостей.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/product-roadmap/images/service-timeline.png"
                  alt="Service Timeline"
                  className="object-cover"
                  fallbackSrc="/cases/product-roadmap/images/service-timeline.svg"
                />
              </div>
            </div>

            {/* Release Cards */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">Release Cards</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Детальные карточки релизов с информацией о статусе, датах и зависимостях.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/product-roadmap/images/release-cards.png"
                  alt="Release Cards"
                  className="object-cover"
                  fallbackSrc="/cases/product-roadmap/images/release-cards.svg"
                />
              </div>
            </div>

            {/* Approval Workflow */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">Approval Workflow</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Процесс согласования roadmap топ-менеджментом с визуализацией статусов.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/product-roadmap/images/approval-workflow.png"
                  alt="Approval Workflow"
                  className="object-cover"
                  fallbackSrc="/cases/product-roadmap/images/approval-workflow.svg"
                />
              </div>
            </div>

            {/* Environment Publication */}
            <div>
              <h3 className="text-xl font-semibold text-gray-50 mb-4">Environment Publication</h3>
              <p className="text-lg text-gray-400 mb-8 italic">
                Публикация согласованного roadmap в среду для всех заинтересованных сторон.
              </p>
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <CaseImage
                  src="/cases/product-roadmap/images/environment-publication.png"
                  alt="Environment Publication"
                  className="object-cover"
                  fallbackSrc="/cases/product-roadmap/images/environment-publication.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}


