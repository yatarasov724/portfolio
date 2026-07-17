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
    const chipsBlock = getAgroChat('ru').messages
      .flatMap((m) => m.blocks)
      .find((b) => b.type === 'chips')
    expect(chipsBlock).toBeDefined()
    if (chipsBlock?.type === 'chips') {
      expect(chipsBlock.items).toHaveLength(5)
    }
  })
})
