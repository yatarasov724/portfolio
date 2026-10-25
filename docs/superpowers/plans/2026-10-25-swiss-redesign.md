# Swiss Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить чат-интерфейс портфолио на строгий чёрно-белый швейцарский сайт: главная с индексом кейсов, два кейса в редакционной вёрстке, контакты. Содержимое кейсов не теряется.

**Architecture:** Чат-сценарии (`lib/chat/scripts/*.ts`) остаются источником контента этапа 1. Тонкий адаптер `lib/cases/fromChat.ts` превращает пары «вопрос посетителя → ответ автора» в нумерованные секции с заголовками из `lib/cases/headings.ts`. Новые компоненты `components/site/*` и `components/case/*` рисуют секции в 12-колоночной сетке. Чат-оболочка, тёмная тема и страница `product-roadmap` удаляются. На этапе 2 новые кейсы пишутся сразу как `CaseData`.

**Tech Stack:** Next 16 (`output: 'export'`), React 19, Tailwind 3, framer-motion (только в `ImageModal`), Vitest (среда `node`, только `*.test.ts`).

**Spec:** `docs/superpowers/specs/2026-10-25-swiss-redesign-design.md`

## Global Constraints

- Статический экспорт, никакого серверного кода; деплой по push в `main` через GitHub Pages, домен `yaroslavtarasov.com` не трогаем.
- Строго чёрно-белая палитра, без акцентного цвета, градиентов, теней и скруглений. Фон `#f4f4f2`, текст `#111`, вторичный текст `#555`, линии 1px `#111`. Тёмной темы нет.
- Один гротеск (Inter через `next/font`, уже подключён). Заголовки крупные, жирные, с отрицательным трекингом; основной текст мелкий, межстрочный ~1.5; метки секций капсом с трекингом.
- 12-колоночная сетка: метки секций в колонках 1–3, содержимое в 4–12, метаданные кейса в колонках 9–12.
- Контент двуязычный RU/EN; переключатель RU/EN и `localStorage`-язык сохраняются (`contexts/LanguageContext.tsx` не меняется).
- Маршруты: `/`, `/cases/infrastructure-monitoring`, `/cases/agro-platform`, `/contact`. `/cases/product-roadmap` удаляется без редиректа.
- Контакты: Telegram `https://t.me/yatarasov`, LinkedIn `https://www.linkedin.com/in/yatarasov/`, резюме `/Tarasov Yaroslav (4).pdf` (один файл на оба языка).
- Заголовок главной: «Продуктовый дизайнер» / «Product Designer». Тексты кейсов не переписываются.
- Адаптив до 400px, боковой отступ не меньше 16px, горизонтального скролла страницы нет.
- Не пушить в `main` без явного разрешения Ярослава (Task 8).

## Review Focus

1. Длинные слова («Информационная архитектура», «Infrastructure Monitoring») в крупных заголовках на 390px не вызывают горизонтальный скролл (Task 5, Task 8).
2. На EN-версии каждой секции кейса есть английский заголовок, а не русский или пустой (Task 1).
3. У первого кейса нет «предыдущего», у последнего нет «следующего»; «01 / 02» не ведёт в никуда (Task 1, Task 5).
4. Рендер блоков кейса покрывает все 6 типов `ChatBlock` (`text`, `image`, `metrics`, `chips`, `list`, `links`) без падения на неизвестном типе (Task 5).
5. Картинки кейсов остаются кликабельными (зум в `ImageModal`, закрытие по Esc) и фокусируются с клавиатуры (Task 5, Task 8).

---

### Task 1: Данные кейсов (адаптер чат → секции)

**Files:**
- Create: `lib/cases/types.ts`, `lib/cases/headings.ts`, `lib/cases/fromChat.ts`, `lib/cases/index.ts`
- Test: `lib/cases/index.test.ts`

