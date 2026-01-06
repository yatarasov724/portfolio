'use client'

import { useEffect, ReactNode } from 'react'

// Флаг для включения Lenis (можно вынести в env или конфиг)
const ENABLE_LENIS = false

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (ENABLE_LENIS) {
      // Динамический импорт Lenis только если включен
      // @ts-ignore - lenis может быть не установлен
      import('lenis').then((Lenis: any) => {
        const lenis = new Lenis.default({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      })
    } else {
      // Базовый smooth scroll через CSS
      document.documentElement.style.scrollBehavior = 'smooth'
      
      return () => {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }
  }, [])

  return <>{children}</>
}







