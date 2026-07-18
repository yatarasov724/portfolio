import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getInfrastructureMonitoringChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const roleIds = ['hostAdmin', 'securitySpecialist', 'departmentHead', 'itOperator', 'auditor', 'developer', 'ciso', 'processManager'] as const

  const IMG = '/cases/infrastructure-monitoring/images'

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
              ? 'Автоматизированный дашборд для быстрого сбора статистики по всей инфраструктуре. Единое окно метрик, рисков и статусов процессов для C-level, комплаенса и сотрудников информационной безопасности. Помогает выявлять аномалии, отслеживать отклонения и принимать оперативные решения.'
              : 'An automated dashboard for quick collection of statistics across the entire infrastructure. A unified window of metrics, risks, and process statuses for C-level, compliance, and information security staff. Helps identify anomalies, track deviations, and make operational decisions.',
          },
          {
            type: 'image',
            src: `${IMG}/laptop-dashboard.png`,
            alt: language === 'ru' ? 'Дашборд для топ-менеджмента' : 'Executive dashboard',
            caption: language === 'ru' ? 'Главный экран дашборда' : 'Dashboard main screen',
          },
          {
            type: 'image',
            src: `${IMG}/laptop-dashboard-2.png`,
            alt: language === 'ru' ? 'Дашборд для топ-менеджмента, альтернативный вид' : 'Executive dashboard, alternate view',
            caption: language === 'ru' ? 'Альтернативный вид дашборда' : 'Alternate dashboard view',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'В чём была проблема?' : 'What was the problem?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            items: language === 'ru'
              ? [
                  'Руководство и комплаенс-подразделение тратили часы на ручной сбор данных: выгрузку в Excel, построение графиков и подготовку отчётов.',
                  'Метрики хранились в разных системах, не было единого источника правды для оценки состояния инфраструктуры.',
                  'Отсутствие автоматизации приводило к задержкам в выявлении аномалий и принятии решений.',
                  'Сложность визуализации данных затрудняла быстрый анализ трендов и рисков.',
                ]
              : [
                  'Management and the compliance department spent hours on manual data collection: exporting to Excel, building charts, and preparing reports.',
                  'Metrics were stored in different systems — there was no single source of truth for assessing infrastructure status.',
                  'Lack of automation caused delays in identifying anomalies and making decisions.',
                  'Complex data visualization made it hard to quickly analyze trends and risks.',
                ],
          },
          {
            type: 'image',
            src: `${IMG}/manual-excel-process.png`,
            alt: language === 'ru' ? 'Старый процесс: ручная выгрузка в Excel' : 'Old process: manual Excel export',
            caption: language === 'ru' ? 'Как было раньше — ручная выгрузка и построение графиков' : 'Before — manual export and chart building',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Какие цели ты ставил?' : 'What goals did you set?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            items: language === 'ru'
              ? [
                  'Создать единую точку доступа к метрикам инфраструктуры с автоматическим обновлением данных в реальном времени.',
                  'Обеспечить визуализацию рисков и статусов процессов с возможностью детального анализа.',
                  'Сократить время на подготовку отчётов и поиск информации с часов до минут.',
                  'Спроектировать интерфейс, понятный для non-tech пользователей, с интуитивной навигацией от общего к частному.',
                ]
              : [
                  'Create a single point of access to infrastructure metrics with automatic real-time data updates.',
                  'Provide risk and process-status visualization with the ability to drill into detail.',
                  'Cut report preparation and information search time from hours to minutes.',
                  'Design an interface understandable for non-tech users, with intuitive navigation from general to specific.',
                ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Как ты подошёл к исследованию?' : 'How did you approach the research?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'Исследование и анализ' : 'Research and analysis',
            items: language === 'ru'
              ? [
                  'Изучил текущий процесс сбора статистики: ручная выгрузка в Excel, построение графиков вручную, время генерации отчётов — несколько часов.',
                  'Проанализировал источники данных инфраструктуры и систему метрик, которые нужно автоматизировать.',
                  'Сегментировал целевую аудиторию: C-level, комплаенс, security-team.',
                  'Определил ключевые сценарии использования: быстрый доступ к статистике, weekly review, risk overview, operational monitoring.',
                ]
              : [
                  'Studied the current statistics collection process: manual Excel exports, manual chart building, report generation time — several hours.',
                  'Analyzed infrastructure data sources and the metrics system that needed to be automated.',
                  'Segmented the target audience: C-level, compliance, security team.',
                  'Defined key use cases: quick access to statistics, weekly review, risk overview, operational monitoring.',
                ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Что дальше, после исследования?' : 'What came after the research?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'Информационная архитектура' : 'Information architecture',
            items: language === 'ru'
              ? [
                  'Построил структуру от общего к частному: от главных сущностей до детализированных авточеков по каждому сервису.',
                  'Спроектировал логику автоматического сбора данных и визуализации, заменившую ручной процесс в Excel.',
                  'Спроектировал систему фильтров и иерархическую структуру для детального просмотра и анализа данных.',
                  'Определил визуальный язык для уровней риска и статусов инфраструктуры.',
                ]
              : [
                  'Built a structure from general to specific: from main entities down to detailed autochecks per service.',
                  "Designed the logic for automatic data collection and visualization, replacing the manual Excel process.",
                  'Designed a filter system and hierarchical structure for detailed viewing and data analysis.',
                  'Defined a visual language for risk levels and infrastructure statuses.',
                ],
          },
          {
            type: 'image',
            src: `${IMG}/table_filter.png`,
            alt: language === 'ru' ? 'Настройки таблицы' : 'Table settings',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'А сам интерфейс?' : 'And the interface itself?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'Интерфейс' : 'Interface',
            items: language === 'ru'
              ? [
                  'Изначально сервис разрабатывался на Angular, но в связи с требованиями руководства встала задача перейти на единую B2B дизайн-систему на React.',
                  'Вместе с командой дизайн-системы адаптировал существующие компоненты под специфику дашборда: карточки статистики, диаграммы, таблицы и статусы инфраструктуры.',
                  'Стиль: строгий, корпоративный, читаемый, ориентированный на данные. Единообразие с другими B2B-продуктами компании обеспечило быструю адаптацию пользователей.',
                ]
              : [
                  'The service was initially built on Angular, but management required migrating to a unified B2B design system on React.',
                  'Together with the design system team, I adapted existing components to the dashboard specifics: stat cards, charts, tables, and infrastructure statuses.',
                  'Style: strict, corporate, readable, data-oriented. Consistency with the company\'s other B2B products enabled fast user adaptation.',
                ],
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
          {
            type: 'list',
            items: roleIds.map(
              (id) => `${t(`case.isy.roles.${id}.role` as TranslationKey)} — ${t(`case.isy.roles.${id}.tasks` as TranslationKey)}.`
            ),
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Покажи ещё экраны' : 'Show me more screens' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Переработанный интерфейс карточки сервиса с улучшенной навигацией: вертикальная боковая панель заменила горизонтальные вкладки, что сделало интерфейс современнее и читаемее.'
              : 'Redesigned service card interface with improved navigation: a vertical sidebar replaced horizontal tabs, making the interface more modern and readable.',
          },
          {
            type: 'image',
            src: `${IMG}/service_card.png`,
            alt: language === 'ru' ? 'Карточка сервиса' : 'Service card',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Карточка требования содержит информацию по всем авточекам, которые в него входят — статус и результаты проверки каждого в едином месте.'
              : 'The requirement card contains information about every autocheck it includes — status and check results for each, all in one place.',
          },
          {
            type: 'image',
            src: `${IMG}/autocheck_card.png`,
            alt: language === 'ru' ? 'Карточка требования' : 'Requirement card',
          },
          {
            type: 'image',
            src: `${IMG}/autocheck_card_details.png`,
            alt: language === 'ru' ? 'Детали карточки требования' : 'Requirement card details',
            caption: language === 'ru' ? 'Детали карточки требования' : 'Requirement card details',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'А дополнительные состояния интерфейса?' : 'What about additional interface states?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'image',
            src: `${IMG}/success.png`,
            alt: language === 'ru' ? 'Состояние: всё в порядке' : 'All good state',
            caption: language === 'ru' ? 'Состояние «всё в порядке»' : '"All good" state',
          },
          {
            type: 'image',
            src: `${IMG}/tooltips.png`,
            alt: language === 'ru' ? 'Интерактивные подсказки' : 'Interactive tooltips',
            caption: language === 'ru' ? 'Интерактивные подсказки' : 'Interactive tooltips',
          },
          {
            type: 'image',
            src: `${IMG}/global_filter.png`,
            alt: language === 'ru' ? 'Глобальная фильтрация' : 'Global filters',
            caption: language === 'ru' ? 'Глобальная фильтрация' : 'Global filters',
          },
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
            type: 'list',
            items: language === 'ru'
              ? [
                  'Автоматизирован сбор статистики по всей инфраструктуре: дашборд заменяет ручную выгрузку в Excel и построение графиков.',
                  'Руководство получило «единое окно» для быстрого доступа к статистике инфраструктуры в реальном времени.',
                  'Комплаенс и сотрудники ИБ стали быстрее находить отклонения благодаря автоматизированной визуализации и детальной навигации от общей картины к конкретным данным.',
                  'Интерфейс стал визуально стандартизированным и понятным для non-tech пользователей.',
                ]
              : [
                  'Automated statistics collection across the entire infrastructure: the dashboard replaces manual Excel exports and chart building.',
                  'Management got a "unified window" for quick access to real-time infrastructure statistics.',
                  'Compliance and security staff started finding deviations faster thanks to automated visualization and detailed navigation from the big picture to specific data.',
                  'The interface became visually standardized and understandable for non-tech users.',
                ],
          },
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