**Interfaces:**
- Consumes: `getAgroChat(language)`, `getInfrastructureMonitoringChat(language)` из `lib/chat/scripts/*`, тип `ChatScript` / `ChatBlock` из `lib/chat/types.ts`.
- Produces:
  - `type Language = 'en' | 'ru'`; `type CaseSlug = 'infrastructure-monitoring' | 'agro-platform'`
  - `interface CaseSection { heading: string; blocks: ChatBlock[] }`
  - `interface CaseLink { slug: CaseSlug; number: string; title: string }`
  - `interface CaseData { slug: CaseSlug; number: '01' | '02'; title: string; indexTitle: string; indexMeta: string; tags: string[]; intro: ChatBlock[]; sections: CaseSection[]; prev: CaseLink | null; next: CaseLink | null }`
  - `const CASE_SLUGS: readonly CaseSlug[]` (порядок: `infrastructure-monitoring`, `agro-platform`)
  - `chatToCase(script: ChatScript, headings: string[]): { intro: ChatBlock[]; sections: CaseSection[] }`: первая пара «вопрос → ответ» становится `intro` (без заголовка), каждая следующая секцией; бросает `Error`, если `headings.length` не равна числу пар минус один
  - `getCase(slug: CaseSlug, language: Language): CaseData`, `getAllCases(language: Language): CaseData[]`

- [ ] **Step 1: Написать падающие тесты** в `lib/cases/index.test.ts` (vitest):
  - `'infra: 9 sections, agro: 12 sections'` — `getCase('infrastructure-monitoring','ru').sections.length === 9`, `getCase('agro-platform','ru').sections.length === 12`.
  - `'keeps every author block (no content loss)'` — для обоих кейсов и обоих языков число блоков в `intro` + всех `sections[].blocks` равно числу блоков во всех сообщениях с `role === 'author'` исходного сценария.
  - `'headings exist in both languages'` — у каждой секции обоих кейсов `heading` непустой в `ru` и `en`; в `en` ни один заголовок не содержит кириллицы (`/[а-яё]/i`).
  - `'chatToCase throws on heading mismatch'` — `expect(() => chatToCase(script, ['x'])).toThrow()`.
  - `'prev/next'` — `getCase('infrastructure-monitoring','ru').prev === null` и `.next?.slug === 'agro-platform'`; `getCase('agro-platform','ru').next === null` и `.prev?.slug === 'infrastructure-monitoring'`.
  - `'index meta'` — `getCase('infrastructure-monitoring','ru').indexMeta === 'B2B · 2025'`, `getCase('agro-platform','ru').indexMeta === 'B2B · 2023–2024'` (формат: `${tags[0]} · ${tags.at(-1)}`).
  - `'index titles'` — `indexTitle` инфры `'Мониторинг инфраструктуры'` / `'Infrastructure Monitoring'`, агро `'Агроплатформа'` / `'Agricultural Platform'`.
- [ ] **Step 2: Запустить `npx vitest run lib/cases`**, ожидаем FAIL (модуль не найден).
- [ ] **Step 3: Реализовать** типы и функции из блока Interfaces. В `headings.ts` лежит `CASE_HEADINGS: Record<CaseSlug, Record<Language, string[]>>` с точными значениями ниже. `title` берётся из `script.title`, `tags` из `script.tags`.
  - infra, RU: Проблема · Цели · Исследование · После исследования · Интерфейс · Аудитория · Экраны · Состояния интерфейса · Итоги
  - infra, EN: Problem · Goals · Research · After the research · Interface · Audience · Screens · Interface states · Outcome
  - agro, RU: Проблема · Цели · Исследование · Информационная архитектура · Валидация · Интерфейс и дизайн-система · Роль в команде · Аудитория · Что спроектировано · Управление полями · Состав платформы · Итоги
  - agro, EN: Problem · Goals · Research · Information architecture · Validation · Interface and design system · Role on the team · Audience · What was designed · Field management · Platform scope · Outcome
- [ ] **Step 4: Запустить `npx vitest run lib/cases`**, ожидаем PASS.
- [ ] **Step 5: Commit** `feat: add case data adapter (chat scripts → sections)`.

---

### Task 2: Тексты сайта и контакты

**Files:**
- Create: `lib/site/copy.ts`
- Test: `lib/site/copy.test.ts`

