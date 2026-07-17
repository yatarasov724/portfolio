import type { ReactNode } from 'react'

export type ChatRole = 'visitor' | 'author'

export interface ChatBlockText {
  type: 'text'
  content: ReactNode
}

export interface ChatBlockImage {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

export interface ChatBlockMetrics {
  type: 'metrics'
  items: { value: string; label: string }[]
}

export interface ChatBlockChips {
  type: 'chips'
  items: string[]
}

export interface ChatBlockLinks {
  type: 'links'
  items: { label: string; href: string; variant: 'primary' | 'secondary' }[]
}

export type ChatBlock =
  | ChatBlockText
  | ChatBlockImage
  | ChatBlockMetrics
  | ChatBlockChips
  | ChatBlockLinks

export interface ChatMessage {
  role: ChatRole
  blocks: ChatBlock[]
}

export interface SuggestedLink {
  label: string
  href: string
}

export interface ChatScript {
  title: string
  tags: string[]
  messages: ChatMessage[]
  suggested: SuggestedLink[]
}
