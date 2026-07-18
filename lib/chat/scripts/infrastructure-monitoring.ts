import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getInfrastructureMonitoringChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const roleIds = ['ciso', 'departmentHead', 'itOperator', 'auditor'] as const

  return {
    title: language === 'ru' ? 'Дашборд для мониторинга инфраструктуры' : 'Infrastructure monitoring dashboard',
    tags: ['B2B', 'Analytics', 'Info sec', '2025'],
    messages: [
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Расскажи про этот проект' : 'Tell me about this project' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Это внутренний B2B-продукт для мониторинга инфраструктуры. До него команда собирала статистику вручную: выгрузки в Excel, графики руками, часы на каждый отчёт.'
              : "It's an internal B2B product for infrastructure monitoring. Before it, the team collected statistics manually: Excel exports, hand-built charts, hours per report.",
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Я спроектировал автоматизированный дашборд — единое окно, где данные видны в реальном времени, от общей картины до деталей по каждому сервису.'
              : 'I designed an automated dashboard — a single window where data is visible in real time, from the big picture down to details for each service.',
          },
          {
            type: 'image',
            src: '/cases/infrastructure-monitoring/images/laptop-dashboard.png',
            alt: language === 'ru' ? 'Дашборд для топ-менеджмента' : 'Executive dashboard',
            caption: language === 'ru' ? 'Главный экран дашборда' : 'Dashboard main screen',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Какая была твоя роль?' : 'What was your role?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Изучил ручной процесс сбора статистики и сегментировал аудиторию: C-level, комплаенс, security-team. Построил структуру от общего к частному — от главных сущностей до детализированных авточеков по каждому сервису.'
              : 'I studied the manual statistics collection process and segmented the audience: C-level, compliance, security team. Built a structure from general to specific — from main entities down to detailed autochecks per service.',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Спроектировал систему фильтров и визуальный язык для уровней риска и статусов. Сервис переводили с Angular на единую B2B дизайн-систему на React — вместе с командой дизайн-системы адаптировал компоненты под специфику дашборда.'
              : 'I designed a filtering system and a visual language for risk levels and statuses. The service was migrated from Angular to a unified B2B design system on React — together with the design system team, I adapted components to the dashboard specifics.',
          },
          {
            type: 'image',
            src: '/cases/infrastructure-monitoring/images/table_filter.png',
            alt: language === 'ru' ? 'Настройки таблицы' : 'Table settings',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Для кого именно этот дашборд?' : 'Who exactly is this dashboard for?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru' ? 'Дашборд закрывает задачи сразу нескольких ролей:' : 'The dashboard covers the needs of several different roles:',
          },
          ...roleIds.map((id) => ({
            type: 'text' as const,
            content: `${t(`case.isy.roles.${id}.role` as TranslationKey)} — ${t(`case.isy.roles.${id}.tasks` as TranslationKey)}.`,
          })),
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'И что получилось?' : 'And what came out of it?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'metrics',
            items: [
              { value: language === 'ru' ? 'Часы → минуты' : 'Hours → minutes', label: language === 'ru' ? 'генерация отчётов' : 'report generation' },
              { value: language === 'ru' ? '1 окно' : '1 window', label: language === 'ru' ? 'вместо ручных выгрузок' : 'instead of manual exports' },
              { value: 'Real-time', label: language === 'ru' ? 'данные без ожидания' : 'data with no waiting' },
            ],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Кейс: агроплатформа →' : 'Case: agricultural platform →', href: '/cases/agro-platform' },
      { label: language === 'ru' ? 'Обо мне →' : 'About me →', href: '/' },
    ],
  }
}
