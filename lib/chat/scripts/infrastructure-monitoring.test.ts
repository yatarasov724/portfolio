import { describe, it, expect } from 'vitest'
import { getInfrastructureMonitoringChat } from './infrastructure-monitoring'

describe('getInfrastructureMonitoringChat', () => {
  it('returns the same number of messages for ru and en', () => {
    expect(getInfrastructureMonitoringChat('ru').messages.length).toBe(getInfrastructureMonitoringChat('en').messages.length)
    expect(getInfrastructureMonitoringChat('ru').messages.length).toBeGreaterThan(0)
  })

  it('does not mention Kaspersky anywhere in the case', () => {
    const text = JSON.stringify(getInfrastructureMonitoringChat('ru'))
    expect(text.toLowerCase()).not.toContain('касперск')
  })

  it('does not use the word "инфобез"', () => {
    const text = JSON.stringify(getInfrastructureMonitoringChat('ru'))
    expect(text.toLowerCase()).not.toContain('инфобез')
  })

  it('does not use the internal product name "ISY"', () => {
    const text = JSON.stringify(getInfrastructureMonitoringChat('ru')) + JSON.stringify(getInfrastructureMonitoringChat('en'))
    expect(text.toLowerCase()).not.toContain('isy')
    expect(text.toLowerCase()).not.toContain('i see you')
  })

  it('lists all eight user roles', () => {
    const listBlocks = getInfrastructureMonitoringChat('ru').messages
      .flatMap((m) => m.blocks)
      .filter((b) => b.type === 'list')
    const rolesBlock = listBlocks.find((b) => b.type === 'list' && b.items.length === 8)
    expect(rolesBlock).toBeDefined()
  })
})
