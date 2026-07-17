'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getAgroChat } from '@/lib/chat/scripts/agro'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { SproutIcon } from '@/components/chat/icons'

export default function AgroPlatformCasePage() {
  const { language } = useLanguage()
  const chat = getAgroChat(language)

  return (
    <>
      <ChatHeader icon={<SproutIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
