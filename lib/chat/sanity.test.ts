import { describe, it, expect } from 'vitest'
import { getTranslation } from '@/i18n/translations'

describe('vitest setup', () => {
  it('resolves the @/ path alias and imports real project modules', () => {
    expect(getTranslation('ru', 'contact.telegram')).toBe('Написать в Telegram')
    expect(getTranslation('en', 'contact.telegram')).toBe('Message on Telegram')
  })
})
