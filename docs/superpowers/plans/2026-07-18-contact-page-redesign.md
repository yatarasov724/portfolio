# Contact Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/contact` from a single flat message with plain buttons into a two-thread chat dialogue (recruiter thread, lead/client thread) with icon buttons, matching the conversational pattern used everywhere else on the site.

**Architecture:** Follow the existing `getAboutChat(language)` pattern: move contact content/copy into `lib/chat/scripts/contact.tsx`, returning a `ChatScript`. `app/contact/page.tsx` becomes a thin renderer (`ChatHeader` + `ChatMessageList` + `SuggestedQuestions`), mirroring `app/page.tsx`. Add an optional `icon` field to the `links` block type so buttons can carry a small SVG, plus three new outline icons.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind, Vitest (node environment, `**/*.test.ts` only — no component-rendering test infra in this repo).

## Global Constraints

- No new contact channels or data (no email, no availability status, no timezone) — only Telegram, LinkedIn, resume PDF, per spec "Технические детали".
- No `TelegramCta` banner added to the contact page — would duplicate the in-dialogue Telegram button, per spec "Структура диалога".
- New icons follow the existing outline style in `components/chat/icons.tsx`: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth={1.8}`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- `contact.telegram` and `contact.linkedin` translation keys/values are reused as-is (button labels) — do not change their values, `lib/chat/sanity.test.ts` asserts `contact.telegram`'s exact string.
- `contact.title` / `contact.description` keys are removed (replaced by the new dialogue copy) — both from the `TranslationKey` union and both language objects in `i18n/translations.ts`. Removed in Task 5, not Task 3, because `app/contact/page.tsx` still references them until Task 5 rewrites it — removing them earlier would fail `tsc`.
- Sidebar (`components/chat/Sidebar.tsx`) is untouched — its "Контакты" meta line (`Telegram · LinkedIn · CV`) is already neutral.

---

## Task 1: Add Telegram, LinkedIn, and Download icons

**Files:**
- Modify: `components/chat/icons.tsx` (append after `MoonIcon`, line 94)

**Interfaces:**
- Produces: `TelegramIcon`, `LinkedInIcon`, `DownloadIcon` — each `({ className }: IconProps) => JSX.Element`, same signature as every other icon in this file.

This task is presentational-only (pure SVG markup), matching the existing convention in this file — none of the other 9 icons have unit tests. Verification is a TypeScript compile check instead of a test.

- [ ] **Step 1: Append the three icon components**

Add to the end of `components/chat/icons.tsx`:

```tsx
export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <circle cx="7" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <line x1="11" y1="17" x2="11" y2="10.5" />
      <path d="M11 13.2c0-1.5 1.2-2.7 2.7-2.7s2.3 1 2.3 2.7v4" />
    </svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <polyline points="7 10 12 15 17 10" />
      <path d="M5 21h14" />
    </svg>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `components/chat/icons.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/chat/icons.tsx
git commit -m "feat: add Telegram, LinkedIn, and download icons"
```

---

## Task 2: Support an optional icon on link buttons

**Files:**
- Modify: `lib/chat/types.ts:33-36` (`ChatBlockLinks`)
- Modify: `components/chat/ChatMessageList.tsx:88-108` (`links` block render)

**Interfaces:**
- Consumes: nothing new from Task 1 directly (icon components are passed in by callers, not imported here).
- Produces: `ChatBlockLinks.items[].icon?: ReactNode` — later tasks (Task 4) pass `<TelegramIcon className="w-full h-full" />` etc. into this field.

No test file — this is a rendering change with no existing component-test infra in this repo (Vitest here runs in `node` environment against `**/*.test.ts` only, no DOM/JSX rendering). Verified via typecheck now and via the Playwright screenshot check in Task 6 once real content flows through it.

- [ ] **Step 1: Add the optional `icon` field to the type**

In `lib/chat/types.ts`, change:

```ts
export interface ChatBlockLinks {
  type: 'links'
  items: { label: string; href: string; variant: 'primary' | 'secondary' }[]
}
```

to:

```ts
export interface ChatBlockLinks {
  type: 'links'
  items: { label: string; href: string; variant: 'primary' | 'secondary'; icon?: ReactNode }[]
}
```

- [ ] **Step 2: Render the icon in the links block**

In `components/chat/ChatMessageList.tsx`, inside the `if (block.type === 'links')` branch, change:

```tsx
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={
                              link.variant === 'primary'
                                ? 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                                : 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700'
                            }
                          >
                            {link.label}
                          </a>
```

to:

