export type TranslationKey = 
  // Navigation
  | 'nav.about'
  | 'nav.skills'
  | 'nav.projects'
  | 'nav.contact'
  // Hero
  | 'hero.title'
  | 'hero.description'
  // About
  | 'about.title'
  | 'about.paragraph1'
  | 'about.paragraph2'
  | 'about.paragraph3'
  | 'about.paragraph1.company'
  // Skills
  | 'skills.title'
  | 'skills.productDesign.title'
  | 'skills.productDesign.description'
  | 'skills.designSystems.title'
  | 'skills.designSystems.description'
  | 'skills.processes.title'
  | 'skills.processes.description'
  // Projects
  | 'projects.title'
  | 'projects.productRoadmap.title'
  | 'projects.productRoadmap.description'
  | 'projects.productRoadmap.domain'
  | 'projects.isy.title'
  | 'projects.isy.description'
  | 'projects.isy.domain'
  | 'projects.agro.title'
  | 'projects.agro.description'
  | 'projects.agro.domain'
  // Contact
  | 'contact.title'
  | 'contact.description'
  | 'contact.telegram'
  | 'contact.linkedin'
  // Project Card
  | 'projectCard.protected'
  | 'projectCard.comingSoon'
  | 'projectCard.comingSoonDescription'
  | 'projectCard.passwordModal.title'
  | 'projectCard.passwordModal.description'
  | 'projectCard.passwordModal.placeholder'
  | 'projectCard.passwordModal.error'
  | 'projectCard.passwordModal.checking'
  | 'projectCard.passwordModal.submit'
  | 'projectCard.passwordModal.cancel'
  // Case Studies - Common
  | 'case.cta.title'
  | 'case.cta.description'
  | 'case.cta.viewOtherProjects'
  | 'case.cta.telegram'
  // Case Studies - Sections
  | 'case.sections.process'
  | 'case.sections.results'
  | 'case.sections.roles'
  | 'case.sections.overview'
  | 'case.sections.functions'
  | 'case.sections.myRole'
  | 'case.sections.team'
  | 'case.sections.mainTasks'
  | 'case.sections.expectedResults'
  | 'case.sections.serviceCard'
  | 'case.sections.requirementCard'
  | 'case.sections.additionalScreens'
  | 'case.sections.allGoodState'
  | 'case.sections.interactiveTooltips'
  | 'case.sections.globalFilters'
  | 'case.sections.tableSettings'
  | 'case.sections.roadmapOverview'
  | 'case.sections.teamComposition'
  | 'case.sections.oldProcess'
  | 'case.sections.oldInterface'
  // ISY Roles
  | 'case.isy.roles.hostAdmin.role'
  | 'case.isy.roles.hostAdmin.tasks'
  | 'case.isy.roles.hostAdmin.results'
  | 'case.isy.roles.securitySpecialist.role'
  | 'case.isy.roles.securitySpecialist.tasks'
  | 'case.isy.roles.securitySpecialist.results'
  | 'case.isy.roles.departmentHead.role'
  | 'case.isy.roles.departmentHead.tasks'
  | 'case.isy.roles.departmentHead.results'
  | 'case.isy.roles.itOperator.role'
  | 'case.isy.roles.itOperator.tasks'
  | 'case.isy.roles.itOperator.results'
  | 'case.isy.roles.auditor.role'
  | 'case.isy.roles.auditor.tasks'
  | 'case.isy.roles.auditor.results'
  | 'case.isy.roles.developer.role'
  | 'case.isy.roles.developer.tasks'
  | 'case.isy.roles.developer.results'
  | 'case.isy.roles.ciso.role'
  | 'case.isy.roles.ciso.tasks'
  | 'case.isy.roles.ciso.results'
  | 'case.isy.roles.processManager.role'
  | 'case.isy.roles.processManager.tasks'
  | 'case.isy.roles.processManager.results'
  // Agro Roles
  | 'case.agro.hero.headline'
  | 'case.agro.hero.subheadline'
  | 'case.agro.roles.farmer.role'
  | 'case.agro.roles.farmer.tasks'
  | 'case.agro.roles.farmer.results'
  | 'case.agro.roles.agronomist.role'
  | 'case.agro.roles.agronomist.tasks'
  | 'case.agro.roles.agronomist.results'
  | 'case.agro.roles.manager.role'
  | 'case.agro.roles.manager.tasks'
  | 'case.agro.roles.manager.results'
  | 'case.agro.roles.fieldWorker.role'
  | 'case.agro.roles.fieldWorker.tasks'
  | 'case.agro.roles.fieldWorker.results'
  | 'case.agro.roles.economist.role'
  | 'case.agro.roles.economist.tasks'
  | 'case.agro.roles.economist.results'
  | 'case.agro.roles.analyst.role'
  | 'case.agro.roles.analyst.tasks'
  | 'case.agro.roles.analyst.results'
  // Agro Team
  | 'case.agro.team.productDesigner'
  | 'case.agro.team.agronomistConsultant'
  | 'case.agro.team.gisAnalyst'
  | 'case.agro.team.mlDeveloper'
  | 'case.agro.team.projectManager'
  | 'case.agro.team.productManager'
  | 'case.agro.team.tester'
  | 'case.agro.team.frontendDeveloper'
  | 'case.agro.team.backendDeveloper'
  | 'case.agro.team.devops'
  | 'case.agro.team.systemArchitect'

