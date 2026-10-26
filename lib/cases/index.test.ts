import { describe, it, expect } from 'vitest'
import { getCase, getAllCases } from '@/lib/cases'
import type { CaseSlug, Language } from '@/lib/cases/types'

const languages: Language[] = ['ru', 'en']
const slugs: CaseSlug[] = ['infrastructure-monitoring', 'agro-platform']

describe('cases', () => {
  it('both cases: 5 authored sections', () => {
    expect(getCase('infrastructure-monitoring', 'ru').sections.length).toBe(5)
    expect(getCase('agro-platform', 'ru').sections.length).toBe(5)
  })

  it('headings exist in both languages', () => {
    for (const slug of slugs) {
      for (const language of languages) {
        for (const section of getCase(slug, language).sections) {
          expect(section.heading.trim()).not.toBe('')
          if (language === 'en') expect(section.heading).not.toMatch(/[а-яё]/i)
        }
      }
    }
  })

  it('infra case states role, team and outcome, never names the product', () => {
    for (const language of languages) {
      const data = getCase('infrastructure-monitoring', language)
      expect(data.facts.length).toBe(4)
      expect(JSON.stringify(data).toLowerCase()).not.toMatch(/kics|industrial|промышленн/)
    }
  })

  it('agro case: five modules, six roles, no fabricated metrics, one designer', () => {
    for (const language of languages) {
      const data = getCase('agro-platform', language)
      const blocks = [...data.intro, ...data.sections.flatMap((s) => s.blocks)]
      expect(blocks.some((b) => b.type === 'metrics')).toBe(false)
      expect(blocks.find((b) => b.type === 'chips' && b.items.length === 5)).toBeDefined()
      expect(blocks.find((b) => b.type === 'list' && b.items.length === 6)).toBeDefined()
      expect(data.facts.length).toBe(4)
    }
  })

  it('prev/next', () => {
    const infra = getCase('infrastructure-monitoring', 'ru')
    const agro = getCase('agro-platform', 'ru')
    expect(infra.prev).toBeNull()
    expect(infra.next?.slug).toBe('agro-platform')
    expect(agro.next).toBeNull()
    expect(agro.prev?.slug).toBe('infrastructure-monitoring')
  })

  it('index meta', () => {
    expect(getCase('infrastructure-monitoring', 'ru').indexMeta).toBe('B2B · 2025')
    expect(getCase('agro-platform', 'ru').indexMeta).toBe('B2B · 2023–2024')
  })

  it('index titles', () => {
    expect(getCase('infrastructure-monitoring', 'ru').indexTitle).toBe('Мониторинг инфраструктуры')
    expect(getCase('infrastructure-monitoring', 'en').indexTitle).toBe('Infrastructure Monitoring')
    expect(getCase('agro-platform', 'ru').indexTitle).toBe('Агроплатформа')
    expect(getCase('agro-platform', 'en').indexTitle).toBe('Agricultural Platform')
  })

  it('getAllCases keeps the declared order', () => {
    expect(getAllCases('ru').map((c) => c.slug)).toEqual(['infrastructure-monitoring', 'agro-platform'])
  })
})
