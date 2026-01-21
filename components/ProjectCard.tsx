'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, memo, useCallback } from 'react'

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
  comingSoon?: boolean
  password?: string
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [isCheckingPassword, setIsCheckingPassword] = useState(false)
  const isExternal = project.url.startsWith('http')
  
  // Проверяем, есть ли сохраненный доступ
  const getStorageKey = useCallback(() => `case_access_${project.id}`, [project.id])
  const hasAccess = typeof window !== 'undefined' && sessionStorage.getItem(getStorageKey()) === 'true'
  
  // Определяем, является ли проект AgTech для применения специальных стилей
  const isAgTech = project.url === '/cases/agro-platform' || project.domain === 'AgTech'
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (project.comingSoon) {
      e.preventDefault()
      return
    }
    e.preventDefault()
    
    // Если есть пароль и нет доступа, показываем модальное окно
    if (project.password && !hasAccess) {
      setShowPasswordModal(true)
      return
    }
    
    const isExternal = project.url.startsWith('http')
    if (isExternal) {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(project.url)
    }
  }, [project.comingSoon, project.password, project.url, hasAccess, router])
  
  const handlePasswordSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCheckingPassword(true)
    setPasswordError(false)
    
    // Имитация проверки пароля (можно убрать задержку если не нужна)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (passwordInput === project.password) {
      const storageKey = getStorageKey()
      sessionStorage.setItem(storageKey, 'true')
      setShowPasswordModal(false)
      setPasswordInput('')
      setPasswordError(false)
      setIsCheckingPassword(false)
      const isExternal = project.url.startsWith('http')
      if (isExternal) {
        window.open(project.url, '_blank', 'noopener,noreferrer')
      } else {
        router.push(project.url)
      }
    } else {
      setPasswordError(true)
      setPasswordInput('')
      setIsCheckingPassword(false)
    }
  }, [passwordInput, project.password, project.url, getStorageKey, router])
  
  return (
    <motion.div
      whileHover={project.comingSoon ? {} : { y: -2 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`group relative rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 ${project.comingSoon ? 'cursor-default opacity-75' : 'cursor-pointer'} bg-gray-900/50 backdrop-blur-sm hover:border-gray-700/60 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out`}
      onClick={handleClick}
    >
      <div className="flex flex-col relative z-0">
        {/* Text Content - сверху */}
        <div className="flex flex-col p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-950/90 via-gray-950/60 to-transparent">
          {/* Заголовок и теги в одной строке */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            {/* Заголовок */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-100 leading-tight flex-1">
              {project.title.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h3>
            
            {/* Tags справа от заголовка */}
            {(project.tags && project.tags.length > 0) || project.domain ? (
              <div className="flex flex-wrap gap-1.5 items-center sm:flex-shrink-0 sm:mt-1">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-gray-800/30 border border-gray-700/30 cursor-default"
                    >
                      {tag}
                    </span>
                  ))
                ) : project.domain ? (
                  <span className="text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-gray-800/30 border border-gray-700/30 cursor-default">
                    {project.domain}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>
          
          {/* Period */}
          {project.period && (
            <p className="text-xs text-gray-500 mt-4">
              {project.period}
            </p>
          )}
        </div>
        
        {/* Image - снизу */}
        <div className="relative w-full h-[240px] sm:h-[280px] md:h-[380px] lg:h-[480px] overflow-hidden px-4 sm:px-6 md:px-8">
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute top-0 left-0 right-0 w-full h-[125%] overflow-hidden border border-gray-700/50">
              {project.image && !imageError ? (
                <>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    loading="lazy"
                    quality={85}
                    className={`object-contain object-top transition-opacity duration-300 ease-out ${project.comingSoon ? 'opacity-30 grayscale' : ''}`}
                    style={{
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges',
                    } as React.CSSProperties}
                    onError={(e) => {
                      console.error('Image failed to load:', project.image, e)
                      setImageError(true)
                    }}
                  />
                  
                  {/* Lock Badge - поверх изображения */}
                  {project.password && !hasAccess && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/90 backdrop-blur-md border border-gray-700/60 shadow-lg">
                      <svg 
                        className="w-4 h-4 text-gray-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-300">Защищено</span>
                    </div>
                  )}
                  
                  {project.comingSoon && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30 pointer-events-none" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none">
                        <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-3">
                          Coming Soon
                        </p>
                        <p className="text-sm md:text-base text-gray-500 text-center max-w-md leading-relaxed">
                          Детальный кейс с процессом работы, выводами и результатами готовится к публикации
                        </p>
                      </div>
                    </>
                  )}
                </>
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

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowPasswordModal(false)
              setPasswordInput('')
              setPasswordError(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800"
            >
              <h3 className="text-2xl font-semibold text-gray-50 mb-2">
                Доступ к кейсу
              </h3>
              <p className="text-gray-400 mb-6">
                Этот кейс защищен паролем. Введите пароль для доступа.
              </p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value)
                      setPasswordError(false)
                    }}
                    placeholder="Введите пароль"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-400 text-sm mt-2">
                      Неверный пароль. Попробуйте снова.
                    </p>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    disabled={isCheckingPassword}
                    whileHover={isCheckingPassword ? {} : { scale: 1.02 }}
                    whileTap={isCheckingPassword ? {} : { scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingPassword ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Проверка...</span>
                      </>
                    ) : (
                      'Войти'
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false)
                      setPasswordInput('')
                      setPasswordError(false)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    Отмена
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

export default ProjectCard

