export const getTimelineSteps = (language: 'en' | 'ru') => {
  if (language === 'en') {
    return [
      {
        title: '01. Research',
        items: [
          'Segmented the audience (farmers, agronomists, managers) and recorded their roles, goals, and pain points: fragmented data, planning "in heads", lack of unified picture of fields and crops.',
          'Together with an agronomist, conducted interviews and observed real processes: how decisions are made about sowing and processing, what data is needed in the field and office, how they work with weather and satellite indices.',
          'Formulated key scenarios and basic functionality for the first iteration, based on season-critical tasks: field monitoring, work planning, yield analysis.'
        ]
      },
      {
        title: '02. Information Architecture',
        items: [
          'Built structure from user goals: farm overview → fields and crops → field details (maps, indices, weather, history) → planning and analytics.'
        ]
      },
      {
        title: '03. Analysis and Prioritization',
        items: [
          'Conducted comparative analysis of analogues and solutions in AgTech: what users are already solving, what patterns are familiar, where there are gaps.',
          'Prioritized backlog for the first release: fixed the scope of the first iteration and "done" criteria for each block.',
          'Broke down key scenarios into descriptions and screen requirements so that validation and design were based on the same assumptions.'
        ]
      },
      {
        title: '04. User Validation',
        items: [
          'Collected feedback on sketches and prototypes: interviews and demos with agronomist and stakeholders, verification of scenarios and terminology.',
          'Presented functionality, recorded edits on priorities and UX, built feedback into the next iteration of structure and prototypes.'
        ]
      },
      {
        title: '05. UI and Design System',
        items: [
          'Designed and unified components: field cards, maps with indices and layers, charts, calendars, dashboards — considering field work (readability, contrast, clear hierarchy).',
          'Scaled UI kit into platform design system so that new screens and features are built from unified, reusable blocks.'
        ]
      }
    ]
  }
  
  return [
    {
      title: '01. Исследование',
      items: [
        'Сегментировал аудиторию (фермеры, агрономы, управляющие) и зафиксировал их роли, цели и точки боли: разрозненные данные, планирование «в головах», отсутствие единой картины по полям и культурам.',
        'Совместно с агрономом провёл интервью и наблюдал за реальными процессами: как принимают решения по севу и обработке, какие данные нужны в поле и в офисе, как работают с погодой и спутниковыми индексами.',
        'Сформулировал ключевые сценарии и базовый функционал первой итерации, опираясь на критичные для сезона задачи: мониторинг полей, планирование работ, анализ урожайности.'
      ]
    },
    {
      title: '02. Информационная архитектура',
      items: [
        'Выстроил структуру от целей пользователей: обзор хозяйства → поля и культуры → детали по полю (карты, индексы, погода, история) → планирование и аналитика.'
      ]
    },
    {
      title: '03. Анализ и приоритизация',
      items: [
        'Провёл сравнительный анализ аналогов и решений в AgTech: что уже решают пользователи, какие паттерны привычны, где есть разрывы.',
        'Приоритизировал бэклог под первый релиз: зафиксировал объём первой итерации и критерии «готово» для каждого блока.',
        'Разложил ключевые сценарии на описания и требования к экранам, чтобы валидация и дизайн опирались на одни и те же допущения.'
      ]
    },
    {
      title: '04. Валидация с пользователями',
      items: [
        'Собрал обратную связь по эскизам и прототипам: интервью и демо с агрономом и стейкхолдерами, проверка сценариев и терминологии.',
        'Презентовал функционал, зафиксировал правки по приоритетам и UX, встроил обратную связь в следующую итерацию структуры и прототипов.'
      ]
    },
    {
      title: '05. UI и дизайн‑система',
      items: [
        'Спроектировал и унифицировал компоненты: карточки полей, карты с индексами и слоями, графики, календари, дашборды — с учётом работы в поле (читаемость, контраст, понятная иерархия).',
        'Масштабировал UI‑набор в дизайн‑систему платформы, чтобы новые экраны и фичи собирались из единых, переиспользуемых блоков.'
      ]
    }
  ]
}
