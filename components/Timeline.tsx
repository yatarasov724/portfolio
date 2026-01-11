'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  title: string
  subtitle?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full py-8">
      {/* Timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent transform -translate-y-1/2" />
      
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative z-10 flex flex-col items-center sm:flex-1 group"
          >
            {/* Timeline dot with glow */}
            <div className="relative mb-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative z-10"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-500 shadow-lg" />
                <div className="absolute inset-0 w-5 h-5 rounded-full bg-gray-400/30 blur-md group-hover:bg-gray-400/50 transition-colors" />
              </motion.div>
            </div>
            
            {/* Content card */}
            <div className="text-center max-w-[200px] sm:max-w-none px-2">
              <h4 className="text-sm font-semibold text-gray-200 mb-1 leading-tight group-hover:text-gray-100 transition-colors">
                {item.title}
              </h4>
              {item.subtitle && (
                <p className="text-xs text-gray-500 leading-tight">
                  {item.subtitle}
                </p>
              )}
            </div>
            
            {/* Arrow connector (except last item) */}
            {index < items.length - 1 && (
              <div className="hidden sm:block absolute top-1/2 left-full w-full h-[2px] transform -translate-y-1/2 z-0">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