**Interfaces:**
- Consumes: `getTranslation`, `TranslationKey` из `i18n/translations.ts` (ключи `about.paragraph1..3`, `skills.*`, `contact.*`), `Language` из `lib/cases/types.ts`.
- Produces:
  - `const CONTACT_LINKS: { telegram: string; linkedin: string; resume: string }` с значениями из Global Constraints
  - `interface SiteCopy { name: string; headline: string; specialty: string; nav: { work: string; about: string; contact: string }; workLabel: string; aboutLabel: string; aboutParagraphs: string[]; skills: { title: string; description: string }[]; contactTitle: string; contactDescription: string; contactLabels: { telegram: string; linkedin: string; resume: string }; caseBack: string }`
  - `getSiteCopy(language: Language): SiteCopy`

- [ ] **Step 1: Написать падающие тесты:**
  - `'headline'` — `getSiteCopy('ru').headline === 'Продуктовый дизайнер'`, `getSiteCopy('en').headline === 'Product Designer'`.
  - `'specialty'` — `ru: 'B2B · сложные системы · 5+ лет'`, `en: 'B2B · complex systems · 5+ years'`.
  - `'nav labels'` — ru `Работы / Обо мне / Контакты`, en `Work / About / Contact`; `caseBack` ru `← Работы`, en `← Work`.
  - `'about has three paragraphs and three skills'` в обоих языках.
  - `'no empty strings'` — рекурсивный обход `getSiteCopy(lang)` не находит пустых строк для `ru` и `en`.
  - `'contact links'` — `CONTACT_LINKS.telegram === 'https://t.me/yatarasov'`, `.resume === '/Tarasov Yaroslav (4).pdf'`.
- [ ] **Step 2: Запустить `npx vitest run lib/site`**, ожидаем FAIL.
- [ ] **Step 3: Реализовать `getSiteCopy`.** `name` — `'Yaroslav Tarasov'`; `workLabel` — «Избранные работы» / «Selected work»; `aboutLabel` — «Обо мне» / «About»; `contactLabels.resume` — «Резюме (PDF)» / «Resume (PDF)»; остальное берётся из `getTranslation`.
- [ ] **Step 4: Запустить `npx vitest run lib/site`**, ожидаем PASS.
- [ ] **Step 5: Commit** `feat: add site copy and contact links`.

---

### Task 3: Основа дизайна: стили, лейаут, шапка, подвал

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`, `tailwind.config.js`
- Create: `components/site/SiteHeader.tsx`, `components/site/SiteFooter.tsx`

**Interfaces:**
- Consumes: `useLanguage()` (`language`, `setLanguage`), `getSiteCopy`, `CONTACT_LINKS`.
- Produces:
  - `SiteHeader` (client): без пропсов. Слева имя (ссылка на `/`), справа `Работы` → `/#work`, `Обо мне` → `/#about`, `Контакты` → `/contact`, переключатель `RU / EN`. Снизу жирная линия 2px `#111`. На узком экране элементы переносятся на вторую строку, а не вылезают.
  - `SiteFooter` (client): без пропсов. Блок контактов: заголовок и описание из `SiteCopy`, три подчёркнутые ссылки `Telegram ↗`, `LinkedIn ↗`, `Резюме ↓`; внешние ссылки с `target="_blank" rel="noopener noreferrer"`.
  - Класс-обёртка сетки в `globals.css`: `.sw-grid` (12 колонок, `gap`, боковой отступ ≥16px, `max-width` ~1280px, по центру).

- [ ] **Step 1:** В `globals.css` убрать тёмные переменные и `.dark`; задать CSS-переменные палитры из Global Constraints, `body { background: var(--bg); color: var(--ink) }`, шрифт из `--font-geist-sans`, сохранить правило переноса слов для `p, li`; добавить `.sw-grid`. В `tailwind.config.js` убрать `darkMode: 'class'`.
- [ ] **Step 2:** В `layout.tsx` убрать `ChatShell`, `ThemeProvider`, класс `dark` у `<html>` и тёмные классы у `<body>`; в `<body>` положить `LanguageProvider` → `LanguageSetter`, `SiteHeader`, `{children}`, `SiteFooter`. `metadata` не менять.
- [ ] **Step 3:** Реализовать `SiteHeader` и `SiteFooter` по Interfaces. Активный пункт отмечается подчёркиванием, не цветом.
- [ ] **Step 4: Проверка:** `npm run build`, ожидаем успешную сборку, маршруты `/`, `/contact`, два кейса в списке. Страницы пока выглядят смешанно, это допустимо.
- [ ] **Step 5: Commit** `feat: swiss base styles, header and footer`.

