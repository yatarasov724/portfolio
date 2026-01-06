export interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags?: string[]
  period?: string
  client?: string
  domain?: string
  role?: string
  whatIDid?: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Product Roadmap',
    description: 'Roadmap tool for coordinating releases and planning services for the year. A unified instrument to simplify coordination between teams, avoid conflicts in release cards, and increase process transparency.',
    image: '/cases/product-roadmap/images/product-roadmap-hero.png',
    url: '/cases/product-roadmap',
    tags: ['B2B', 'Product Management'],
    period: '2025',
    domain: 'Product Management',
    whatIDid: [
      'Designed roadmap interface with yearly planning cycles',
      'Created status model for releases and roadmap stages',
      'Built approval workflow for top management',
      'Implemented conflict detection and visualization'
    ]
  },
  {
    id: '3',
    title: 'Agricultural enterprise management platform',
    description: 'Digital platform for farm management that optimizes land, equipment, and agricultural processes. It improves efficiency, decision-making, and data accuracy',
    image: '/cases/agro-platform/images/agro-platform-hero.png',
    url: '/cases/agro-platform',
    tags: ['B2B', 'AgTech'],
    period: '2024',
    domain: 'AgTech',
    whatIDid: [
      'Designed field management interface with map visualization',
      'Created analytics dashboards for crop monitoring',
      'Built planning calendar for agricultural tasks',
      'Designed AI assistant for decision support'
    ]
  }
]

