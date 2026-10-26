import { describe, it, expect } from 'vitest'
import { getCase, getAllCases } from '@/lib/cases'
import { chatToCase } from '@/lib/cases/fromChat'
import { getAgroChat } from '@/lib/chat/scripts/agro'
import { getInfrastructureMonitoringChat } from '@/lib/chat/scripts/infrastructure-monitoring'
import type { CaseSlug, Language } from '@/lib/cases/types'

const languages: Language[] = ['ru', 'en']
const scripts = {
  'infrastructure-monitoring': getInfrastructureMonitoringChat,
  'agro-platform': getAgroChat,
} as const

describe('cases', () => {
  it('infra: 5 authored sections, agro: 12 sections', () => {
    expect(getCase('infrastructure-monitoring', 'ru').sections.length).toBe(5)
    expect(getCase('agro-platform', 'ru').sections.length).toBe(12)
  })

  it('keeps every author block (no content loss)', () => {
    for (const slug of ['agro-platform'] as CaseSlug[]) {
      for (const language of languages) {
        const authorBlocks = scripts[slug](language)
          .messages.filter((m) => m.role === 'author')
          .reduce((sum, m) => sum + m.blocks.length, 0)
        const data = getCase(slug, language)
        const caseBlocks = data.intro.length + data.sections.reduce((sum, s) => sum + s.blocks.length, 0)
        expect(caseBlocks).toBe(authorBlocks)
      }
    }
  })

  it('headings exist in both languages', () => {
    for (const slug of Object.keys(scripts) as CaseSlug[]) {
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

  it('chatToCase throws on heading mismatch', () => {
    expect(() => chatToCase(getAgroChat('ru'), ['x'])).toThrow()
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