```tsx
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={
                              link.variant === 'primary'
                                ? 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                                : 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700'
                            }
                          >
                            {link.icon && <span className="w-4 h-4 flex-shrink-0">{link.icon}</span>}
                            {link.label}
                          </a>
```

- [ ] **Step 3: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `lib/chat/types.ts` or `components/chat/ChatMessageList.tsx`

- [ ] **Step 4: Commit**

```bash
git add lib/chat/types.ts components/chat/ChatMessageList.tsx
git commit -m "feat: support optional icon on chat link buttons"
```

---

## Task 3: Add recruiter/lead dialogue translation keys

**Files:**
- Modify: `i18n/translations.ts:35-39` (`TranslationKey` union, Contact section)
- Modify: `i18n/translations.ts:171-175` (`en` object, Contact section)
- Modify: `i18n/translations.ts:306-310` (`ru` object, Contact section)

**Interfaces:**
- Produces: translation keys `contact.intro`, `contact.recruiterQuestion`, `contact.recruiterReply`, `contact.leadQuestion`, `contact.leadReply`, `contact.resume` (new), plus existing `contact.telegram` / `contact.linkedin` (unchanged values). Task 4 consumes all of these via `getTranslation(language, key)`.

This task is **additive only** — `contact.title` / `contact.description` stay in place here and are removed in Task 5, once `app/contact/page.tsx` no longer references them. Removing them now would break `tsc` against the still-unmodified page.

No dedicated test for this task — `lib/chat/sanity.test.ts` already asserts `contact.telegram`'s value is untouched (checked in Step 4), and Task 4's tests assert the new keys resolve to non-empty, language-distinct strings.

- [ ] **Step 1: Add the new keys to the `TranslationKey` union**

In `i18n/translations.ts`, change:

```ts
  // Contact
  | 'contact.title'
  | 'contact.description'
  | 'contact.telegram'
  | 'contact.linkedin'
```

to:

```ts
  // Contact
  | 'contact.title'
  | 'contact.description'
  | 'contact.intro'
  | 'contact.recruiterQuestion'
  | 'contact.recruiterReply'
  | 'contact.leadQuestion'
  | 'contact.leadReply'
  | 'contact.resume'
  | 'contact.telegram'
  | 'contact.linkedin'
```

- [ ] **Step 2: Add the new `en` translations**

In `i18n/translations.ts`, change:

```ts
    // Contact
    'contact.title': 'Ready to help with your project',
    'contact.description': 'Let\'s discuss how I can help create an interface that solves your challenges.',
    'contact.telegram': 'Message on Telegram',
    'contact.linkedin': 'LinkedIn',
```

to:

```ts
    // Contact
    'contact.title': 'Ready to help with your project',
    'contact.description': 'Let\'s discuss how I can help create an interface that solves your challenges.',
    'contact.intro': 'If you\'re here, you\'re probably considering me as a candidate or looking for a designer for a project.',
    'contact.recruiterQuestion': 'Are you open to job offers?',
    'contact.recruiterReply': 'Yes, open to full-time offers. Resume and profile are below.',
    'contact.leadQuestion': 'We have a project and need a product designer — what\'s the fastest way to reach you?',
    'contact.leadReply': 'Telegram is fastest — I usually reply within the day.',
    'contact.resume': 'Download resume (PDF)',
    'contact.telegram': 'Message on Telegram',
    'contact.linkedin': 'LinkedIn',
```

- [ ] **Step 3: Add the new `ru` translations**

In `i18n/translations.ts`, change:

```ts
    // Contact
    'contact.title': 'Готов помочь с вашим проектом',
    'contact.description': 'Давайте обсудим, как я могу помочь создать интерфейс, который решит ваши задачи.',
    'contact.telegram': 'Написать в Telegram',
    'contact.linkedin': 'LinkedIn',
```

to:

```ts
    // Contact
    'contact.title': 'Готов помочь с вашим проектом',
    'contact.description': 'Давайте обсудим, как я могу помочь создать интерфейс, который решит ваши задачи.',
    'contact.intro': 'Если вы здесь — скорее всего, рассматриваете меня как кандидата или ищете дизайнера для проекта.',
    'contact.recruiterQuestion': 'Рассматриваете предложения о работе?',
    'contact.recruiterReply': 'Да, открыт к full-time предложениям. Резюме и профиль — ниже.',
    'contact.leadQuestion': 'Есть проект, нужен продуктовый дизайнер — как быстрее связаться?',
    'contact.leadReply': 'Быстрее всего — в Telegram, отвечаю в течение дня.',
    'contact.resume': 'Скачать резюме (PDF)',
    'contact.telegram': 'Написать в Telegram',
    'contact.linkedin': 'LinkedIn',
```

