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
    specialty: ru ? 'B2B · сложные системы · 5+ лет' : 'B2B · complex systems · 5+ years',
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
    skills: [
      { title: t('skills.productDesign.title'), description: t('skills.productDesign.description') },
      { title: t('skills.designSystems.title'), description: t('skills.designSystems.description') },
      { title: t('skills.processes.title'), description: t('skills.processes.description') },
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
