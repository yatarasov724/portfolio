'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getInfrastructureMonitoringChat } from '@/lib/chat/scripts/infrastructure-monitoring'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { BarChartIcon } from '@/components/chat/icons'

export default function InfrastructureMonitoringCasePage() {
  const { language } = useLanguage()
  const chat = getInfrastructureMonitoringChat(language)
  return (
    <>
      <ChatHeader icon={<BarChartIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
