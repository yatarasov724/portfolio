'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageModal from '@/components/ImageModal'
import type { ChatMessage } from '@/lib/chat/types'

export default function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 space-y-7">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`flex gap-3.5 ${message.role === 'visitor' ? 'justify-end' : ''}`}
        >
          {message.role === 'visitor' ? (
            <div className="bg-gray-800/60 rounded-2xl rounded-tr-sm px-4 py-2.5 text-[14.5px] text-gray-100 max-w-[75%]">
              {message.blocks.map((block, i) => (block.type === 'text' ? <span key={i}>{block.content}</span> : null))}
            </div>
          ) : (
            <>
              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mt-0.5">
                YT
              </div>
              <div className="min-w-0 flex-1 space-y-3 text-[14.5px] leading-relaxed text-gray-200">
                {message.blocks.map((block, i) => {
                  if (block.type === 'text') {
                    return <p key={i}>{block.content}</p>
                  }
                  if (block.type === 'image') {
                    return (
                      <div key={i}>
                        <button
                          type="button"
                          onClick={() => setZoomedImage({ src: block.src, alt: block.alt })}
                          className="block w-full rounded-xl border border-gray-800/50 overflow-hidden cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={block.src} alt={block.alt} loading="lazy" className="w-full h-auto" />
                        </button>
                        {block.caption && <p className="text-xs text-gray-500 mt-1.5">{block.caption}</p>}
                      </div>
                    )
                  }
                  if (block.type === 'metrics') {
                    return (
                      <div key={i} className="flex flex-wrap gap-3">
                        {block.items.map((item) => (
                          <div key={item.label} className="bg-gray-900/40 border border-gray-800/50 rounded-xl px-4 py-3 min-w-[140px]">
                            <div className="text-lg font-bold text-blue-400">{item.value}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  if (block.type === 'chips') {
                    return (
                      <div key={i} className="flex flex-wrap gap-2">
                        {block.items.map((chip) => (
                          <span key={chip} className="text-xs text-gray-400 bg-gray-800/30 border border-gray-700/30 rounded-full px-3 py-1.5">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )
                  }
                  if (block.type === 'links') {
                    return (
                      <div key={i} className="flex flex-col sm:flex-row gap-3 pt-1">
                        {block.items.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={
                              link.variant === 'primary'
                                ? 'flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                                : 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700'
                            }
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </>
          )}
        </motion.div>
      ))}

      {zoomedImage && (
        <ImageModal src={zoomedImage.src} alt={zoomedImage.alt} isOpen={true} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  )
}
