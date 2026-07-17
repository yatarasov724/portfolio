'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getAboutChat } from '@/lib/chat/scripts/about'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { AboutIcon } from '@/components/chat/icons'

export default function Home() {
  const { language } = useLanguage()
  const chat = getAboutChat(language)

  return (
    <>
      <ChatHeader icon={<AboutIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
