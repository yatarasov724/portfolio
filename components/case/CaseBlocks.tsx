'use client'

import { useState } from 'react'
import ImageModal from '@/components/ImageModal'
import type { ChatBlock } from '@/lib/chat/types'

// Компилятор требует обработать все типы блоков; в рантайме неизвестный блок пропускаем, а не роняем страницу
function skipUnknown(value: never): null {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unknown case block skipped:', value)
  }
  return null
}

export default function CaseBlocks({ blocks }: { blocks: ChatBlock[] }) {
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={i} className="text-base md:text-[17px] leading-relaxed max-w-3xl">
                {block.content}
              </p>
            )
          case 'image':
            return (
              <figure key={i}>
                <button
                  type="button"
                  onClick={() => setZoomed({ src: block.src, alt: block.alt })}
                  className="block w-full border border-[color:var(--ink)] cursor-zoom-in bg-white"
                  aria-label={block.alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt} loading="lazy" className="block w-full h-auto" />
                </button>
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-[color:var(--muted)]">{block.caption}</figcaption>
                )}
              </figure>
            )
          case 'list':
            return (
              <div key={i} className="max-w-3xl">
                {block.heading && <p className="text-sm font-bold mb-2">{block.heading}</p>}
                <ul className="space-y-3">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-base md:text-[17px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          case 'metrics':
            return (
              <dl key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                {block.items.map((item) => (
                  <div key={item.label} className="border-t border-[color:var(--ink)] pt-2 pb-4">
                    <dt className="text-2xl font-bold tracking-[-0.03em]">{item.value}</dt>
                    <dd className="text-xs text-[color:var(--muted)]">{item.label}</dd>
                  </div>
                ))}
              </dl>
            )
          case 'chips':
            return (
              <p key={i} className="text-sm text-[color:var(--muted)]">
                {block.items.join(' · ')}
              </p>
            )
          case 'links':
            return (
              <p key={i} className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                {block.items.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="sw-link"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            )
          default:
            return skipUnknown(block)
        }
      })}

      {zoomed && <ImageModal src={zoomed.src} alt={zoomed.alt} isOpen={true} onClose={() => setZoomed(null)} />}
    </div>
  )
}
