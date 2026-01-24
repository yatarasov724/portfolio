export const getTimelineSteps = (language: 'en' | 'ru') => {
  if (language === 'en') {
    return [
      {
        title: '01. Research and Analysis',
        items: [
          'Studied the current statistics collection process: manual Excel exports, manual chart building, report generation time — several hours.',
          'Analyzed infrastructure data sources and the metrics system that needed to be automated.',
          'Segmented the target audience: C-level, compliance, security team.',
          'Defined key use cases: quick access to infrastructure statistics, weekly review, risk overview, operational monitoring.'
        ]
      },
      {
        title: '02. Information Architecture',
        items: [
          'Built a structure from general to specific: starting with main general entities, ending with detailed autochecks for each service.',
          'Designed the logic for automatic data collection and visualization, replacing the manual Excel process.',
          'Designed a filter system and hierarchical structure for detailed viewing and data analysis.',
          'Defined visual language for risk levels and infrastructure statuses.'
        ]
      },
      {
        title: '03. Interface',
        items: [
          'Initially, the service was developed on Angular, but due to management requirements, there was a task to switch to a unified B2B design system on React.',
          'Together with the design system team, adapted existing components to the dashboard specifics: statistics cards, charts, tables, and infrastructure statuses.',
          'Style: strict, corporate, readable, data-oriented. Consistency with other B2B company products ensured quick user adaptation.'
        ]
      }
    ]
  }
  
  return [
    {
      title: '01. Исследование и анализ',
      items: [
        'Изучил текущий процесс сбора статистики: ручная выгрузка в Excel, построение графиков вручную, время генерации отчётов — несколько часов.',
        'Проанализировал источники данных инфраструктуры и систему метрик, которые нужно автоматизировать.',
        'Сегментировал целевую аудиторию: C-level, комплаенс, security-team.',
        'Определил ключевые сценарии использования: быстрый доступ к статистике инфраструктуры, weekly review, risk overview, operational monitoring.'
      ]
    },
    {
      title: '02. Информационная архитектура',
      items: [
        'Построил структуру от общего к частному: начиная с главных общих сущностей, заканчивая детализированными авточеками по каждому сервису.',
        'Спроектировал логику автоматического сбора данных и визуализации, заменившую ручной процесс в Excel.',
        'Спроектировал систему фильтров и иерархическую структуру для детального просмотра и анализа данных.',
        'Определил визуальный язык для уровней риска и статусов инфраструктуры.'
      ]
    },
    {
      title: '03. Интерфейс',
      items: [
        'Изначально сервис разрабатывался на Angular, но в связи с требованиями руководства стояла задача перейти на единую B2B дизайн-систему на React.',
        'Вместе с командой дизайн-системы адаптировал существующие компоненты под специфику дашборда: карточки статистики, диаграммы, таблицы и статусы инфраструктуры.',
        'Стиль: строгий, корпоративный, читаемый, ориентированный на данные. Единообразие с другими B2B продуктами компании обеспечило быструю адаптацию пользователей.'
      ]
    }
  ]
}
