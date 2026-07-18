import type { ChatScript } from '@/lib/chat/types'

export function getAgroChat(language: 'en' | 'ru'): ChatScript {
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
            src: '/cases/agro-platform/images/agro-platform-hero.png',
            alt: language === 'ru' ? 'Агроплатформа' : 'Agricultural platform',
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
            type: 'text',
            content: language === 'ru'
              ? 'Сегментировал аудиторию — фермеры, агрономы, управляющие. Вместе с агрономом провёл интервью и наблюдал за реальными процессами: как принимают решения по севу и обработке, какие данные нужны в поле и в офисе.'
              : 'I segmented the audience — farmers, agronomists, managers. Together with an agronomist, I conducted interviews and observed real processes: how sowing and treatment decisions are made, what data is needed in the field and in the office.',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Сформулировал ключевые сценарии первой итерации, опираясь на критичные для сезона задачи: мониторинг полей, планирование работ, анализ урожайности.'
              : 'I formulated the key scenarios for the first iteration, based on season-critical tasks: field monitoring, work planning, yield analysis.',
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
          {
            type: 'image',
            src: '/cases/agro-platform/images/fields-management.png',
            alt: language === 'ru' ? 'Управление полями' : 'Field management',
          },
          {
            type: 'image',
            src: '/cases/agro-platform/images/gantt.png',
            alt: language === 'ru' ? 'Технологические карты' : 'Technology cards',
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
            type: 'text',
            content: language === 'ru'
              ? 'Собрал обратную связь по эскизам и прототипам: интервью и демо с агрономом и стейкхолдерами, проверка сценариев и терминологии. Встроил правки в следующую итерацию структуры и прототипов.'
              : 'I gathered feedback on sketches and prototypes: interviews and demos with the agronomist and stakeholders, checking scenarios and terminology. I incorporated the changes into the next iteration of the structure and prototypes.',
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
