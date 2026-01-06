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
                Product Designer focused on B2B, complex systems, dashboards, and internal tools. I design interfaces that simplify complex workflows and help teams work more efficiently.
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
                  View projects
                </motion.button>
                <motion.a
                  href="/cv.pdf"
                  download
                  className="px-8 py-3.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-base w-full sm:w-auto text-center border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
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
          <SectionTitle>About</SectionTitle>
          <div className="mt-12 max-w-3xl space-y-6">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              I'm a Product Designer with 5+ years of experience specializing in B2B products, complex systems, and enterprise tools. I've worked at T1 and Kaspersky, where I've designed interfaces for dashboards, internal platforms, and data-heavy applications.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              My focus is creating structured and scalable UX for systems where clarity is essential. I enjoy turning complicated processes into straightforward user journeys that help teams work more efficiently.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              I collaborate closely with product managers, developers, and stakeholders to ensure designs are both user-friendly and technically feasible. I manage component libraries, improve design consistency, and work with development teams to ensure smooth implementation.
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

      {/* Skills & Focus Section */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Skills & Focus</SectionTitle>
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">UX for Complex Flows</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Designing intuitive workflows for enterprise systems and data-heavy applications
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Design Systems</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Building and maintaining component libraries for scalable product development
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Dashboards & Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Creating clear data visualizations and executive dashboards for decision-making
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">User Research</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Conducting research to understand user needs and validate design decisions
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Data-Informed Decisions</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Using analytics and metrics to guide design improvements and optimizations
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Internal Tools</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Designing efficient interfaces for internal platforms and operational tools
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Stakeholder Collaboration</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Working with product managers, developers, and leadership to align on solutions
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Information Architecture</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Structuring complex information and organizing content for optimal user navigation
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all h-full flex flex-col"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <h3 className="text-lg font-semibold text-gray-50 mb-2">Prototyping & Testing</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  Creating interactive prototypes and validating designs through user testing
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
            Available for new opportunities
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Let's connect and discuss how we can work together
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
