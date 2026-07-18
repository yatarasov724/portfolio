import { describe, it, expect } from 'vitest'
import { getAgroChat } from './agro'

describe('getAgroChat', () => {
  it('returns the same number of messages for ru and en', () => {
    expect(getAgroChat('ru').messages.length).toBe(getAgroChat('en').messages.length)
    expect(getAgroChat('ru').messages.length).toBeGreaterThan(0)
  })

  it('does not include fabricated metrics', () => {
    const hasMetrics = getAgroChat('ru').messages.some((m) => m.blocks.some((b) => b.type === 'metrics'))
    expect(hasMetrics).toBe(false)
  })

  it('lists the five platform modules as chips', () => {
    const chipsBlocks = getAgroChat('ru').messages
      .flatMap((m) => m.blocks)
      .filter((b) => b.type === 'chips')
    const modulesBlock = chipsBlocks.find((b) => b.type === 'chips' && b.items.length === 5)
    expect(modulesBlock).toBeDefined()
  })

  it('lists the full team composition as chips', () => {
    const chipsBlocks = getAgroChat('ru').messages
      .flatMap((m) => m.blocks)
      .filter((b) => b.type === 'chips')
    const teamBlock = chipsBlocks.find((b) => b.type === 'chips' && b.items.length === 10)
    expect(teamBlock).toBeDefined()
  })

  it('lists all six user roles', () => {
    const listBlocks = getAgroChat('ru').messages
      .flatMap((m) => m.blocks)
      .filter((b) => b.type === 'list')
    const rolesBlock = listBlocks.find((b) => b.type === 'list' && b.items.length === 6)
    expect(rolesBlock).toBeDefined()
  })
})
