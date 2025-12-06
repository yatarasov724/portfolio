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
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-50">
            Product Designer / UI & UX
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Создаю интуитивные интерфейсы и продумываю пользовательский опыт. 
            Специализируюсь на веб-приложениях и мобильных продуктах.
          </p>
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
          <SectionTitle>Projects</SectionTitle>
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

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <SectionTitle>About</SectionTitle>
            <p className="text-lg text-gray-400 mt-6 leading-relaxed">
              Опытный дизайнер с фокусом на создание продуктов, которые решают реальные проблемы. 
              Работаю на стыке дизайна и разработки, создавая решения, которые не только красивы, 
              но и функциональны.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <a href="https://www.linkedin.com/in/yatarasov/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition-colors">
            LinkedIn
          </a>
          <a href="https://t.me/yatarasov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition-colors">
            Telegram
          </a>
        </motion.div>
      </footer>
    </main>
  )
}
