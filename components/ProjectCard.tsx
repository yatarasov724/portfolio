'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags?: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
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
      whileHover={{ scale: 1.005, y: -2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative bg-gray-950 rounded-3xl overflow-hidden cursor-pointer aspect-video min-h-[300px]"
      onClick={handleClick}
    >
      {/* Image - занимает всю правую часть */}
      <div className="absolute inset-0 right-0 w-full h-full">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-right group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Плавный градиент слева направо - более мягкий, чтобы не перекрывать изображение */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to right, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.90) 15%, rgba(3, 7, 18, 0.80) 25%, rgba(3, 7, 18, 0.65) 35%, rgba(3, 7, 18, 0.45) 45%, rgba(3, 7, 18, 0.30) 55%, rgba(3, 7, 18, 0.15) 65%, rgba(3, 7, 18, 0.08) 75%, transparent 85%)'
              }}
            />
            {/* Мягкий градиент сверху вниз для нижней части */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(3, 7, 18, 0.10) 85%, rgba(3, 7, 18, 0.20) 100%)'
              }}
            />
            {/* Легкий градиент для левого верхнего угла для читаемости текста */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to bottom right, rgba(3, 7, 18, 0.35) 0%, rgba(3, 7, 18, 0.15) 25%, transparent 50%)'
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Text content - слева вверху */}
      <div className="absolute left-0 top-0 p-8 z-10 max-w-[60%]">
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium text-gray-200 bg-gray-900/80 backdrop-blur-sm rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-50 mb-3 group-hover:text-white transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

