'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import { projects } from './data/projects'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-24">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Yaroslav Tarasov
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 font-medium">
                Product Designer / UI & UX
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                Product Designer, специализируюсь на B2B продуктах, сложных системах, дашбордах и внутренних инструментах. Создаю интерфейсы, которые упрощают сложные рабочие процессы и помогают командам работать эффективнее.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('projects')
                    if (element) {
                      const headerOffset = 80
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }
                  }}
                  className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-base w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Смотреть проекты
                </motion.button>
                <motion.a
                  href="/cv.pdf"
                  download
                  className="px-8 py-3.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-base w-full sm:w-auto text-center border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Скачать резюме
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>О себе</SectionTitle>
          <div className="mt-12 max-w-3xl space-y-6">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Product Designer с опытом работы более 5 лет, специализируюсь на B2B продуктах, сложных системах и корпоративных инструментах. Работал в T1 и Kaspersky, где проектировал интерфейсы для дашбордов, внутренних платформ и приложений с большим объемом данных.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Моя основная задача — создавать структурированный и масштабируемый UX для систем, где важна ясность. Мне нравится превращать сложные процессы в понятные пользовательские сценарии, которые помогают командам работать эффективнее.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Тесно сотрудничаю с продакт-менеджерами, разработчиками и стейкхолдерами, чтобы обеспечить удобство использования и техническую реализуемость дизайна. Управляю библиотеками компонентов, улучшаю консистентность дизайна и работаю с командами разработки для плавной реализации.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Проекты</SectionTitle>
          <div className="grid grid-cols-1 gap-8 mt-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills & Focus Section */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Навыки и фокус</SectionTitle>
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">UX для сложных процессов</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Проектирование интуитивных рабочих процессов для корпоративных систем и приложений с большим объемом данных
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Дизайн-системы</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Создание и поддержка библиотек компонентов для масштабируемой разработки продуктов
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Дашборды и аналитика</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Создание понятных визуализаций данных и дашбордов для топ-менеджмента для принятия решений
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Исследование пользователей</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Проведение исследований для понимания потребностей пользователей и валидации дизайн-решений
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Решения на основе данных</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Использование аналитики и метрик для улучшения дизайна и оптимизации
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Внутренние инструменты</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Проектирование эффективных интерфейсов для внутренних платформ и операционных инструментов
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Работа со стейкхолдерами</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Сотрудничество с продакт-менеджерами, разработчиками и руководством для согласования решений
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Информационная архитектура</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Структурирование сложной информации и организация контента для оптимальной навигации пользователей
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Прототипирование и тестирование</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Создание интерактивных прототипов и валидация дизайна через пользовательское тестирование
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4">
            Открыт для новых возможностей
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Давайте свяжемся и обсудим, как мы можем работать вместе
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <motion.a
              href="https://t.me/yatarasov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
              </svg>
              <span>Telegram</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/yatarasov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
