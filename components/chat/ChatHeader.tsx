import type { ReactNode } from 'react'

interface ChatHeaderProps {
  icon: ReactNode
  title: string
  tags: string[]
}

export default function ChatHeader({ icon, title, tags }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-2.5 px-6 sm:px-10 py-4 border-b border-gray-200 dark:border-gray-800/50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
      <span className="w-[18px] h-[18px] text-gray-500 dark:text-gray-400 flex-shrink-0">{icon}</span>
      <h1 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-[11px] text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700/50 rounded-full px-2.5 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </header>
  )
}
