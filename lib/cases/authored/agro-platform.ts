import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatBlock } from '@/lib/chat/types'
import type { CaseContent, Language } from '../types'

const IMG = '/cases/agro-platform/images'
const ROLE_IDS = ['farmer', 'agronomist', 'manager', 'fieldWorker', 'economist', 'analyst'] as const

export function getAgroPlatformCase(language: Language): CaseContent {
  const ru = language === 'ru'
  const pick = <T,>(ruValue: T, enValue: T): T => (ru ? ruValue : enValue)
  const image = (file: string, alt: string, caption?: string): ChatBlock => ({
    type: 'image',
    src: `${IMG}/${file}`,
    alt,
    ...(caption ? { caption } : {}),
  })

  return {
    title: pick('Агроплатформа', 'Agricultural platform'),
    tags: pick(['B2B', 'Агротех', '2023–2024'], ['B2B', 'AgTech', '2023–2024']),
    facts: [
      {
        label: pick('Роль', 'Role'),
        value: pick(
          'Единственный продуктовый дизайнер. Исследование, структура, интерфейсы, дизайн-система, проверка решений с пользователями',
          'Sole product designer. Research, structure, interfaces, the design system, validating solutions with users',
        ),
      },
      {
        label: pick('Команда', 'Team'),
        value: pick(
          'Около 14 человек: агроном-консультант, GIS-аналитики, ML, проджект и продакт, тестировщик, фронтенд, бэкенд, DevOps, архитектор',
          'About 14 people: agronomist consultant, GIS analysts, ML, project and product managers, tester, frontend, backend, DevOps, architect',
        ),
      },
      { label: pick('Срок', 'Years'), value: '2023–2024' },
      {
        label: pick('Итог', 'Outcome'),
        value: pick(
          'Платформа из пяти модулей: поля, культуры, технологические карты, телеметрия и AI-ассистент',
          'A platform of five modules: fields, crops, technology cards, telemetry, and an AI assistant',
        ),
      },
    ],
    intro: [
      {
        type: 'text',
        content: pick(
          'Платформа для управления агропредприятием: поля, культуры, планирование работ, урожайность. Использует AI, спутниковые данные, метеорологию и телеметрию.',
          'A platform for managing an agricultural enterprise: fields, crops, work planning, yields. It uses AI, satellite data, meteorology, and telemetry.',
        ),
      },
      image('agro-platform-hero.png', pick('Агроплатформа', 'Agricultural platform')),
    ],
    sections: [
      {
        heading: pick('Проблема', 'Problem'),
        blocks: [
          {
            type: 'list',
            items: pick(
              [
                'У фермеров не было единого инструмента: данные о полях и урожайности были разрознены.',
                'Планирование работ велось «в головах», общей картины по полям и культурам не было.',
                'Не было удобной визуализации и инструментов прогноза урожайности.',
              ],
              [
                'Farmers had no single tool: data on fields and yields was scattered.',
                'Work was planned "in people\'s heads", with no overall picture of fields and crops.',
                'There was no convenient visualization and no tools for yield forecasting.',
              ],
            ),
          },
        ],
      },
      {
        heading: pick('Что я сделал', 'What I did'),
        blocks: [
          {
            type: 'list',
            heading: pick('Разобрался в предметной области', 'Learned the domain'),
            items: pick(
              [
                'Разделил аудиторию на фермеров, агрономов и управляющих, зафиксировал их роли, цели и боли.',
                'Вместе с агрономом провёл интервью и наблюдал за работой: как принимают решения по севу и обработке, какие данные нужны в поле и в офисе, как используют погоду и спутниковые индексы.',
              ],
              [
                'Split the audience into farmers, agronomists, and managers and recorded their roles, goals, and pain points.',
                'With an agronomist, ran interviews and observed the work: how sowing and treatment decisions are made, what data is needed in the field and in the office, how weather and satellite indices are used.',
              ],
            ),
          },
          {
            type: 'list',
            heading: pick('Построил структуру от целей пользователя', 'Built the structure around user goals'),
            items: pick(
              [
                'Обзор хозяйства → поля и культуры → детали поля (карты, индексы, погода, история) → планирование и аналитика.',
                'Проверял эскизы и прототипы на агрономе и стейкхолдерах: сценарии и терминологию. Правки по приоритетам попадали в следующую итерацию.',
              ],
              [
                'Farm overview → fields and crops → field details (maps, indices, weather, history) → planning and analytics.',
                'Tested sketches and prototypes with the agronomist and stakeholders: scenarios and terminology. Priority edits went into the next iteration.',
              ],
            ),
          },
          {
            type: 'list',
            heading: pick('Собрал дизайн-систему', 'Built the design system'),
            items: pick(
              [
                'Унифицировал компоненты: карточки полей, карты со слоями и индексами, графики, календари, дашборды. С расчётом на работу в поле: читаемость, контраст, понятная иерархия.',
                'Развил набор в дизайн-систему платформы, чтобы новые экраны собирались из одних и тех же блоков.',
              ],
              [
                'Unified components: field cards, maps with layers and indices, charts, calendars, dashboards. Built for work in the field: readability, contrast, clear hierarchy.',
                'Grew the set into a platform design system so new screens are assembled from the same blocks.',
              ],
            ),
          },
        ],
      },
      {
        heading: pick('Для кого', 'Audience'),
        blocks: [
          {
            type: 'list',
            items: ROLE_IDS.map(
              (id) => `${getTranslation(language, `case.agro.roles.${id}.role` as TranslationKey)} — ${getTranslation(language, `case.agro.roles.${id}.tasks` as TranslationKey)}.`,
            ),
          },
        ],
      },
      {
        heading: pick('Экраны', 'Screens'),
        blocks: [
          {
            type: 'chips',
            items: pick(
              ['Управление полями (карта + NDVI/EVI/NDMI)', 'Мониторинг культур', 'Технологические карты (Гант)', 'Телеметрия техники', 'AI-ассистент'],
              ['Field management (map + NDVI/EVI/NDMI)', 'Crop monitoring', 'Technology cards (Gantt)', 'Machinery telemetry', 'AI assistant'],
            ),
          },
          {
            type: 'text',
            content: pick(
              'Управление полями. Состояние полей по спутниковым данным: индексы вегетации (NDVI, EVI, NDMI), интерактивная карта со слоями и метеоданными.',
              'Field management. Field condition from satellite data: vegetation indices (NDVI, EVI, NDMI), an interactive map with layers and weather data.',
            ),
          },
          image('fields-management.png', pick('Управление полями', 'Field management')),
          {
            type: 'text',
            content: pick(
              'Панель поля: вегетация, влажность почвы, прогноз урожайности, культура и сорт, погода на неделю, окна для внесения средств защиты растений.',
              'Field panel: vegetation, soil moisture, yield forecast, crop and variety, a weekly forecast, windows for plant protection treatments.',
            ),
          },
          image('fields-management2.png', pick('Детальный анализ индексов поля', 'Detailed field index analysis')),
          {
            type: 'text',
            content: pick(
              'Графики в динамике: индекс вегетации, влажность почвы, эффективные температуры и осадки.',
              'Charts over time: vegetation index, soil moisture, effective temperatures, and precipitation.',
            ),
          },
          image('fields-management3.png', pick('Метеорологические данные и слои карты', 'Meteorological data and map layers')),
          {
            type: 'text',
            content: pick(
              'Мониторинг культур. Севооборот по каждому полю: культура, дата сева, дата уборки и урожайность с гектара.',
              'Crop monitoring. Crop rotation for each field: crop, sowing date, harvest date, and yield per hectare.',
            ),
          },
          image('crop-monitoring.png', pick('Мониторинг культур', 'Crop monitoring')),
          {
            type: 'text',
            content: pick(
              'Технологические карты. Диаграмма Ганта: сроки операций, последовательность обработок, планирование техники.',
              'Technology cards. A Gantt chart: operation timeframes, treatment sequences, machinery planning.',
            ),
          },
          image('gantt.png', pick('Технологические карты', 'Technology cards')),
          {
            type: 'text',
            content: pick(
              'Телеметрия. Техника в реальном времени и по истории: статус, местоположение, данные о работе.',
              'Telemetry. Machinery in real time and historically: status, location, and operational data.',
            ),
          },
          image('planning-calendar.png', pick('Календарь планирования работ', 'Work planning calendar'), pick('Календарь планирования работ', 'Work planning calendar')),
          {
            type: 'text',
            content: pick(
              'AI-ассистент. Отвечает на вопросы по агрономии: рекомендации по состоянию полей и планированию работ.',
              'AI assistant. Answers agronomy questions: recommendations on field conditions and work planning.',
            ),
          },
          image('ai.png', pick('AI-ассистент', 'AI assistant')),
        ],
      },
      {
        heading: pick('Результат', 'Outcome'),
        blocks: [
          {
            type: 'list',
            items: pick(
              [
                'У хозяйства появилась единая платформа вместо разрозненных данных.',
                'Состояние полей и культур видно в одном месте: по спутниковым данным, погоде и истории поля.',
                'Появились аналитика и прогноз урожайности для решений по севу и обработке.',
                'Новые экраны собираются из готовых компонентов дизайн-системы.',
              ],
              [
                'The farm has one platform instead of scattered data.',
                'Field and crop condition is visible in one place: from satellite data, weather, and field history.',
                'Analytics and yield forecasts support decisions on sowing and treatment.',
                'New screens are assembled from ready design system components.',
              ],
            ),
          },
        ],
      },
    ],
  }
}
