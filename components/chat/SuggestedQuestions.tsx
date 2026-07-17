import Link from 'next/link'
import type { SuggestedLink } from '@/lib/chat/types'

export default function SuggestedQuestions({ items }: { items: SuggestedLink[] }) {
  if (items.length === 0) return null
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-4 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="text-[13px] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800/50 rounded-full px-4 py-2 hover:border-blue-500/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
