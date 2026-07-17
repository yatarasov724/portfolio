import { describe, it, expect } from 'vitest'
import { getAboutChat } from './about'

describe('getAboutChat', () => {
  it('returns the same number of messages for ru and en', () => {
    const ru = getAboutChat('ru')
    const en = getAboutChat('en')
    expect(ru.messages.length).toBe(en.messages.length)
    expect(ru.messages.length).toBeGreaterThan(0)
  })

  it('returns the same number of suggested links for ru and en', () => {
    const ru = getAboutChat('ru')
    const en = getAboutChat('en')
    expect(ru.suggested.length).toBe(en.suggested.length)
    expect(ru.suggested.length).toBeGreaterThan(0)
  })

  it('every message has at least one block', () => {
    const messages = getAboutChat('ru').messages
    for (const message of messages) {
      expect(message.blocks.length).toBeGreaterThan(0)
    }
  })
})