---

### Task 4: Главная

**Files:**
- Modify: `app/page.tsx`
- Create: `components/site/CaseIndex.tsx`

**Interfaces:**
- Consumes: `getSiteCopy`, `getAllCases(language)` (поля `slug`, `number`, `indexTitle`, `indexMeta`), `SiteFooter` из лейаута.
- Produces: `CaseIndex` (client), без пропсов; рендерит строки `NN · indexTitle · indexMeta`, каждая строка целиком ссылка на `/cases/${slug}`, сверху линия 1px.

- [ ] **Step 1:** Переписать `app/page.tsx` (client): hero с `headline` огромным кеглем (≥ 44px на мобильном, до ~120px на десктопе) и строкой `specialty`; секция `id="work"` с меткой `workLabel` и `CaseIndex`; секция `id="about"` с меткой `aboutLabel` в колонках 1–3 и тремя абзацами `aboutParagraphs` в колонках 4–12; под ними список `skills` как строки с линиями (название слева, описание справа).
- [ ] **Step 2:** Реализовать `CaseIndex`.
- [ ] **Step 3: Проверка:** `npm run build`; затем `npm run dev -- -p 3123` и открыть `/`: видны hero, индекс из двух строк, «Обо мне», подвал; клик по строке индекса ведёт на кейс; переключение RU/EN меняет все тексты.
- [ ] **Step 4: Commit** `feat: swiss home page`.

---

### Task 5: Страницы кейсов

**Files:**
- Create: `components/case/CaseView.tsx`, `components/case/CaseBlocks.tsx`, `components/case/CaseNav.tsx`
- Modify: `app/cases/infrastructure-monitoring/page.tsx`, `app/cases/agro-platform/page.tsx`

**Interfaces:**
- Consumes: `getCase(slug, language)`, `CaseData`, `getSiteCopy` (`caseBack`), `ImageModal` (`{ src, alt, isOpen, onClose }`), `useLanguage()`.
- Produces:
  - `CaseView({ slug }: { slug: CaseSlug })` (client): `CaseNav`, заголовок кейса (крупный, колонки 1–8) и справа метаданные из `tags` (колонки 9–12), `intro` на ширину контента, затем секции: метка `NN` + `heading` в колонках 1–3, `CaseBlocks` в колонках 4–12.
  - `CaseNav({ prev, next, number, total })`: слева `← Работы` (ссылка на `/#work`), справа `01 / 02`, где соседние номера — ссылки на `prev`/`next` (если `null`, соответствующий номер — обычный текст).
  - `CaseBlocks({ blocks }: { blocks: ChatBlock[] })`: рендер всех 6 типов блоков через `switch (block.type)` с веткой `default` на `never` (исчерпывающая проверка типов): `text` — абзац; `image` — кнопка с картинкой на всю ширину колонки, подпись `caption` мелким текстом под ней, клик открывает `ImageModal`; `list` — заголовок `heading` жирным и строки с линиями или маркером «—»; `metrics` — ряд значение/подпись с линией сверху; `chips` — слова через ` · `; `links` — подчёркнутые ссылки.

- [ ] **Step 1:** Реализовать `CaseBlocks` и `CaseNav`, затем `CaseView`.
- [ ] **Step 2:** Обе страницы кейсов сделать тонкими: `export default function Page() { return <CaseView slug="…" /> }` (client-компонент остаётся внутри `CaseView`).
- [ ] **Step 3: Проверка (тип-исчерпываемость и сборка):** `npx tsc --noEmit`, ожидаем 0 ошибок; `npm run build`, ожидаем успех.
- [ ] **Step 4: Проверка (визуально, Review Focus 1, 5):** `npm run dev -- -p 3123`; открыть оба кейса на 1440px и 390px; на 390px выполнить в консоли `document.documentElement.scrollWidth <= window.innerWidth` — ожидаем `true`; клик по скриншоту открывает увеличенное изображение, Esc закрывает, Tab фокусируется на картинке.
- [ ] **Step 5: Commit** `feat: swiss case pages`.

---

### Task 6: Контакты

