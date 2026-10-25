import { describe, it, expect } from 'vitest'
import { getSiteCopy, CONTACT_LINKS } from '@/lib/site/copy'

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings)
  return []
}

describe('site copy', () => {
  it('headline', () => {
    expect(getSiteCopy('ru').headline).toBe('Продуктовый дизайнер')
    expect(getSiteCopy('en').headline).toBe('Product Designer')
  })

  it('specialty', () => {
    expect(getSiteCopy('ru').specialty).toBe('B2B · сложные системы · 5+ лет')
    expect(getSiteCopy('en').specialty).toBe('B2B · complex systems · 5+ years')
  })

  it('nav labels', () => {
    expect(getSiteCopy('ru').nav).toEqual({ work: 'Работы', about: 'Обо мне', contact: 'Контакты' })
    expect(getSiteCopy('en').nav).toEqual({ work: 'Work', about: 'About', contact: 'Contact' })
    expect(getSiteCopy('ru').caseBack).toBe('← Работы')
    expect(getSiteCopy('en').caseBack).toBe('← Work')
  })

  it('about intro and previous workplace', () => {
    expect(getSiteCopy('ru').aboutIntro).toBe(
      'Продуктовый дизайнер. Более 5 лет делаю B2B-продукты: дашборды, внутренние продукты и сервисы со сложными пользовательскими сценариями, где интерфейс должен всё упростить. Сейчас работаю в Лаборатории Касперского.',
    )
    expect(getSiteCopy('en').aboutIntro).toBe(
      'Product Designer. Over 5 years building B2B products: dashboards, internal products, and services with complex user flows, where the interface has to make things simple. Currently at Kaspersky Lab.',
    )
    expect(getSiteCopy('ru').aboutPrevious).toBe('Раньше: T1')
    expect(getSiteCopy('en').aboutPrevious).toBe('Previously: T1')
  })

  it('skills', () => {
    expect(getSiteCopy('ru').skills).toEqual([
      { title: 'Продуктовый дизайн', description: 'Проектирую дашборды и сложные сценарии, есть опыт во внутренних продуктах.' },
      { title: 'Исследования', description: 'Интервью, сегментация аудитории, проверка решений на пользователях.' },
      { title: 'Дизайн-системы', description: 'Адаптирую и развиваю компоненты, чтобы продукты выглядели и работали единообразно.' },
      {
        title: 'Работа с командой',
        description:
          'Работаю с продактами, аналитиками, архитекторами, разработчиками и техническими писателями, чтобы решения были понятными и их можно было реализовать.',
      },
    ])
    expect(getSiteCopy('en').skills.map((skill) => skill.title)).toEqual([
      'Product Design',
      'Research',
      'Design Systems',
      'Working with the team',
    ])
    expect(getSiteCopy('en').skills[3].description).toBe(
      'I work with product managers, analysts, architects, developers, and technical writers so solutions are clear and buildable.',
    )
  })

  it('does not name the internal product (KICS) anywhere', () => {
    for (const language of ['ru', 'en'] as const) {
      const text = collectStrings(getSiteCopy(language)).join(' ').toLowerCase()
      expect(text).not.toContain('kics')
      expect(text).not.toContain('industrial')
      expect(text).not.toContain('промышленн')
    }
  })

  it('no empty strings', () => {
    for (const language of ['ru', 'en'] as const) {
      for (const text of collectStrings(getSiteCopy(language))) {
        expect(text.trim()).not.toBe('')
      }
    }
  })

  it('contact links', () => {
    expect(CONTACT_LINKS.telegram).toBe('https://t.me/yatarasov')
    expect(CONTACT_LINKS.linkedin).toBe('https://www.linkedin.com/in/yatarasov/')
    expect(CONTACT_LINKS.resume).toBe('/Tarasov Yaroslav (4).pdf')
  })
})