- [ ] **Step 4: Run the sanity test to confirm `contact.telegram` is untouched, and typecheck**

Run: `npx vitest run lib/chat/sanity.test.ts && npx tsc --noEmit`
Expected: sanity test PASS (1 test), `tsc` reports no errors

- [ ] **Step 5: Commit**

```bash
git add i18n/translations.ts
git commit -m "feat: add recruiter/lead dialogue translation keys"
```

---

## Task 4: Build the contact chat script

**Files:**
- Create: `lib/chat/scripts/contact.tsx`
- Test: `lib/chat/scripts/contact.test.ts`

**Interfaces:**
- Consumes: `getTranslation`, `TranslationKey` from `@/i18n/translations` (Task 3 keys); `TelegramIcon`, `LinkedInIcon`, `DownloadIcon` from `@/components/chat/icons` (Task 1); `ChatScript` from `@/lib/chat/types` (Task 2's `icon` field).
- Produces: `getContactChat(language: 'en' | 'ru'): ChatScript` — consumed by `app/contact/page.tsx` in Task 5.

This file is `.tsx` (not `.ts` like the other scripts) because it embeds JSX icon elements in the `icon` field — the repo's `tsconfig.json` already sets `"jsx": "react-jsx"`, and Vitest (Vite/esbuild) picks that up automatically, so a `.tsx` module works the same as a `.ts` one for a plain data-returning function.

- [ ] **Step 1: Write the failing test**

Create `lib/chat/scripts/contact.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getContactChat } from './contact'

describe('getContactChat', () => {
  it('returns the same number of messages for ru and en', () => {
    const ru = getContactChat('ru')
    const en = getContactChat('en')
    expect(ru.messages.length).toBe(en.messages.length)
    expect(ru.messages.length).toBeGreaterThan(0)
  })

  it('returns the same number of suggested links for ru and en', () => {
    const ru = getContactChat('ru')
    const en = getContactChat('en')
    expect(ru.suggested.length).toBe(en.suggested.length)
    expect(ru.suggested.length).toBeGreaterThan(0)
  })

  it('every message has at least one block', () => {
    const messages = getContactChat('ru').messages
    for (const message of messages) {
      expect(message.blocks.length).toBeGreaterThan(0)
    }
  })

  it('includes both a recruiter thread and a lead thread with the right links', () => {
    const chat = getContactChat('en')
    const linksBlocks = chat.messages.flatMap((m) => m.blocks).filter((b) => b.type === 'links')
    expect(linksBlocks).toHaveLength(2)

    const allHrefs = linksBlocks.flatMap((b) => (b.type === 'links' ? b.items.map((i) => i.href) : []))
    expect(allHrefs).toContain('/Tarasov Yaroslav (4).pdf')
    expect(allHrefs).toContain('https://www.linkedin.com/in/yatarasov/')
    expect(allHrefs).toContain('https://t.me/yatarasov')
  })

  it('has two visitor questions (recruiter and lead)', () => {
    const chat = getContactChat('en')
    const visitorMessages = chat.messages.filter((m) => m.role === 'visitor')
    expect(visitorMessages).toHaveLength(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/chat/scripts/contact.test.ts`
Expected: FAIL — `Cannot find module './contact'` (or similar resolution error)

- [ ] **Step 3: Implement `getContactChat`**

Create `lib/chat/scripts/contact.tsx`:

```tsx
import { getTranslation, TranslationKey } from '@/i18n/translations'
import { TelegramIcon, LinkedInIcon, DownloadIcon } from '@/components/chat/icons'
import type { ChatScript } from '@/lib/chat/types'

export function getContactChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)

  return {
    title: getTranslation(language, 'nav.contact'),
    tags: ['Telegram', 'LinkedIn', 'CV'],
    messages: [
      {
        role: 'author',
        blocks: [{ type: 'text', content: t('contact.intro') }],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: t('contact.recruiterQuestion') }],
      },
      {
        role: 'author',
        blocks: [
          { type: 'text', content: t('contact.recruiterReply') },
          {
            type: 'links',
            items: [
              {
                label: t('contact.resume'),
                href: '/Tarasov Yaroslav (4).pdf',
                variant: 'primary',
                icon: <DownloadIcon className="w-full h-full" />,
              },
              {
                label: t('contact.linkedin'),
                href: 'https://www.linkedin.com/in/yatarasov/',
                variant: 'secondary',
                icon: <LinkedInIcon className="w-full h-full" />,
              },
            ],
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: t('contact.leadQuestion') }],
      },
      {
        role: 'author',
        blocks: [
          { type: 'text', content: t('contact.leadReply') },
          {
            type: 'links',
            items: [
              {
                label: t('contact.telegram'),
                href: 'https://t.me/yatarasov',
                variant: 'primary',
                icon: <TelegramIcon className="w-full h-full" />,
              },
            ],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Обо мне →' : 'About me →', href: '/' },
      {
        label: language === 'ru' ? 'Кейс: мониторинг инфраструктуры →' : 'Case: infrastructure monitoring →',
        href: '/cases/infrastructure-monitoring',
      },
      {
        label: language === 'ru' ? 'Кейс: агроплатформа →' : 'Case: agricultural platform →',
        href: '/cases/agro-platform',
      },
    ],
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/chat/scripts/contact.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/chat/scripts/contact.tsx lib/chat/scripts/contact.test.ts
git commit -m "feat: add recruiter/lead dialogue script for the contact page"
```

---

## Task 5: Wire the contact page to the new script and drop the old copy

**Files:**
- Modify: `app/contact/page.tsx` (full rewrite)
- Modify: `i18n/translations.ts` (remove `contact.title` / `contact.description` — line numbers shifted by Task 3's additions, locate by key name)

**Interfaces:**
- Consumes: `getContactChat` from `@/lib/chat/scripts/contact` (Task 4); `ChatHeader`, `ChatMessageList`, `SuggestedQuestions` (existing, same as `app/page.tsx`); `MailIcon` from `@/components/chat/icons` (existing).

- [ ] **Step 1: Rewrite the page**

Replace the full contents of `app/contact/page.tsx` with:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getContactChat } from '@/lib/chat/scripts/contact'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import { MailIcon } from '@/components/chat/icons'

export default function ContactPage() {
  const { language } = useLanguage()
  const chat = getContactChat(language)

  return (
    <>
      <ChatHeader icon={<MailIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
    </>
  )
}
```

- [ ] **Step 2: Remove the now-unused `contact.title` / `contact.description` keys**

In `i18n/translations.ts`, remove the `| 'contact.title'` and `| 'contact.description'` lines from the `TranslationKey` union (added back in Task 3, Step 1), and remove the `'contact.title': ...,` and `'contact.description': ...,` lines from both the `en` and `ru` objects (added in Task 3, Steps 2-3). Leave `contact.intro`, `contact.recruiterQuestion`, `contact.recruiterReply`, `contact.leadQuestion`, `contact.leadReply`, `contact.resume`, `contact.telegram`, `contact.linkedin` untouched.

- [ ] **Step 3: Verify no remaining references to the removed keys**

Run: `grep -rn "contact\.title\|contact\.description" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.next`
Expected: no output

- [ ] **Step 4: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx i18n/translations.ts
git commit -m "feat: render the contact page from the recruiter/lead dialogue script"
```

---

## Task 6: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests PASS, including the new `lib/chat/scripts/contact.test.ts`

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors

- [ ] **Step 3: Start the dev server if not already running**

Run: `lsof -i :3000 -sTCP:LISTEN` to check; if nothing is listening, run `npm run dev &` (or `npm run dev` with `run_in_background: true`) and wait for "Ready" in its output before continuing.

- [ ] **Step 4: Screenshot the contact page (light, dark, mobile) and inspect visually**

From the repo root (so `playwright` resolves from `node_modules`):

```bash
cat > shot.tmp.mjs << 'EOF'
import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `contact-${scheme}.png` });
  await page.close();
}
const mpage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mpage.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
await mpage.screenshot({ path: 'contact-mobile.png' });
await browser.close();
EOF
node shot.tmp.mjs && rm shot.tmp.mjs
```

Read `contact-light.png`, `contact-dark.png`, `contact-mobile.png` and confirm:
- Two visitor bubbles (recruiter question, lead question) and their author replies are visible.
- The resume, LinkedIn, and Telegram buttons each show a small icon to the left of the label.
- Three suggested-link chips appear below the dialogue.
- No `TelegramCta` banner is present.

Delete the screenshots afterward (`rm contact-light.png contact-dark.png contact-mobile.png`) — they're verification artifacts, not repo content.

- [ ] **Step 5: Toggle language to `en` in the browser (or visit with `?lang=en` / use the RU/EN switch in the sidebar) and repeat a quick visual check**

Confirm the English copy reads correctly and the same structure holds (this project keeps language in `LanguageContext`, not the URL — use the sidebar toggle while manually driving the page, or extend the script above with `page.click(...)` on the language switch if a stable selector is available).

- [ ] **Step 6: Final commit if any fixes were needed during verification**

If Steps 1-5 required any code changes, stage and commit them with a message describing the fix. If everything passed as implemented, there is nothing to commit in this task.
