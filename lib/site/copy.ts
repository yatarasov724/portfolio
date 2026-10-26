import { getTranslation } from '@/i18n/translations'
import type { Language } from '@/lib/cases/types'

export const CONTACT_LINKS = {
  telegram: 'https://t.me/yatarasov',
  linkedin: 'https://www.linkedin.com/in/yatarasov/',
  resume: '/Tarasov Yaroslav (4).pdf',
}

export interface SiteCopy {
  name: string
  headline: string
  specialty: string
  nav: { work: string; about: string; contact: string }
  workLabel: string
  aboutLabel: string
  aboutIntro: string
  aboutPrevious: string
  skills: { title: string; description: string }[]
  contactTitle: string
  contactDescription: string
  contactLabels: { telegram: string; linkedin: string; resume: string }
  caseBack: string
}

export function getSiteCopy(language: Language): SiteCopy {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)
  const ru = language === 'ru'

  return {
    name: 'Yaroslav Tarasov',
    headline: ru ? 'Продуктовый дизайнер' : 'Product Designer',
    specialty: ru ? 'Дашборды и платформы для B2B. Два кейса ниже.' : 'Dashboards and platforms for B2B. Two case studies below.',
    nav: {
      work: ru ? 'Работы' : 'Work',
      about: ru ? 'Обо мне' : 'About',
      contact: ru ? 'Контакты' : 'Contact',
    },
    workLabel: ru ? 'Избранные работы' : 'Selected work',
    aboutLabel: ru ? 'Обо мне' : 'About',
    aboutIntro: ru
      ? 'Продуктовый дизайнер. Более 5 лет делаю B2B-продукты: дашборды, внутренние продукты и сервисы со сложными пользовательскими сценариями, где интерфейс должен всё упростить. Сейчас работаю в Лаборатории Касперского.'
      : 'Product Designer. Over 5 years building B2B products: dashboards, internal products, and services with complex user flows, where the interface has to make things simple. Currently at Kaspersky Lab.',
    aboutPrevious: ru ? 'Раньше: T1' : 'Previously: T1',
    skills: ru
      ? [
          { title: 'Продуктовый дизайн', description: 'Проектирую дашборды и сложные сценарии, есть опыт во внутренних продуктах.' },
          { title: 'Исследования', description: 'Интервью, сегментация аудитории, проверка решений на пользователях.' },
          { title: 'Дизайн-системы', description: 'Адаптирую и развиваю компоненты, чтобы продукты выглядели и работали единообразно.' },
          {
            title: 'Работа с командой',
            description:
              'Работаю с продактами, аналитиками, архитекторами, разработчиками и техническими писателями, чтобы решения были понятными и их можно было реализовать.',
          },
        ]
      : [
          { title: 'Product Design', description: 'I design dashboards and complex user flows, with experience in internal products.' },
          { title: 'Research', description: 'Interviews, audience segmentation, validating solutions with users.' },
          { title: 'Design Systems', description: 'I adapt and grow components so products look and work consistently.' },
          {
            title: 'Working with the team',
            description:
              'I work with product managers, analysts, architects, developers, and technical writers so solutions are clear and buildable.',
          },
        ],
    contactTitle: t('contact.title'),
    contactDescription: t('contact.description'),
    contactLabels: {
      telegram: 'Telegram',
      linkedin: 'LinkedIn',
      resume: ru ? 'Резюме (PDF)' : 'Resume (PDF)',
    },
    caseBack: ru ? '← Работы' : '← Work',
  }
}
