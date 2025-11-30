export interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'ISY IseeYou — C-Level & Compliance Dashboards',
    description: 'Corporate monitoring & analytics platform. Executive dashboards for unified view of metrics, risks, and process statuses.',
    image: '/projects/project-1.svg',
    url: '/cases/isy-iseeyou'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Мобильное приложение для банковских операций с фокусом на безопасность и удобство.',
    image: '/projects/project-2.svg',
    url: 'https://example.com'
  },
  {
    id: '3',
    title: 'SaaS Dashboard',
    description: 'Административная панель для управления бизнес-процессами с аналитикой и отчетностью.',
    image: '/projects/project-3.svg',
    url: 'https://example.com'
  },
  {
    id: '4',
    title: 'Design System',
    description: 'Комплексная система дизайна для обеспечения консистентности продуктов компании.',
    image: '/projects/project-4.svg',
    url: 'https://example.com'
  }
]

