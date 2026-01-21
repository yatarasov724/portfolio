'use client'

import { fixTypography } from '@/utils/typography'
import { ReactNode } from 'react'

interface TypographyTextProps {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div' | 'li'
}

/**
 * Компонент для автоматической обработки типографики
 * Предотвращает висячие предлоги и союзы
 */
export default function TypographyText({ 
  children, 
  className = '', 
  as: Component = 'span' 
}: TypographyTextProps) {
  // Если children - строка, обрабатываем её
  if (typeof children === 'string') {
    const processedText = fixTypography(children)
    return <Component className={className}>{processedText}</Component>
  }
  
  // Если children - массив или другой ReactNode, обрабатываем рекурсивно
  if (Array.isArray(children)) {
    return (
      <Component className={className}>
        {children.map((child, index) => {
          if (typeof child === 'string') {
            return <span key={index}>{fixTypography(child)}</span>
          }
          return <span key={index}>{child}</span>
        })}
      </Component>
    )
  }
  
  // Для других типов просто возвращаем как есть
  return <Component className={className}>{children}</Component>
}
