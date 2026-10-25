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

  it('about has three paragraphs and three skills', () => {
    for (const language of ['ru', 'en'] as const) {
      const copy = getSiteCopy(language)
      expect(copy.aboutParagraphs).toHaveLength(3)
      expect(copy.skills).toHaveLength(3)
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
