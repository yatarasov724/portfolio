import { getTranslation, TranslationKey } from '@/i18n/translations'

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
  comingSoon?: boolean
  password?: string
}

export function getProjects(language: 'en' | 'ru'): Project[] {
  const projects: Project[] = [
    {
      id: '1',
      title: getTranslation(language, 'projects.productRoadmap.title'),
      description: getTranslation(language, 'projects.productRoadmap.description'),
      image: '/cases/product-roadmap/images/product-roadmap-hero.png',
      url: '/cases/product-roadmap',
      tags: ['B2B', 'Product Management'],
      period: '2025',
      domain: getTranslation(language, 'projects.productRoadmap.domain'),
      comingSoon: true,
      whatIDid: language === 'en' ? [
        'Designed roadmap interface with annual planning cycles',
        'Created status model for releases and roadmap stages',
        'Built approval process for executive management',
        'Implemented conflict detection and visualization'
      ] : [
        'Спроектировал интерфейс roadmap с годовыми циклами планирования',
        'Создал статусную модель для релизов и этапов roadmap',
        'Построил процесс согласования для топ-менеджмента',
        'Реализовал обнаружение и визуализацию конфликтов'
      ]
    },
    {
      id: '2',
      title: getTranslation(language, 'projects.isy.title'),
      description: getTranslation(language, 'projects.isy.description'),
      image: '/cases/isy-iseeyou/images/laptop-dashboard.png',
      url: '/cases/isy-iseeyou',
      tags: ['B2B', 'Analytics', 'Info sec'],
      period: '2025',
      domain: getTranslation(language, 'projects.isy.domain'),
      whatIDid: language === 'en' ? [
        'Designed automated dashboard for infrastructure statistics collection',
        'Created unified window replacing manual Excel exports and chart building',
        'Built real-time data visualization with detailed navigation from general to specific',
        'Reduced report generation time from hours (manual process) to minutes (automated)'
      ] : [
        'Спроектировал автоматизированный дашборд для сбора статистики по инфраструктуре',
        'Создал единое окно, заменившее ручную выгрузку в Excel и построение графиков',
        'Построил визуализацию данных в реальном времени с детальной навигацией от общего к частному',
        'Снизил время генерации отчётов с часов (ручной процесс) до минут (автоматизированный)'
      ]
    },
    {
      id: '3',
      title: getTranslation(language, 'projects.agro.title'),
      description: getTranslation(language, 'projects.agro.description'),
      image: '/cases/agro-platform/images/agro-platform-hero.png',
      url: '/cases/agro-platform',
      tags: ['B2B', 'AgTech'],
      period: '2023 – 2024',
      domain: 'AgTech',
      whatIDid: language === 'en' ? [
        'Designed field management interface with map visualization',
        'Created analytical dashboards for crop monitoring',
        'Built planning calendar for agricultural tasks',
        'Designed AI assistant for decision support'
      ] : [
        'Спроектировал интерфейс управления полями с визуализацией карт',
        'Создал аналитические дашборды для мониторинга культур',
        'Построил календарь планирования для сельскохозяйственных задач',
        'Спроектировал AI-ассистента для поддержки принятия решений'
      ]
    }
  ]
  
  return projects
}

// Для обратной совместимости
export const projects: Project[] = getProjects('ru')
