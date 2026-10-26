import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatBlock } from '@/lib/chat/types'
import type { CaseContent, Language } from '../types'

const IMG = '/cases/infrastructure-monitoring/images'
const ROLE_IDS = ['hostAdmin', 'securitySpecialist', 'departmentHead', 'itOperator', 'auditor', 'developer', 'ciso', 'processManager'] as const

export function getInfrastructureMonitoringCase(language: Language): CaseContent {
  const ru = language === 'ru'
  const pick = <T,>(ruValue: T, enValue: T): T => (ru ? ruValue : enValue)
  const image = (file: string, alt: string, caption?: string): ChatBlock => ({
    type: 'image',
    src: `${IMG}/${file}`,
    alt,
    ...(caption ? { caption } : {}),
  })

  return {
    title: pick('Дашборд для мониторинга инфраструктуры', 'Infrastructure monitoring dashboard'),
    tags: ['B2B', 'Analytics', 'Info sec', '2025'],
    facts: [
      {
        label: pick('Роль', 'Role'),
        value: pick(
          'Единственный дизайнер. Исследование, структура, интерфейсы, на старте и функции аналитика',
          'Sole designer. Research, structure, interfaces, and the analyst role at the start',
        ),
      },
      {
        label: pick('Команда', 'Team'),
        value: pick('Аналитик, архитектор, фронтенд, бэкенд', 'Analyst, architect, frontend, backend'),
      },
      { label: pick('Срок', 'Year'), value: '2025' },
      {
        label: pick('Итог', 'Outcome'),
        value: pick(
          'Дашборд заменил ручную выгрузку в Excel: руководство и ИБ видят состояние инфраструктуры в одном месте',
          'The dashboard replaced manual Excel exports: management and security see the state of the infrastructure in one place',
        ),
      },
    ],
    intro: [
      {
        type: 'text',
        content: pick(
          'Дашборд для руководства, комплаенса и специалистов по информационной безопасности: метрики, риски и статусы процессов по всей инфраструктуре в одном окне.',
          'A dashboard for management, compliance, and information security specialists: metrics, risks, and process statuses across the whole infrastructure in one window.',
        ),
      },
      image('laptop-dashboard.png', pick('Дашборд для топ-менеджмента', 'Executive dashboard'), pick('Главный экран дашборда', 'Dashboard main screen')),
      image('laptop-dashboard-2.png', pick('Дашборд для топ-менеджмента, продолжение экрана', 'Executive dashboard, continued'), pick('Продолжение экрана дашборда', 'Dashboard screen, continued')),
    ],
    sections: [
      {
        heading: pick('Проблема', 'Problem'),
        blocks: [
          {
            type: 'list',
            items: pick(
              [
                'Отчёты собирали вручную: выгрузка в Excel, графики руками, на это уходили часы.',
                'Метрики лежали в разных системах, единого источника правды не было.',
                'Отклонения замечали с задержкой, потому что их не было видно сразу.',
              ],
              [
                'Reports were assembled by hand: Excel exports and manually built charts took hours.',
                'Metrics lived in different systems, with no single source of truth.',
                'Deviations were noticed late because they were not visible at a glance.',
              ],
            ),
          },
          image('manual-excel-process.png', pick('Старый процесс: ручная выгрузка в Excel', 'Old process: manual Excel export'), pick('Как было: ручная выгрузка и построение графиков', 'Before: manual export and chart building')),
        ],
      },
      {
        heading: pick('Что я сделал', 'What I did'),
        blocks: [
          {
            type: 'list',
            heading: pick('Разобрал процесс и аудиторию', 'Mapped the process and the audience'),
            items: pick(
              [
                'Изучил, как статистику собирали вручную, и какие источники данных нужно автоматизировать.',
                'Выделил три группы пользователей: руководство, комплаенс, ИБ. И четыре сценария: быстрая сводка, еженедельный разбор, обзор рисков, оперативный мониторинг.',
              ],
              [
                'Studied how statistics were collected by hand and which data sources had to be automated.',
                'Split users into three groups: management, compliance, security. And four scenarios: a quick summary, a weekly review, a risk overview, operational monitoring.',
              ],
            ),
          },
          {
            type: 'list',
            heading: pick('Построил навигацию от общего к частному', 'Built navigation from general to specific'),
            items: pick(
              [
                'От главных сущностей до авточеков по каждому сервису: с общей картины можно спуститься к причине отклонения.',
                'Сам определил, какие данные и авточеки показывать. Аналитик потом описал требования по моим макетам.',
                'Добавил фильтры и единый визуальный язык для уровней риска и статусов.',
              ],
              [
                'From the main entities down to autochecks per service: you can drop from the big picture to the cause of a deviation.',
                'I defined which data and autochecks to show. The analyst then wrote the requirements from my mockups.',
                'Added filters and one visual language for risk levels and statuses.',
              ],
            ),
          },
          image('table_filter.png', pick('Настройки таблицы', 'Table settings')),
          {
            type: 'list',
            heading: pick('Перевёл на единую дизайн-систему', 'Moved to the shared design system'),
            items: pick(
              [
                'Сервис начинался на Angular, но руководство потребовало перейти на общую B2B-систему на React.',
                'Вместе с командой дизайн-системы адаптировал компоненты под дашборд: карточки статистики, диаграммы, таблицы, статусы.',
              ],
              [
                'The service started on Angular, but management required a move to the shared B2B design system on React.',
                'With the design system team, I adapted components for the dashboard: stat cards, charts, tables, statuses.',
              ],
            ),
          },
        ],
      },
      {
        heading: pick('Для кого', 'Audience'),
        blocks: [
          {
            type: 'text',
            content: pick(
              'Дашборд закрывает задачи нескольких ролей, от администратора хоста до директора по ИБ.',
              'The dashboard serves several roles, from a host administrator to the head of security.',
            ),
          },
          {
            type: 'list',
            items: ROLE_IDS.map(
              (id) => `${getTranslation(language, `case.isy.roles.${id}.role` as TranslationKey)} — ${getTranslation(language, `case.isy.roles.${id}.tasks` as TranslationKey)}.`,
            ),
          },
        ],
      },
      {
        heading: pick('Экраны', 'Screens'),
        blocks: [
          { type: 'text', content: pick('Карточка сервиса.', 'Service card.') },
          image('service_card.png', pick('Карточка сервиса', 'Service card')),
          {
            type: 'text',
            content: pick(
              'Карточка требования собирает все его авточеки: статус и результат каждой проверки в одном месте.',
              'The requirement card gathers all of its autochecks: the status and result of each check in one place.',
            ),
          },
          image('autocheck_card.png', pick('Карточка требования', 'Requirement card')),
          image('autocheck_card_details.png', pick('Детали карточки требования', 'Requirement card details'), pick('Детали карточки требования', 'Requirement card details')),
          image('success.png', pick('Состояние: всё в порядке', 'All good state'), pick('Состояние «всё в порядке»', '"All good" state')),
          image('tooltips.png', pick('Интерактивные подсказки', 'Interactive tooltips'), pick('Интерактивные подсказки', 'Interactive tooltips')),
          image('global_filter.png', pick('Глобальная фильтрация', 'Global filters'), pick('Глобальная фильтрация', 'Global filters')),
        ],
      },
      {
        heading: pick('Результат', 'Outcome'),
        blocks: [
          {
            type: 'list',
            items: pick(
              [
                'Статистика по инфраструктуре собирается автоматически, ручной Excel больше не нужен.',
                'У руководства есть единое окно с данными по инфраструктуре.',
                'Комплаенс и ИБ быстрее находят отклонения: с общей картины можно дойти до конкретной проверки.',
                'Интерфейс совпадает с другими B2B-продуктами компании, поэтому пользователям проще привыкнуть.',
              ],
              [
                'Infrastructure statistics are collected automatically, manual Excel is no longer needed.',
                'Management has a single window onto infrastructure data.',
                'Compliance and security find deviations faster: from the big picture you can reach a specific check.',
                'The interface matches the company\'s other B2B products, so users adapt more easily.',
              ],
            ),
          },
        ],
      },
    ],
  }
}
