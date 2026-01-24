export const getFunctionsData = (language: 'en' | 'ru') => {
  if (language === 'en') {
    return {
      title: 'Functions Overview',
      sections: [
        {
          title: 'Field Management',
          description: 'Comprehensive field condition analysis based on satellite data. Vegetation index visualization (NDVI, EVI, NDMI) for assessing crop health and productivity. Interactive map with layer switching and meteorological data for informed decision-making.',
          details: [
            'Detailed field information panel with vegetation data, soil moisture, yield forecast, crop and variety, weekly weather forecast, plant protection windows, and prescription maps.',
            'Charts for analyzing indicators over time: vegetation index, soil moisture, effective temperatures and precipitation. Trend and change visualization for field condition assessment and decision-making.',
          ]
        },
        {
          title: 'Crop Monitoring',
          description: 'Crop rotation planning with farm-wide visualization. Agronomist sees complete crop rotation scheme for each field: crop, sowing date, harvest date, and yield per hectare for optimizing long-term farm strategy.'
        },
        {
          title: 'Technology Cards',
          description: 'Visualization and planning of crop operations as a Gantt chart. Agronomist sees operation timeframes, treatment sequences, can plan machinery use and control work execution for each field. Allows schedule optimization and avoids resource conflicts.'
        },
        {
          title: 'Telemetry',
          description: 'Real-time and historical tracking of registered machinery. View machinery status, location, and operational data for monitoring and optimizing agricultural equipment usage.'
        },
        {
          title: 'AI Assistant',
          description: 'AI assistant section that can answer any agronomy questions. Helps users get consultations, recommendations, and explanations on platform usage, field conditions, work planning, and other agricultural aspects.'
        }
      ]
    }
  }
  
  return {
    title: 'Обзор функций',
    sections: [
      {
        title: 'Управление полями',
        description: 'Комплексный анализ состояния полей на основе спутниковых данных. Визуализация вегетационных индексов (NDVI, EVI, NDMI) для оценки здоровья культур и продуктивности. Интерактивная карта с переключением слоев и метеорологическими данными для принятия обоснованных решений.',
        details: [
          'Детальная информационная панель поля с данными о вегетации, влажности почвы, прогнозе урожайности, культуре и сорте, прогнозом погоды на неделю, окнами для внесения средств защиты растений и картами предписаний.',
          'Графики для анализа показателей в динамике времени: индекс вегетации, влажность почвы, эффективные температуры и осадки. Визуализация трендов и изменений для оценки состояния поля и принятия решений.',
        ]
      },
      {
        title: 'Мониторинг культур',
        description: 'Планирование севооборота с визуализацией всей картины хозяйства. Агроном видит полную схему чередования культур по каждому полю: культуру, дату сева, дату высева и урожайность за гектар для оптимизации долгосрочной стратегии хозяйства.'
      },
      {
        title: 'Технологические карты',
        description: 'Визуализация и планирование работ по культуре в виде диаграммы Ганта. Агроном видит временные рамки операций, последовательность обработок, может планировать использование техники и контролировать выполнение работ по каждому полю. Позволяет оптимизировать расписание и избегать конфликтов в использовании ресурсов.'
      },
      {
        title: 'Телеметрия',
        description: 'Отслеживание добавленной техники в реальном времени и исторически. Просмотр статуса техники, местоположения и данных о работе для контроля и оптимизации использования сельскохозяйственного оборудования.'
      },
      {
        title: 'AI-ассистент',
        description: 'Раздел с AI-ассистентом, который может ответить на любые вопросы по агрономии. Помогает пользователям получать консультации, рекомендации и разъяснения по работе с платформой, состоянию полей, планированию работ и другим аспектам сельскохозяйственной деятельности.'
      }
    ]
  }
}
