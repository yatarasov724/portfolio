import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getAgroChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const roleIds = ['farmer', 'agronomist', 'manager', 'fieldWorker', 'economist', 'analyst'] as const
  const teamRoles = [
    { key: 'agronomistConsultant', count: 1 },
    { key: 'gisAnalyst', count: 2 },
    { key: 'mlDeveloper', count: 1 },
    { key: 'projectManager', count: 1 },
    { key: 'productManager', count: 1 },
    { key: 'tester', count: 1 },
    { key: 'frontendDeveloper', count: 2 },
    { key: 'backendDeveloper', count: 2 },
    { key: 'devops', count: 1 },
    { key: 'systemArchitect', count: 1 },
  ] as const

  const IMG = '/cases/agro-platform/images'

  return {
    title: language === 'ru' ? 'Агроплатформа' : 'Agricultural platform',
    tags: ['B2B', 'AgTech', '2023–2024'],
    messages: [
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Расскажи про Агроплатформу' : 'Tell me about the agricultural platform' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Платформа для управления агропредприятием: поля, культуры, планирование работ, урожайность. Использует AI, спутниковые данные, метеорологическую информацию и телеметрию.'
              : 'A platform for managing agricultural enterprises: fields, crops, work planning, yields. Uses AI, satellite data, meteorological information, and telemetry.',
          },
          {
            type: 'image',
            src: `${IMG}/agro-platform-hero.png`,
            alt: language === 'ru' ? 'Агроплатформа' : 'Agricultural platform',
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
                  'Фермеры не имели единого инструмента для управления хозяйством и мониторинга культур.',
                  'Данные о состоянии полей и урожайности были разрознены.',
                  'Отсутствовала удобная визуализация сельскохозяйственных данных и аналитики.',
                  'Не было инструментов для планирования и прогнозирования урожайности.',
                ]
              : [
                  'Farmers had no unified tool for farm management and crop monitoring.',
                  'Field condition and yield data were fragmented.',
                  'There was no convenient visualization of agricultural data and analytics.',
                  'There were no tools for planning and yield forecasting.',
                ],
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
                  'Создать единую платформу для управления фермерским хозяйством.',
                  'Обеспечить мониторинг культур и состояния полей в реальном времени.',
                  'Предоставить аналитику и прогнозирование для принятия решений.',
                  'Упростить процессы планирования и управления сельскохозяйственными операциями.',
                ]
              : [
                  'Create a unified platform for farm management.',
                  'Provide real-time crop and field condition monitoring.',
                  'Provide analytics and forecasting for decision-making.',
                  'Simplify planning and agricultural operations management processes.',
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
            heading: language === 'ru' ? 'Исследование' : 'Research',
            items: language === 'ru'
              ? [
                  'Сегментировал аудиторию (фермеры, агрономы, управляющие) и зафиксировал их роли, цели и точки боли: разрозненные данные, планирование «в головах», отсутствие единой картины по полям и культурам.',
                  'Совместно с агрономом провёл интервью и наблюдал за реальными процессами: как принимают решения по севу и обработке, какие данные нужны в поле и в офисе, как работают с погодой и спутниковыми индексами.',
                ]
              : [
                  'Segmented the audience (farmers, agronomists, managers) and recorded their roles, goals, and pain points: fragmented data, planning "in their heads", no unified picture of fields and crops.',
                  'Together with an agronomist, conducted interviews and observed real processes: how sowing and treatment decisions are made, what data is needed in the field and office, how weather and satellite indices are used.',
                ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'А информационная архитектура?' : 'What about information architecture?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'Информационная архитектура' : 'Information architecture',
            items: language === 'ru'
              ? ['Выстроил структуру от целей пользователей: обзор хозяйства → поля и культуры → детали по полю (карты, индексы, погода, история) → планирование и аналитика.']
              : ['Built the structure from user goals: farm overview → fields and crops → field details (maps, indices, weather, history) → planning and analytics.'],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Валидировал с пользователями?' : 'Did you validate it with users?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'Валидация с пользователями' : 'User validation',
            items: language === 'ru'
              ? [
                  'Собрал обратную связь по эскизам и прототипам: интервью и демо с агрономом и стейкхолдерами, проверка сценариев и терминологии.',
                  'Презентовал функционал, зафиксировал правки по приоритетам и UX, встроил обратную связь в следующую итерацию структуры и прототипов.',
                ]
              : [
                  'Gathered feedback on sketches and prototypes: interviews and demos with the agronomist and stakeholders, checking scenarios and terminology.',
                  'Presented the functionality, recorded priority and UX edits, and incorporated feedback into the next iteration of structure and prototypes.',
                ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'А сам интерфейс и дизайн-система?' : 'What about the interface and design system?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            heading: language === 'ru' ? 'UI и дизайн-система' : 'UI and design system',
            items: language === 'ru'
              ? [
                  'Спроектировал и унифицировал компоненты: карточки полей, карты с индексами и слоями, графики, календари, дашборды — с учётом работы в поле (читаемость, контраст, понятная иерархия).',
                  'Масштабировал UI-набор в дизайн-систему платформы, чтобы новые экраны и фичи собирались из единых, переиспользуемых блоков.',
                ]
              : [
                  'Designed and unified components: field cards, maps with indices and layers, charts, calendars, dashboards — with field work in mind (readability, contrast, clear hierarchy).',
                  'Scaled the UI kit into a platform design system so new screens and features are assembled from unified, reusable blocks.',
                ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Какая у тебя была роль в команде?' : 'What was your role on the team?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Единственный продуктовый дизайнер в команде. Отвечал за пользовательское исследование, информационную архитектуру, дизайн интерфейсов, дизайн-систему и валидацию решений с пользователями.'
              : 'The only product designer on the team. Responsible for user research, information architecture, interface design, the design system, and validating solutions with users.',
          },
          {
            type: 'chips',
            items: teamRoles.map((r) => {
              const label = t(`case.agro.team.${r.key}` as TranslationKey)
              return r.count > 1 ? `${label} (${r.count})` : label
            }),
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Для кого именно платформа?' : 'Who exactly is the platform for?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            items: roleIds.map(
              (id) => `${t(`case.agro.roles.${id}.role` as TranslationKey)} — ${t(`case.agro.roles.${id}.tasks` as TranslationKey)}.`
            ),
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Что получилось спроектировать?' : 'What did you end up designing?' }],
      },
      {
        role: 'author',
        blocks: [
          { type: 'text', content: language === 'ru' ? 'Пять модулей платформы:' : 'Five modules of the platform:' },
          {
            type: 'chips',
            items: language === 'ru'
              ? ['Управление полями (карта + NDVI/EVI/NDMI)', 'Мониторинг культур', 'Технологические карты (Гант)', 'Телеметрия техники', 'AI-ассистент']
              : ['Field management (map + NDVI/EVI/NDMI)', 'Crop monitoring', 'Technology cards (Gantt)', 'Machinery telemetry', 'AI assistant'],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Покажи управление полями подробнее' : 'Show me field management in more detail' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Комплексный анализ состояния полей на основе спутниковых данных. Визуализация вегетационных индексов (NDVI, EVI, NDMI) для оценки здоровья культур. Интерактивная карта с переключением слоёв и метеоданными.'
              : 'Comprehensive field condition analysis based on satellite data. Vegetation index visualization (NDVI, EVI, NDMI) for assessing crop health. Interactive map with layer switching and meteorological data.',
          },
          {
            type: 'image',
            src: `${IMG}/fields-management.png`,
            alt: language === 'ru' ? 'Управление полями' : 'Field management',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Детальная информационная панель поля: вегетация, влажность почвы, прогноз урожайности, культура и сорт, прогноз погоды на неделю, окна для внесения средств защиты растений.'
              : 'Detailed field info panel: vegetation, soil moisture, yield forecast, crop and variety, weekly weather forecast, plant protection windows.',
          },
          {
            type: 'image',
            src: `${IMG}/fields-management2.png`,
            alt: language === 'ru' ? 'Детальный анализ индексов поля' : 'Detailed field index analysis',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Графики для анализа показателей в динамике: индекс вегетации, влажность почвы, эффективные температуры и осадки — для оценки состояния поля и принятия решений.'
              : 'Charts for analyzing indicators over time: vegetation index, soil moisture, effective temperatures and precipitation — for field condition assessment and decisions.',
          },
          {
            type: 'image',
            src: `${IMG}/fields-management3.png`,
            alt: language === 'ru' ? 'Метеорологические данные и слои карты' : 'Meteorological data and map layers',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Что ещё входит в платформу?' : 'What else is part of the platform?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Планирование севооборота: агроном видит полную схему чередования культур по каждому полю — культуру, дату сева, дату уборки и урожайность за гектар.'
              : 'Crop rotation planning: the agronomist sees the complete crop rotation scheme for each field — crop, sowing date, harvest date, and yield per hectare.',
          },
          {
            type: 'image',
            src: `${IMG}/crop-monitoring.png`,
            alt: language === 'ru' ? 'Мониторинг культур' : 'Crop monitoring',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Визуализация и планирование работ по культуре в виде диаграммы Ганта: временные рамки операций, последовательность обработок, планирование техники.'
              : 'Visualization and planning of crop operations as a Gantt chart: operation timeframes, treatment sequences, machinery planning.',
          },
          {
            type: 'image',
            src: `${IMG}/gantt.png`,
            alt: language === 'ru' ? 'Технологические карты' : 'Technology cards',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Телеметрия: отслеживание техники в реальном времени и исторически — статус, местоположение и данные о работе для контроля использования оборудования.'
              : 'Telemetry: real-time and historical machinery tracking — status, location, and operational data for controlling equipment usage.',
          },
          {
            type: 'image',
            src: `${IMG}/planning-calendar.png`,
            alt: language === 'ru' ? 'Календарь планирования работ' : 'Work planning calendar',
            caption: language === 'ru' ? 'Календарь планирования работ' : 'Work planning calendar',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'AI-ассистент отвечает на вопросы по агрономии: консультации, рекомендации и разъяснения по состоянию полей и планированию работ.'
              : 'AI assistant answers agronomy questions: consultations, recommendations, and explanations on field conditions and work planning.',
          },
          {
            type: 'image',
            src: `${IMG}/ai.png`,
            alt: language === 'ru' ? 'AI-ассистент' : 'AI assistant',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'И что в итоге получилось?' : 'And what came out of it in the end?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'list',
            items: language === 'ru'
              ? [
                  'Фермеры получили единую платформу для управления хозяйством.',
                  'Улучшилась видимость состояния полей и культур.',
                  'Появилась возможность аналитики и прогнозирования для принятия решений.',
                  'Интерфейс стал интуитивным и удобным для работы в полевых условиях.',
                ]
              : [
                  'Farmers got a unified platform for farm management.',
                  'Visibility of field and crop conditions improved.',
                  'Analytics and forecasting capabilities appeared for decision-making.',
                  'The interface became intuitive and convenient for work in field conditions.',
                ],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Кейс: мониторинг инфраструктуры →' : 'Case: infrastructure monitoring →', href: '/cases/infrastructure-monitoring' },
      { label: language === 'ru' ? 'Обо мне →' : 'About me →', href: '/' },
    ],
  }
}
