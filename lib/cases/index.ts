import { getAgroChat } from '@/lib/chat/scripts/agro'
import { getInfrastructureMonitoringChat } from '@/lib/chat/scripts/infrastructure-monitoring'
import type { ChatScript } from '@/lib/chat/types'
import { chatToCase } from './fromChat'
import { CASE_HEADINGS } from './headings'
import type { CaseData, CaseLink, CaseSlug, Language } from './types'

export type { CaseData, CaseLink, CaseSection, CaseSlug, Language } from './types'

export const CASE_SLUGS: readonly CaseSlug[] = ['infrastructure-monitoring', 'agro-platform']

const SCRIPTS: Record<CaseSlug, (language: Language) => ChatScript> = {
  'infrastructure-monitoring': getInfrastructureMonitoringChat,
  'agro-platform': getAgroChat,
}

const INDEX_TITLES: Record<CaseSlug, Record<Language, string>> = {
  'infrastructure-monitoring': { ru: 'Мониторинг инфраструктуры', en: 'Infrastructure Monitoring' },
  'agro-platform': { ru: 'Агроплатформа', en: 'Agricultural Platform' },
}

function toLink(slug: CaseSlug, language: Language): CaseLink {
  const index = CASE_SLUGS.indexOf(slug)
  return {
    slug,
    number: String(index + 1).padStart(2, '0'),
    title: INDEX_TITLES[slug][language],
  }
}

export function getCase(slug: CaseSlug, language: Language): CaseData {
  const index = CASE_SLUGS.indexOf(slug)
  const script = SCRIPTS[slug](language)
  const { intro, sections } = chatToCase(script, CASE_HEADINGS[slug][language])
  const prevSlug = CASE_SLUGS[index - 1]
  const nextSlug = CASE_SLUGS[index + 1]

  return {
    slug,
    number: toLink(slug, language).number as CaseData['number'],
    title: script.title,
    indexTitle: INDEX_TITLES[slug][language],
    indexMeta: `${script.tags[0]} · ${script.tags[script.tags.length - 1]}`,
    tags: script.tags,
    intro,
    sections,
    prev: prevSlug ? toLink(prevSlug, language) : null,
    next: nextSlug ? toLink(nextSlug, language) : null,
  }
}

export function getAllCases(language: Language): CaseData[] {
  return CASE_SLUGS.map((slug) => getCase(slug, language))
}
