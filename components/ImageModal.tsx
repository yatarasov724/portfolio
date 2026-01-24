'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  // Закрытие по ESC
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none"
            onClick={onClose}
          >
            <div
              className="relative max-w-7xl max-h-[95vh] sm:max-h-[90vh] w-full h-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-gray-900/90 hover:bg-gray-800 active:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
                <div 
                  className="relative w-full h-full overflow-hidden bg-gray-900/30"
                  style={{ 
                    borderRadius: '0.375rem',
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      borderRadius: '0.375rem',
                      overflow: 'hidden'
                    }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={95}
                      priority
                      style={{ display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