export const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    // Hero
    'hero.title': 'Yaroslav Tarasov',
    'hero.description': 'Product Designer, specializing in B2B products and complex systems. I create interfaces that make complex workflows easier and team work more efficient.',
    // About
    'about.title': 'About',
    'about.paragraph1': 'Product Designer with over 5 years of experience. I specialize in B2B products, complex systems, and enterprise tools. Previously worked at T1, currently working at Kaspersky Lab, where I design interfaces for dashboards, internal platforms, and applications with large data volumes.',
    'about.paragraph1.company': 'Kaspersky Lab',
    'about.paragraph2': 'My main goal is to create structured and scalable UX for systems where clarity matters.',
    'about.paragraph3': 'I\'m used to working closely with product managers, developers, and stakeholders to align solutions and ensure technical feasibility. I create and maintain design systems, working with development teams on interface implementation.',
    // Skills
    'skills.title': 'Skills & Focus',
    'skills.productDesign.title': 'Product Design',
    'skills.productDesign.description': 'Designing interfaces for enterprise systems, dashboards, and applications with large data volumes',
    'skills.designSystems.title': 'Design Systems',
    'skills.designSystems.description': 'Creating and maintaining component libraries for scalable product development',
    'skills.processes.title': 'Processes',
    'skills.processes.description': 'Working with stakeholders, coordinating between teams, and designing internal tools',
    // Projects
    'projects.title': 'Projects',
    'projects.productRoadmap.title': 'Product Roadmap',
    'projects.productRoadmap.description': 'Tool for release coordination and annual service planning. A unified tool to simplify coordination between teams, avoid conflicts in release cards, and increase process transparency.',
    'projects.productRoadmap.domain': 'Product Management',
    'projects.isy.title': 'Executive Dashboard',
    'projects.isy.description': 'Dashboard for executive management and information security team. A unified window of metrics, risks, and process statuses for quick access to real-time infrastructure statistics.',
    'projects.isy.domain': 'Security & Analytics',
    'projects.agro.title': 'AI-Powered Agricultural Platform',
    'projects.agro.description': 'Platform for managing agricultural enterprises that allows managing fields, monitoring crop conditions, planning work, and analyzing yields. Uses AI, satellite data, meteorological information, and telemetry.',
    'projects.agro.domain': 'AgTech',
    // Contact
    'contact.title': 'Ready to help with your project',
    'contact.description': 'Let\'s discuss how I can help create an interface that solves your challenges.',
    'contact.telegram': 'Message on Telegram',
    'contact.linkedin': 'LinkedIn',
    // Project Card
    'projectCard.protected': 'Protected',
    'projectCard.comingSoon': 'Coming Soon',
    'projectCard.comingSoonDescription': 'Detailed case study with work process, insights, and results is being prepared for publication',
    'projectCard.passwordModal.title': 'Case Access',
    'projectCard.passwordModal.description': 'This case is password protected. Enter the password to access.',
    'projectCard.passwordModal.placeholder': 'Enter password',
    'projectCard.passwordModal.error': 'Incorrect password. Please try again.',
    'projectCard.passwordModal.checking': 'Checking...',
    'projectCard.passwordModal.submit': 'Enter',
    'projectCard.passwordModal.cancel': 'Cancel',
    // Case Studies - Common
    'case.cta.title': 'Have questions about the project?',
    'case.cta.description': 'Let\'s discuss project details or check out other case studies from my portfolio',
    'case.cta.viewOtherProjects': 'View other projects',
    'case.cta.telegram': 'Message on Telegram',
    // Case Studies - Sections
    'case.sections.process': 'Process',
    'case.sections.results': 'Results',
    'case.sections.roles': 'User Roles',
    'case.sections.overview': 'Overview',
    'case.sections.functions': 'Features Overview',
    'case.sections.myRole': 'My Role',
    'case.sections.team': 'Team',
    'case.sections.mainTasks': 'Main Tasks',
    'case.sections.expectedResults': 'Expected Results',
    'case.sections.serviceCard': 'Service Card',
    'case.sections.requirementCard': 'Requirement Card',
    'case.sections.additionalScreens': 'Additional Screens and Features',
    'case.sections.allGoodState': 'All Good State',
    'case.sections.interactiveTooltips': 'Interactive Tooltips',
    'case.sections.globalFilters': 'Global Filters',
    'case.sections.tableSettings': 'Table Settings',
    'case.sections.roadmapOverview': 'Roadmap Overview',
    'case.sections.teamComposition': 'Team Composition',
    'case.sections.oldProcess': 'Old Process',
    'case.sections.oldInterface': 'Old Interface',
    // ISY Roles
    'case.isy.roles.hostAdmin.role': 'Host Administrator',
    'case.isy.roles.hostAdmin.tasks': 'Detect and fix security check violations on their servers',
    'case.isy.roles.hostAdmin.results': 'Quickly see the problem and fix it effectively',
    'case.isy.roles.securitySpecialist.role': 'Security Specialist',
    'case.isy.roles.securitySpecialist.tasks': 'Monitor security requirement compliance and analyze violation trends',
    'case.isy.roles.securitySpecialist.results': 'Have up-to-date reports and minimize the number of violations',
    'case.isy.roles.departmentHead.role': 'Department Head',
    'case.isy.roles.departmentHead.tasks': 'Monitor overall security status level in the department',
    'case.isy.roles.departmentHead.results': 'Understand risks and eliminate them in time within their area of responsibility',
    'case.isy.roles.itOperator.role': 'IT Operator / Support Engineer',
    'case.isy.roles.itOperator.tasks': 'Quickly fix critical security violations on production servers',
    'case.isy.roles.itOperator.results': 'Receive notifications and instructions for operational response',
    'case.isy.roles.auditor.role': 'Auditor',
    'case.isy.roles.auditor.tasks': 'Conduct compliance checks and document results',
    'case.isy.roles.auditor.results': 'Easily generate audit reports for audit documentation',
    'case.isy.roles.developer.role': 'Developer',
    'case.isy.roles.developer.tasks': 'Check server compliance with security requirements before product release',
    'case.isy.roles.developer.results': 'Minimize risks of deviations during releases',
    'case.isy.roles.ciso.role': 'CISO / Security Director',
    'case.isy.roles.ciso.tasks': 'Monitor overall security status in the company and prioritize risks',
    'case.isy.roles.ciso.results': 'Have aggregated metrics to protect business from security threats',
    'case.isy.roles.processManager.role': 'Security Process Manager',
    'case.isy.roles.processManager.tasks': 'Analyze trends in security requirement compliance across departments',
    'case.isy.roles.processManager.results': 'Have data to analyze security process effectiveness',
    // Agro Roles
    'case.agro.hero.headline': 'AI-Powered Agricultural Platform for Farm Management',
    'case.agro.hero.subheadline': 'Platform for managing agricultural enterprises that allows managing fields, monitoring crop conditions, planning work, and analyzing yields. Uses AI, satellite data, meteorological information, and telemetry.',
    'case.agro.roles.farmer.role': 'Farmer / Farm Owner',
    'case.agro.roles.farmer.tasks': 'Make strategic decisions on farm development, control financial indicators and yields',
    'case.agro.roles.farmer.results': 'Have a complete picture of farm status and make data-driven decisions',
    'case.agro.roles.agronomist.role': 'Agronomist',
    'case.agro.roles.agronomist.tasks': 'Plan crop rotation, monitor crop conditions, analyze satellite data and meteorology',
    'case.agro.roles.agronomist.results': 'Effectively plan work and respond to crop problems in a timely manner',
    'case.agro.roles.manager.role': 'Manager / Farm Director',
    'case.agro.roles.manager.tasks': 'Coordinate department work, monitor plan execution and analyze operational indicators',
    'case.agro.roles.manager.results': 'Optimize processes and increase efficiency of agricultural operations',
    'case.agro.roles.fieldWorker.role': 'Field Worker / Mechanic',
    'case.agro.roles.fieldWorker.tasks': 'Receive field work assignments, record completed operations and note problems in the field',
    'case.agro.roles.fieldWorker.results': 'Clearly understand tasks and efficiently perform work according to plan',
    'case.agro.roles.economist.role': 'Economist / Financial Manager',
    'case.agro.roles.economist.tasks': 'Analyze operation costs, forecast yields and calculate profitability',
    'case.agro.roles.economist.results': 'Have up-to-date financial data for budget planning and efficiency assessment',
    'case.agro.roles.analyst.role': 'Analytics Specialist',
    'case.agro.roles.analyst.tasks': 'Analyze historical data, identify trends and generate reports for management',
    'case.agro.roles.analyst.results': 'Provide analytical insights for strategic decision-making',
    // Agro Team
    'case.agro.team.productDesigner': 'Product Designer',
    'case.agro.team.agronomistConsultant': 'Agronomist Consultant',
    'case.agro.team.gisAnalyst': 'GIS Analyst',
    'case.agro.team.mlDeveloper': 'ML Developer',
    'case.agro.team.projectManager': 'Project Manager',
    'case.agro.team.productManager': 'Product Manager',
    'case.agro.team.tester': 'Tester',
    'case.agro.team.frontendDeveloper': 'Frontend Developer',
    'case.agro.team.backendDeveloper': 'Backend Developer',
    'case.agro.team.devops': 'DevOps',
    'case.agro.team.systemArchitect': 'System Architect',
  },
  ru: {
    // Navigation
    'nav.about': 'О себе',
    'nav.skills': 'Навыки',
    'nav.projects': 'Проекты',
    'nav.contact': 'Контакты',
    // Hero
    'hero.title': 'Yaroslav Tarasov',
    'hero.description': 'Продуктовый дизайнер, специализируюсь на B2B продуктах и сложных системах. Создаю интерфейсы, которые делают рабочие процессы легче, а работу команд эффективнее.',
    // About
    'about.title': 'О себе',
    'about.paragraph1': 'Продуктовый дизайнер с опытом работы более 5 лет. Специализируюсь на B2B продуктах, сложных системах и корпоративных инструментах. Работал в T1, сейчас работаю в Лаборатории Касперского, где проектирую интерфейсы для дашбордов, внутренних платформ и приложений с большим объемом данных.',
    'about.paragraph2': 'Моя основная задача — создавать структурированный и масштабируемый UX для систем, где важна ясность.',
    'about.paragraph3': 'Привык тесно сотрудничать с продакт-менеджерами, разработчиками и стейкхолдерами для согласования решений и обеспечения технической реализуемости. Создаю и поддерживаю дизайн-системы, работаю с командами разработки над реализацией интерфейсов.',
    // Skills
    'skills.title': 'Навыки и фокус',
    'skills.productDesign.title': 'Product Design',
    'skills.productDesign.description': 'Проектирование интерфейсов для корпоративных систем, дашбордов и приложений с большим объемом данных',
    'skills.designSystems.title': 'Design Systems',
    'skills.designSystems.description': 'Создание и поддержка библиотек компонентов для масштабируемой разработки продуктов',
    'skills.processes.title': 'Processes',
    'skills.processes.description': 'Работа со стейкхолдерами, координация между командами и проектирование внутренних инструментов',
    // Projects
    'projects.title': 'Проекты',
    'projects.productRoadmap.title': 'Product Roadmap',
    'projects.productRoadmap.description': 'Инструмент для согласования релизов и планирования сервисов на год. Единый инструмент для упрощения координации между командами, избежания конфликтов в карточках релизов и повышения прозрачности процессов.',
    'projects.productRoadmap.domain': 'Управление продуктом',
    'projects.isy.title': 'Дашборд для топ-менеджмента',
    'projects.isy.description': 'Дашборд для топ-менеджмента и команды информационной безопасности. Единое окно метрик, рисков и статусов процессов для быстрого доступа к статистике инфраструктуры в реальном времени.',
    'projects.isy.domain': 'Безопасность и аналитика',
    'projects.agro.title': 'Агроплатформа на базе AI',
    'projects.agro.description': 'Платформа для управления агропредприятием, которая позволяет управлять полями, мониторить состояние культур, планировать работы и анализировать урожайность. Использует AI, спутниковые данные, метеорологическую информацию и телеметрию.',
    'projects.agro.domain': 'AgTech',
    // Contact
    'contact.title': 'Готов помочь с вашим проектом',
    'contact.description': 'Давайте обсудим, как я могу помочь создать интерфейс, который решит ваши задачи.',
    'contact.telegram': 'Написать в Telegram',
    'contact.linkedin': 'LinkedIn',
    // Project Card
    'projectCard.protected': 'Защищено',
    'projectCard.comingSoon': 'Coming Soon',
    'projectCard.comingSoonDescription': 'Детальный кейс с процессом работы, выводами и результатами готовится к публикации',
    'projectCard.passwordModal.title': 'Доступ к кейсу',
    'projectCard.passwordModal.description': 'Этот кейс защищен паролем. Введите пароль для доступа.',
    'projectCard.passwordModal.placeholder': 'Введите пароль',
    'projectCard.passwordModal.error': 'Неверный пароль. Попробуйте снова.',
    'projectCard.passwordModal.checking': 'Проверка...',
    'projectCard.passwordModal.submit': 'Войти',
    'projectCard.passwordModal.cancel': 'Отмена',
    // Case Studies - Common
    'case.cta.title': 'Есть вопросы по проекту?',
    'case.cta.description': 'Давайте обсудим детали проекта или посмотрите другие кейсы из моего портфолио',
    'case.cta.viewOtherProjects': 'Посмотреть другие проекты',
    'case.cta.telegram': 'Написать в Telegram',
    // Case Studies - Sections
    'case.sections.process': 'Процесс',
    'case.sections.results': 'Результаты',
    'case.sections.roles': 'Роли пользователей',
    'case.sections.overview': 'Обзор',
    'case.sections.functions': 'Обзор функций',
    'case.sections.myRole': 'Моя роль',
    'case.sections.team': 'Команда',
    'case.sections.mainTasks': 'Основные задачи',
    'case.sections.expectedResults': 'Ожидаемые результаты',
    'case.sections.serviceCard': 'Карточка сервиса',
    'case.sections.requirementCard': 'Карточка требования',
    'case.sections.additionalScreens': 'Дополнительные экраны и функции',
    'case.sections.allGoodState': 'Состояние: все в порядке',
    'case.sections.interactiveTooltips': 'Интерактивные подсказки',
    'case.sections.globalFilters': 'Глобальная фильтрация',
    'case.sections.tableSettings': 'Настройки таблицы',
    'case.sections.roadmapOverview': 'Обзор Roadmap',
    'case.sections.teamComposition': 'Состав команды',
    'case.sections.oldProcess': 'Старый процесс',
    'case.sections.oldInterface': 'Старый интерфейс',
    // ISY Roles
    'case.isy.roles.hostAdmin.role': 'Администратор хостов',
    'case.isy.roles.hostAdmin.tasks': 'Обнаруживать и устранять нарушения ИБ-чеков на своих серверах',
    'case.isy.roles.hostAdmin.results': 'Быстро видеть проблему и эффективно её устранять',
    'case.isy.roles.securitySpecialist.role': 'Специалист по ИБ',
    'case.isy.roles.securitySpecialist.tasks': 'Контролировать выполнение требований ИБ и анализировать динамику нарушений',
    'case.isy.roles.securitySpecialist.results': 'Иметь актуальные отчеты и минимизировать количество нарушений',
    'case.isy.roles.departmentHead.role': 'Руководитель подразделения',
    'case.isy.roles.departmentHead.tasks': 'Следить за общим уровнем ИБ-состояния в подразделении',
    'case.isy.roles.departmentHead.results': 'Понимать риски и вовремя устранять их в своей зоне ответственности',
    'case.isy.roles.itOperator.role': 'ИТ-оператор / Инженер сопровождения',
    'case.isy.roles.itOperator.tasks': 'Быстро устранять критические нарушения ИБ на продакшн-серверах',
    'case.isy.roles.itOperator.results': 'Получать уведомления и инструкции для оперативного реагирования',
    'case.isy.roles.auditor.role': 'Аудитор',
    'case.isy.roles.auditor.tasks': 'Проводить проверки соответствия и документировать результаты',
    'case.isy.roles.auditor.results': 'Легко формировать отчеты о проверках для аудиторской документации',
    'case.isy.roles.developer.role': 'Разработчик',
    'case.isy.roles.developer.tasks': 'Проверять соответствие серверов ИБ-требованиям до вывода продукта',
    'case.isy.roles.developer.results': 'Минимизировать риски отклонений при релизах',
    'case.isy.roles.ciso.role': 'CISO / Директор по безопасности',
    'case.isy.roles.ciso.tasks': 'Следить за общей картиной ИБ-состояния в компании и приоритизировать риски',
    'case.isy.roles.ciso.results': 'Иметь агрегированные метрики для защиты бизнеса от ИБ-угроз',
    'case.isy.roles.processManager.role': 'Процессный менеджер ИБ',
    'case.isy.roles.processManager.tasks': 'Анализировать тренды по соблюдению требований ИБ в подразделениях',
    'case.isy.roles.processManager.results': 'Иметь данные для анализа эффективности процессов ИБ',
    // Agro Roles
    'case.agro.hero.headline': 'Агроплатформа на базе AI для управления агропредприятием',
    'case.agro.hero.subheadline': 'Платформа для управления агропредприятием, которая позволяет управлять полями, мониторить состояние культур, планировать работы и анализировать урожайность. Использует AI, спутниковые данные, метеорологическую информацию и телеметрию.',
    'case.agro.roles.farmer.role': 'Фермер / Владелец хозяйства',
    'case.agro.roles.farmer.tasks': 'Принимать стратегические решения по развитию хозяйства, контролировать финансовые показатели и урожайность',
    'case.agro.roles.farmer.results': 'Иметь полную картину состояния хозяйства и принимать обоснованные решения на основе данных',
    'case.agro.roles.agronomist.role': 'Агроном',
    'case.agro.roles.agronomist.tasks': 'Планировать севооборот, контролировать состояние культур, анализировать спутниковые данные и метеорологию',
    'case.agro.roles.agronomist.results': 'Эффективно планировать работы и своевременно реагировать на проблемы с культурами',
    'case.agro.roles.manager.role': 'Управляющий / Директор хозяйства',
    'case.agro.roles.manager.tasks': 'Координировать работу подразделений, контролировать выполнение планов и анализировать операционные показатели',
    'case.agro.roles.manager.results': 'Оптимизировать процессы и повышать эффективность сельскохозяйственных операций',
    'case.agro.roles.fieldWorker.role': 'Полевой работник / Механизатор',
    'case.agro.roles.fieldWorker.tasks': 'Получать задания на полевые работы, фиксировать выполненные операции и отмечать проблемы в поле',
    'case.agro.roles.fieldWorker.results': 'Четко понимать задачи и эффективно выполнять работы согласно плану',
    'case.agro.roles.economist.role': 'Экономист / Финансовый менеджер',
    'case.agro.roles.economist.tasks': 'Анализировать затраты на операции, прогнозировать урожайность и рассчитывать рентабельность',
    'case.agro.roles.economist.results': 'Иметь актуальные финансовые данные для планирования бюджета и оценки эффективности',
    'case.agro.roles.analyst.role': 'Специалист по аналитике',
    'case.agro.roles.analyst.tasks': 'Анализировать исторические данные, выявлять тренды и формировать отчеты для руководства',
    'case.agro.roles.analyst.results': 'Предоставлять аналитические инсайты для принятия стратегических решений',
    // Agro Team
    'case.agro.team.productDesigner': 'Продуктовый дизайнер',
    'case.agro.team.agronomistConsultant': 'Агроном-консультант',
    'case.agro.team.gisAnalyst': 'GIS-аналитик',
    'case.agro.team.mlDeveloper': 'ML-разработчик',
    'case.agro.team.projectManager': 'Project Manager',
    'case.agro.team.productManager': 'Product Manager',
    'case.agro.team.tester': 'Тестировщик',
    'case.agro.team.frontendDeveloper': 'Frontend-разработчик',
    'case.agro.team.backendDeveloper': 'Backend-разработчик',
    'case.agro.team.devops': 'DevOps',
    'case.agro.team.systemArchitect': 'Системный архитектор',
  },
} as const

export function getTranslation(language: 'en' | 'ru', key: TranslationKey): string {
  return translations[language][key] || key
}
