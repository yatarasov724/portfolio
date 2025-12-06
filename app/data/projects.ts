export interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    id: '3',
    title: 'Agro Platform',
    description: 'Agricultural platform for farm management, crop monitoring, and agricultural analytics.',
    image: '/cases/agro-platform/images/agro-platform-hero.png',
    url: '/cases/agro-platform',
    tags: ['B2B', 'AgTech']
  },
  {
    id: '4',
    title: 'SaaS Dashboard',
    description: 'Административная панель для управления бизнес-процессами с аналитикой и отчетностью.',
    image: '/projects/project-4.svg',
    url: 'https://example.com'
  },
  {
    id: '5',
    title: 'Design System',
    description: 'Комплексная система дизайна для обеспечения консистентности продуктов компании.',
    image: '/projects/project-4.svg',
    url: 'https://example.com'
  }
]

