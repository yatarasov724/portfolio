import type { ChatBlock } from '@/lib/chat/types'

export type Language = 'en' | 'ru'

export type CaseSlug = 'infrastructure-monitoring' | 'agro-platform'

export interface CaseSection {
  heading: string
  blocks: ChatBlock[]
}

export interface CaseLink {
  slug: CaseSlug
  number: string
  title: string
}

export interface CaseData {
  slug: CaseSlug
  number: '01' | '02'
  title: string
  indexTitle: string
  indexMeta: string
  tags: string[]
  intro: ChatBlock[]
  sections: CaseSection[]
  prev: CaseLink | null
  next: CaseLink | null
}
