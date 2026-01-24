'use client'

import { motion } from 'framer-motion'
import { fixTypography } from '@/utils/typography'

interface TimelineStep {
  title: string
  items: string[]
}

interface CaseTimelineProps {
  steps: TimelineStep[]
  language: 'en' | 'ru'
}

const gradients = [
  { from: 'from-blue-500/50', via: 'via-purple-500/50', to: 'to-purple-500/50', dot: 'from-blue-500 to-purple-500', blur: 'bg-blue-500/30' },
  { from: 'from-purple-500/50', via: 'via-pink-500/50', to: 'to-pink-500/50', dot: 'from-purple-500 to-pink-500', blur: 'bg-purple-500/30' },
  { from: 'from-pink-500/50', via: 'via-rose-500/50', to: 'to-rose-500/50', dot: 'from-pink-500 to-red-500', blur: 'bg-pink-500/30' },
  { from: 'from-rose-500/50', via: 'via-red-500/50', to: 'to-red-500/50', dot: 'from-rose-500 to-orange-500', blur: 'bg-rose-500/30' },
  { from: 'from-red-500/50', via: 'via-orange-500/50', to: 'to-orange-500/50', dot: 'from-red-500 to-orange-500', blur: 'bg-red-500/30' },
]

export default function CaseTimeline({ steps, language }: CaseTimelineProps) {
  return (
    <div className="relative">
      {steps.map((step, stepIndex) => {
        const gradient = gradients[stepIndex % gradients.length]
        const isLast = stepIndex === steps.length - 1
        
        return (
          <div key={stepIndex}>
            {/* Mobile: Card version */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: stepIndex * 0.05 }}
              className="md:hidden mb-4 bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
            >
              <motion.h3 
                className="text-xl font-semibold text-gray-50 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {step.title}
              </motion.h3>
              <motion.ul 
                className="list-none text-gray-400 space-y-1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {step.items.map((item, itemIndex) => (
                  <motion.li 
                    key={itemIndex}
                    className="text-lg leading-relaxed flex items-baseline gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.4 + itemIndex * 0.1 }}
                  >
                    <span className="text-gray-500" aria-hidden>◆</span>
                    <span>{language === 'ru' ? fixTypography(item) : item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Desktop: Timeline version */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
              className={`hidden md:block relative pl-16 ${isLast ? '' : 'pb-16'}`}
            >
              {/* Vertical line from previous point to this point (except first) */}
              {stepIndex > 0 && (
                <div className={`absolute left-[calc(2rem-1px)] top-0 h-[calc(0.5rem+4px)] w-0.5 bg-gradient-to-b ${gradients[stepIndex - 1].from} ${gradients[stepIndex - 1].via} ${gradients[stepIndex - 1].to}`} />
              )}
              
              {/* Vertical line from this point to next (except last) */}
              {!isLast && (
                <div className={`absolute left-[calc(2rem-1px)] top-[calc(0.5rem+4px)] bottom-0 w-0.5 bg-gradient-to-b ${gradient.from} ${gradient.via} ${gradient.to}`} />
              )}
              
              {/* Dot */}
              <motion.div 
                className={`absolute left-[calc(2rem-8px)] top-2 w-4 h-4 rounded-full bg-gradient-to-br ${gradient.dot} border-2 border-gray-900 shadow-lg z-10`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + stepIndex * 0.1 }}
                whileHover={{ scale: 1.3 }}
              >
                <div className={`absolute inset-0 w-4 h-4 rounded-full ${gradient.blur} blur-md`} />
              </motion.div>
              
              {/* Content */}
              <div>
                <motion.h3 
                  className="text-xl md:text-2xl font-semibold text-gray-50 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {step.title}
                </motion.h3>
                <motion.ul 
                  className="list-none text-gray-400 space-y-1.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {step.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      className="text-lg leading-relaxed flex items-baseline gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.4 + itemIndex * 0.1 }}
                    >
                      <span className="text-gray-500" aria-hidden>◆</span>
                      <span>{language === 'ru' ? fixTypography(item) : item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
