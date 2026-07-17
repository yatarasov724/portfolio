'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/i18n/translations'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import { MailIcon } from '@/components/chat/icons'
import type { ChatMessage } from '@/lib/chat/types'

export default function ContactPage() {
  const { language, t } = useLanguage()

  const messages: ChatMessage[] = [
    {
      role: 'author',
      blocks: [
        { type: 'text', content: t('contact.title') },
        { type: 'text', content: t('contact.description') },
        {
          type: 'links',
          items: [
            { label: t('contact.telegram'), href: 'https://t.me/yatarasov', variant: 'primary' },
            { label: t('contact.linkedin'), href: 'https://www.linkedin.com/in/yatarasov/', variant: 'secondary' },
            {
              label: language === 'ru' ? 'Скачать резюме (PDF)' : 'Download resume (PDF)',
              href: '/Tarasov Yaroslav (4).pdf',
              variant: 'secondary',
            },
          ],
        },
      ],
    },
  ]

  return (
    <>
      <ChatHeader
        icon={<MailIcon className="w-full h-full" />}
        title={getTranslation(language, 'nav.contact')}
        tags={['Telegram', 'LinkedIn', 'CV']}
      />
      <ChatMessageList messages={messages} />
    </>
  )
}