**Files:**
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `getSiteCopy`, `CONTACT_LINKS`.
- Produces: страница `/contact` (client): крупный заголовок `contactTitle`, описание `contactDescription`, три строки-ссылки (Telegram, LinkedIn, Резюме) во всю ширину контента, со стрелкой справа и линиями между ними. `SiteFooter` на этой странице не дублирует блок: `SiteFooter` скрывает контактный блок при `usePathname() === '/contact'`.

- [ ] **Step 1:** Переписать страницу, обновить `SiteFooter` по условию выше.
- [ ] **Step 2: Проверка:** `npm run build`; в dev на `/contact` один блок контактов, ссылки ведут по адресам из `CONTACT_LINKS`, резюме скачивается.
- [ ] **Step 3: Commit** `feat: swiss contact page`.

---

### Task 7: Удаление старого

**Files:**
- Delete: `components/chat/` (вся папка), `components/Header.tsx`, `components/animations/`, `utils/scroll.ts`, `contexts/ThemeContext.tsx`, `lib/chat/nav.ts`, `app/cases/product-roadmap/`, `public/cases/product-roadmap/`, `lib/chat/scripts/about.ts`, `lib/chat/scripts/about.test.ts`
- Modify: `lib/chat/sanity.test.ts` (если ссылается на удалённое), `lib/chat/scripts/*.test.ts` (оставить как есть, если проходят)

**Interfaces:**
- Consumes: результат Tasks 3–6; нигде в `app/`, `components/`, `lib/` не должно остаться импортов удаляемых модулей.
- Produces: репозиторий без чат-оболочки; `lib/chat/types.ts` и `lib/chat/scripts/{agro,infrastructure-monitoring}.ts` остаются как источник контента.

- [ ] **Step 1: Найти оставшиеся импорты:** `grep -rn "components/chat\|ThemeContext\|components/animations\|utils/scroll\|lib/chat/nav\|scripts/about\|product-roadmap" app components lib contexts i18n`, ожидаем пустой вывод после удаления (до удаления список подсказывает, что править).
- [ ] **Step 2:** Удалить файлы и папки из списка Files; поле `suggested` в `ChatScript` и в скриптах оставить, оно безвредно.
- [ ] **Step 3: Проверка:** `npm test`, ожидаем все тесты PASS (в том числе `lib/chat/scripts/agro.test.ts`, `infrastructure-monitoring.test.ts`, `lib/cases`, `lib/site`); `npx tsc --noEmit` без ошибок; `npm run lint` без ошибок; `npm run build` успешен, в списке маршрутов нет `/cases/product-roadmap`.
- [ ] **Step 4: Commit** `chore: remove chat shell, dark theme and legacy roadmap page`.

---

### Task 8: Визуальная проверка и выкладка

**Files:**
- Create: `scripts/screenshots.mjs`

**Interfaces:**
- Consumes: запущенный `npm run dev -- -p 3123`, `playwright` (в devDependencies, браузер: `npx playwright install chromium-headless-shell`).
- Produces: `node scripts/screenshots.mjs <outDir>` сохраняет полные скриншоты четырёх страниц в двух ширинах (`1440x900`, `390x844`) и языках RU/EN (`<page>-<width>-<lang>.png`) и печатает для каждой страницы результат `scrollWidth <= innerWidth`.

- [ ] **Step 1:** Написать `scripts/screenshots.mjs` (язык выставляется через `localStorage.language` до перехода).
- [ ] **Step 2: Запуск:** `npm run dev -- -p 3123` в фоне, затем `node scripts/screenshots.mjs <outDir>`; ожидаем 16 файлов и `scrollWidth ok` для всех страниц.
- [ ] **Step 3:** Просмотреть скриншоты и показать Ярославу ключевые (главная, кейс, контакты, мобильная версия). Поправить найденные недочёты отдельными коммитами.
- [ ] **Step 4: Итоговая проверка:** `npm test`, `npm run lint`, `npm run build`, все успешны.
- [ ] **Step 5: Выкладка только после явного разрешения Ярослава:** `git push origin main` (git сам не авторизован: использовать `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin main`), затем `gh run watch` до завершения workflow «Deploy to GitHub Pages».
- [ ] **Step 6: Commit** `chore: add screenshot script` (до пуша).
