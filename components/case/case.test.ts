import { describe, it, expect } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import CaseBlocks from '@/components/case/CaseBlocks'
import CaseNav from '@/components/case/CaseNav'
import type { ChatBlock } from '@/lib/chat/types'

const textOf = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

describe('CaseBlocks', () => {
  it('renders nothing for an unknown block type instead of crashing', () => {
    const blocks = [
      { type: 'text', content: 'known text' },
      { type: 'bogus' },
    ] as unknown as ChatBlock[]

    const html = renderToStaticMarkup(createElement(CaseBlocks, { blocks }))

    expect(html).toContain('known text')
  })
})

describe('CaseNav', () => {
  const agro = { slug: 'agro-platform' as const, number: '02', title: 'Агроплатформа' }
  const infra = { slug: 'infrastructure-monitoring' as const, number: '01', title: 'Мониторинг' }

  it('shows the position as "01 / 02"', () => {
    const html = renderToStaticMarkup(
      createElement(CaseNav, { back: '← Работы', prev: null, next: agro, number: '01', total: 2 }),
    )
    expect(textOf(html)).toContain('01 / 02')
    expect(textOf(html)).not.toContain('01 02')
  })

  it('links to the neighbour case only when it exists', () => {
    const first = renderToStaticMarkup(
      createElement(CaseNav, { back: '← Работы', prev: null, next: agro, number: '01', total: 2 }),
    )
    expect(first).toContain('/cases/agro-platform')
    expect(first).not.toContain('/cases/infrastructure-monitoring')

    const last = renderToStaticMarkup(
      createElement(CaseNav, { back: '← Работы', prev: infra, next: null, number: '02', total: 2 }),
    )
    expect(last).toContain('/cases/infrastructure-monitoring')
    expect(last).not.toContain('/cases/agro-platform')
  })
})
