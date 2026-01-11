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
    id: '2',
    title: 'ISY I See You — Executive Dashboard',
    description: 'Executive dashboard for C-level and compliance team: unified view of infrastructure statistics, KPIs, and operational metrics. Automated reporting system that replaced manual Excel exports and chart building.',
    image: '/cases/isy-iseeyou/images/laptop-dashboard.png',
    url: '/cases/isy-iseeyou',
    tags: ['B2B', 'Analytics', 'Enterprise'],
    period: '2025',
    domain: 'Security & Analytics',
    whatIDid: [
      'Designed automated dashboard for infrastructure statistics collection',
      'Created unified view replacing manual Excel exports and chart building',
      'Built real-time data visualization with detailed navigation from overview to specifics',
      'Reduced report generation time from hours (manual process) to minutes (automated)'
    ]
  },
  {
    id: '3',
    title: 'Agricultural enterprise management platform',
    description: 'Digital platform for farm management that optimizes land, equipment, and agricultural processes. It improves efficiency, decision-making, and data accuracy',
    image: '/cases/agro-platform/images/agro-platform-hero.png',
    url: '/cases/agro-platform',
    tags: ['B2B', 'AgTech'],
    period: '2023 – 2024',
    domain: 'AgTech',
    whatIDid: [
      'Designed field management interface with map visualization',
      'Created analytics dashboards for crop monitoring',
      'Built planning calendar for agricultural tasks',
      'Designed AI assistant for decision support'
    ]
  }
]

