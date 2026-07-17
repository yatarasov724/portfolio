import { describe, it, expect } from 'vitest'
import { getIsyChat } from './isy'

describe('getIsyChat', () => {
  it('returns the same number of messages for ru and en', () => {
    expect(getIsyChat('ru').messages.length).toBe(getIsyChat('en').messages.length)
    expect(getIsyChat('ru').messages.length).toBeGreaterThan(0)
  })

  it('does not mention Kaspersky anywhere in the case', () => {
    const text = JSON.stringify(getIsyChat('ru'))
    expect(text.toLowerCase()).not.toContain('касперск')
  })

  it('does not use the word "инфобез"', () => {
    const text = JSON.stringify(getIsyChat('ru'))
    expect(text.toLowerCase()).not.toContain('инфобез')
  })

  it('includes the three result metrics', () => {
    const metricsBlock = getIsyChat('ru').messages
      .flatMap((m) => m.blocks)
      .find((b) => b.type === 'metrics')
    expect(metricsBlock).toBeDefined()
    if (metricsBlock?.type === 'metrics') {
      expect(metricsBlock.items).toHaveLength(3)
    }
  })
})
