'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowUpRightIcon } from './icons'

export default function TelegramCta() {
  const { language } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-8">
      <a
        href="https://t.me/yatarasov"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-gray-900/40 border border-gray-800/50 rounded-2xl px-4 py-3.5 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
      >
        {language === 'ru' ? 'Написать мне в Telegram' : 'Message me on Telegram'}
        <span className="ml-auto w-[30px] h-[30px] rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
          <ArrowUpRightIcon className="w-[15px] h-[15px] text-white" />
        </span>
      </a>
    </div>
  )
}
