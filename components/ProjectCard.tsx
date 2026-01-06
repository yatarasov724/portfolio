'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags?: string[]
  period?: string
  client?: string
  domain?: string
  role?: string
  whatIDid?: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const isExternal = project.url.startsWith('http')
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isExternal) {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(project.url)
    }
  }
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="group relative rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 cursor-pointer bg-gray-900/50 backdrop-blur-sm hover:border-gray-700/60 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out"
      onClick={handleClick}
    >
      <div className="flex flex-col relative z-0">
        {/* Text Content - сверху */}
        <div className="flex flex-col p-8 md:p-10 bg-gradient-to-b from-gray-950/90 via-gray-950/60 to-transparent">
          {/* Domain/Tag */}
          {project.domain && (
            <div className="mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {project.domain}
              </span>
            </div>
          )}
          
          {/* Заголовок */}
          <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-3">
            {project.title.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h3>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>
          
          {/* What I did */}
          {project.whatIDid && project.whatIDid.length > 0 && (
            <ul className="space-y-2 mb-4">
              {project.whatIDid.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 bg-gray-500 mt-1.5 flex-shrink-0 rotate-45" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Period */}
          {project.period && (
            <p className="text-xs text-gray-500 mt-4">
              {project.period}
            </p>
          )}
        </div>
        
        {/* Image - снизу */}
        <div className="relative w-full h-[280px] md:h-[380px] lg:h-[480px] overflow-hidden px-8 md:px-10">
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute top-0 left-0 right-0 w-full h-[125%] overflow-hidden">
              {project.image && !imageError ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-contain object-top transition-opacity duration-300 ease-out"
                  style={{
                    imageRendering: 'crisp-edges',
                    WebkitImageRendering: 'crisp-edges',
                  } as React.CSSProperties}
                  onError={(e) => {
                    console.error('Image failed to load:', project.image, e)
                    setImageError(true)
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-800">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

