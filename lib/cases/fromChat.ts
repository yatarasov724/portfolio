import type { ChatBlock, ChatScript } from '@/lib/chat/types'
import type { CaseSection } from './types'

export function chatToCase(
  script: ChatScript,
  headings: string[],
): { intro: ChatBlock[]; sections: CaseSection[] } {
  const answers = script.messages.filter((m) => m.role === 'author')
  if (headings.length !== answers.length - 1) {
    throw new Error(`Expected ${answers.length - 1} headings for "${script.title}", got ${headings.length}`)
  }

  const [first, ...rest] = answers
  return {
    intro: first.blocks,
    sections: rest.map((message, i) => ({ heading: headings[i], blocks: message.blocks })),
  }
}
