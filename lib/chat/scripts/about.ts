import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getAboutChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)

  return {
    title: language === 'ru' ? 'Обо мне' : 'About',
    tags: ['Product Design', 'B2B', language === 'ru' ? '5+ лет' : '5+ years'],
    messages: [
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Привет! Меня зовут Ярослав Тарасов, это моё портфолио — в формате чата, чтобы было интереснее листать.'
              : "Hi! I'm Yaroslav Tarasov, and this is my portfolio — in a chat format, to make it more interesting to browse.",
          },
          { type: 'text', content: t('about.paragraph1') },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Что ты умеешь?' : 'What can you do?' }],
      },
      {
        role: 'author',
        blocks: [
          { type: 'text', content: `${t('skills.productDesign.title')} — ${t('skills.productDesign.description')}` },
          { type: 'text', content: `${t('skills.designSystems.title')} — ${t('skills.designSystems.description')}` },
          { type: 'text', content: `${t('skills.processes.title')} — ${t('skills.processes.description')}` },
          {
            type: 'chips',
            items: ['UX/UI Design', 'User Research', 'Dashboards', 'Design Systems', 'Prototyping', 'Information Architecture'],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Кейс: мониторинг инфраструктуры →' : 'Case: infrastructure monitoring →', href: '/cases/isy-iseeyou' },
      { label: language === 'ru' ? 'Кейс: агроплатформа →' : 'Case: agricultural platform →', href: '/cases/agro-platform' },
      { label: language === 'ru' ? 'Как связаться →' : 'Get in touch →', href: '/contact' },
    ],
  }
}
