'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getAllCases } from '@/lib/cases'

export default function CaseIndex() {
  const { language } = useLanguage()

  return (
    <ul className="col-span-12 border-b border-[color:var(--ink)]">
      {getAllCases(language).map((item) => (
        <li key={item.slug} className="border-t border-[color:var(--ink)]">
          <Link
            href={`/cases/${item.slug}`}
            className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 hover:bg-[color:var(--ink)] hover:text-[color:var(--bg)] md:px-2 transition-colors"
          >
            <span className="text-sm font-bold">{item.number}</span>
            <span className="text-2xl md:text-4xl font-bold tracking-[-0.03em] leading-tight">{item.indexTitle}</span>
            <span className="col-start-2 md:col-start-3 text-sm">{item.indexMeta}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
