import { getAgroChat } from '@/lib/chat/scripts/agro'
import { getInfrastructureMonitoringChat } from '@/lib/chat/scripts/infrastructure-monitoring'
import type { ChatScript } from '@/lib/chat/types'
import { getInfrastructureMonitoringCase } from './authored/infrastructure-monitoring'
import { chatToCase } from './fromChat'
import { CASE_HEADINGS } from './headings'
import type { CaseContent, CaseData, CaseLink, CaseSlug, Language } from './types'

export type { CaseContent, CaseData, CaseFact, CaseLink, CaseSection, CaseSlug, Language } from './types'

export const CASE_SLUGS: readonly CaseSlug[] = ['infrastructure-monitoring', 'agro-platform']

const SCRIPTS: Record<CaseSlug, (language: Language) => ChatScript> = {
  'infrastructure-monitoring': getInfrastructureMonitoringChat,
  'agro-platform': getAgroChat,
}

const AUTHORED: Partial<Record<CaseSlug, (language: Language) => CaseContent>> = {
  'infrastructure-monitoring': getInfrastructureMonitoringCase,
}

function loadContent(slug: CaseSlug, language: Language): CaseContent {
  const authored = AUTHORED[slug]
  if (authored) return authored(language)
  const script = SCRIPTS[slug](language)
  return { title: script.title, tags: script.tags, facts: [], ...chatToCase(script, CASE_HEADINGS[slug][language]) }
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
  const content = loadContent(slug, language)
  const prevSlug = CASE_SLUGS[index - 1]
  const nextSlug = CASE_SLUGS[index + 1]

  return {
    slug,
    number: toLink(slug, language).number as CaseData['number'],
    title: content.title,
    indexTitle: INDEX_TITLES[slug][language],
    indexMeta: `${content.tags[0]} · ${content.tags[content.tags.length - 1]}`,
    tags: content.tags,
    facts: content.facts,
    intro: content.intro,
    sections: content.sections,
    prev: prevSlug ? toLink(prevSlug, language) : null,
    next: nextSlug ? toLink(nextSlug, language) : null,
  }
}

export function getAllCases(language: Language): CaseData[] {
  return CASE_SLUGS.map((slug) => getCase(slug, language))
}
