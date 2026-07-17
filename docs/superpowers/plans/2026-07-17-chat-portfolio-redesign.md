# Chat Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the portfolio into a chat-style interface — a persistent sidebar listing "chats" (About, two case studies, Contact) and a right-hand panel that renders each one as a scripted first-person conversation — while keeping the existing Next.js static-export/GitHub Pages deployment untouched.

**Architecture:** A new `ChatShell` client layout (sidebar + content slot) wraps the existing App Router pages. Each existing route (`/`, `/cases/isy-iseeyou`, `/cases/agro-platform`) is rewritten to render a small set of shared chat components (`ChatHeader`, `ChatMessageList`, `SuggestedQuestions`, `TelegramCta`) fed by a per-chat data function (`getAboutChat`, `getIsyChat`, `getAgroChat`) that returns a typed, bilingual `ChatScript`. A new `/contact` route is added. `app/cases/product-roadmap/` and everything it still depends on (`Header.tsx`, the Framer Motion `animations/*` helpers, `app/data/projects.ts`) are explicitly left untouched and unlinked from navigation, per the spec.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, Tailwind CSS (existing gray/blue token palette — no new hex values), Framer Motion. Vitest is added as a new dev dependency, used only for pure data-function tests (no DOM/component rendering tests — this repo has no existing test setup and is a presentational static site; component/visual correctness is verified manually via the dev server per task, per this project's established practice).

## Global Constraints

- Reuse the existing Tailwind gray/blue token palette already used throughout the codebase (`gray-950`, `gray-900/40`, `gray-800/50`, `gray-400`, `blue-500`, gradient `from-blue-500 to-purple-500`) instead of introducing new arbitrary hex colors — matches the validated mockup's dark/indigo look closely enough and keeps the code idiomatic with the rest of the repo.
- No emoji anywhere in the UI — all iconography is outline SVG (`stroke-width: 1.8`, no fill), defined once in `components/chat/icons.tsx`.
- All chat copy is first person ("Я спроектировал…", "Меня зовут Ярослав Тарасов…"). Visitor bubbles use "ты", not "вы".
- The word "инфобез" must never appear in the ISY case copy. The employer (Kaspersky) must never be named inside the ISY case copy (it may still appear in the About chat, which reuses `about.paragraph1`).
- No fabricated metrics: only the ISY case shows a `metrics` block (hours→minutes, 1 window, real-time), sourced from existing copy. The Agro case has no `metrics` block.
- `app/cases/product-roadmap/`, `app/data/projects.ts`, `components/Header.tsx`, `components/animations/{AnimatedSection,SmoothScrollProvider,Stagger}.tsx`, and the `react-markdown`/`remark-gfm` dependencies are **not modified or deleted** in this plan — they are still used by the untouched Product Roadmap page.
- Every rewritten route keeps its current URL (`/`, `/cases/isy-iseeyou`, `/cases/agro-platform`) plus a new `/contact` — no route renames.
- `npm run build` (which runs Next's TypeScript type-check for a static export) must succeed after every task that touches `.ts`/`.tsx` files — this is the project's primary correctness gate, since there is no component test suite.

---

## Task 1: Add Vitest as the test runner

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `lib/chat/sanity.test.ts`

**Interfaces:**
- Consumes: nothing yet.
- Produces: `npm test` script that all later tasks' data-function tests run under. `@/` path alias resolves inside Vitest the same way it does in the Next app (via `tsconfig.json`'s `"paths": {"@/*": ["./*"]}`).

- [ ] **Step 1: Add the dependency and script to `package.json`**

Read the current file first (already read above). Add `"vitest"` to `devDependencies` and a `"test"` script to `"scripts"`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "optimize-images": "node scripts/optimize-images.js",
    "test": "vitest run"
  },
  "dependencies": {
    "framer-motion": "^12.23.24",
    "next": "16.0.10",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1"
  },
  "devDependencies": {
    "@squoosh/cli": "^0.7.1",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.22",
    "eslint": "^9",
    "eslint-config-next": "16.0.5",
    "postcss": "^8.5.6",
    "sharp": "^0.34.5",
    "tailwindcss": "^3.4.18",
    "typescript": "^5",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Install**

Run: `cd /Users/aroslavtarasov/Projects/portfolio && npm install`
Expected: install succeeds, `vitest` appears in `node_modules/.bin/`.

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
})
```

- [ ] **Step 4: Write a smoke test that proves the `@/` alias and TS resolution work**

Create `lib/chat/sanity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getTranslation } from '@/i18n/translations'

describe('vitest setup', () => {
  it('resolves the @/ path alias and imports real project modules', () => {
    expect(getTranslation('ru', 'contact.telegram')).toBe('Написать в Telegram')
    expect(getTranslation('en', 'contact.telegram')).toBe('Message on Telegram')
  })
})
```

- [ ] **Step 5: Run the test suite**

Run: `npm test`
Expected: `1 passed` (the `vitest setup` test), no errors resolving `@/i18n/translations`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/chat/sanity.test.ts
git commit -m "$(cat <<'EOF'
Add Vitest for pure data-function tests

No component/DOM tests — this is a presentational static site with no
existing test infra. Vitest only covers the chat-script data functions
added in later tasks; UI is verified manually via the dev server.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Chat types, outline icons, Sidebar, and ChatShell layout

**Files:**
- Create: `lib/chat/types.ts`
- Create: `lib/chat/nav.ts`
- Create: `components/chat/icons.tsx`
- Create: `components/chat/Sidebar.tsx`
- Create: `components/chat/ChatShell.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `@/contexts/LanguageContext` (existing, produces `{ language: 'en'|'ru', setLanguage, t }`).
- Produces: `ChatBlock`, `ChatMessage`, `ChatScript`, `SuggestedLink` types (consumed by Task 3+). `NAV_SECTIONS: { items: NavItem[] }[]` (consumed only inside `Sidebar.tsx`). `<ChatShell>` component that all pages render inside via the root layout — later tasks do **not** need to import it themselves.

- [ ] **Step 1: Create the chat content types**

Create `lib/chat/types.ts`:

```ts
import type { ReactNode } from 'react'

export type ChatRole = 'visitor' | 'author'

export interface ChatBlockText {
  type: 'text'
  content: ReactNode
}

export interface ChatBlockImage {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

export interface ChatBlockMetrics {
  type: 'metrics'
  items: { value: string; label: string }[]
}

export interface ChatBlockChips {
  type: 'chips'
  items: string[]
}

export interface ChatBlockLinks {
  type: 'links'
  items: { label: string; href: string; variant: 'primary' | 'secondary' }[]
}

export type ChatBlock =
  | ChatBlockText
  | ChatBlockImage
  | ChatBlockMetrics
  | ChatBlockChips
  | ChatBlockLinks

export interface ChatMessage {
  role: ChatRole
  blocks: ChatBlock[]
}

export interface SuggestedLink {
  label: string
  href: string
}

export interface ChatScript {
  title: string
  meta: string
  tags: string[]
  messages: ChatMessage[]
  suggested: SuggestedLink[]
}
```

- [ ] **Step 2: Create the sidebar nav structure (no copy — copy lives in `Sidebar.tsx`)**

Create `lib/chat/nav.ts`:

```ts
export type NavIconName = 'about' | 'isy' | 'agro' | 'contact'

export interface NavItem {
  id: 'about' | 'isy' | 'agro' | 'contact'
  href: string
  icon: NavIconName
}

export const NAV_SECTIONS: { items: NavItem[] }[] = [
  { items: [{ id: 'about', href: '/', icon: 'about' }] },
  {
    items: [
      { id: 'isy', href: '/cases/isy-iseeyou', icon: 'isy' },
      { id: 'agro', href: '/cases/agro-platform', icon: 'agro' },
    ],
  },
  { items: [{ id: 'contact', href: '/contact', icon: 'contact' }] },
]
```

- [ ] **Step 3: Create the outline icon set**

Create `components/chat/icons.tsx`:

```tsx
interface IconProps {
  className?: string
}

export function AboutIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

export function SproutIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 20v-9" />
      <path d="M12 11c4 0 6-2.5 6-6-4 0-6 2.5-6 6z" />
      <path d="M12 13c-3.5 0-5.5-2-5.5-5 3.5 0 5.5 2 5.5 5z" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
```

- [ ] **Step 4: Create the Sidebar component**

Create `components/chat/Sidebar.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { NAV_SECTIONS } from '@/lib/chat/nav'
import { AboutIcon, BarChartIcon, SproutIcon, MailIcon, MenuIcon, CloseIcon } from './icons'

const ICON_COMPONENTS = {
  about: AboutIcon,
  isy: BarChartIcon,
  agro: SproutIcon,
  contact: MailIcon,
}

const NAV_COPY: Record<string, { ru: { title: string; meta: string }; en: { title: string; meta: string } }> = {
  about: {
    ru: { title: 'Обо мне', meta: 'Кто я и что умею' },
    en: { title: 'About', meta: 'Who I am' },
  },
  isy: {
    ru: { title: 'Мониторинг инфраструктуры', meta: 'B2B · 2025' },
    en: { title: 'Infrastructure Monitoring', meta: 'B2B · 2025' },
  },
  agro: {
    ru: { title: 'Агроплатформа', meta: 'AgTech · 2023–2024' },
    en: { title: 'Agricultural Platform', meta: 'AgTech · 2023–2024' },
  },
  contact: {
    ru: { title: 'Контакты', meta: 'Telegram · LinkedIn · CV' },
    en: { title: 'Contact', meta: 'Telegram · LinkedIn · CV' },
  },
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-3 pb-5 mb-4 border-b border-gray-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
          YT
        </div>
        <div>
          <div className="text-[15px] font-semibold text-gray-100">Yaroslav Tarasov</div>
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Product Designer
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {NAV_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {sectionIndex > 0 && <div className="h-px bg-gray-800/50 my-2.5 mx-3" />}
            {section.items.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon]
              const copy = NAV_COPY[item.id][language]
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 transition-colors ${
                    isActive ? 'bg-blue-500/10' : 'hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] mt-0.5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                  <div>
                    <div className={`text-[13.5px] font-medium leading-snug ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                      {copy.title}
                    </div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">{copy.meta}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="pt-3 mt-2 border-t border-gray-800/50 flex items-center justify-between px-3 pb-1">
        <div className="flex gap-0.5 bg-gray-900/50 rounded-lg p-0.5">
          {(['ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                language === lang ? 'bg-gray-700/60 text-gray-100' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        <a
          href="/Tarasov Yaroslav (4).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
        >
          {language === 'ru' ? '↓ Резюме' : '↓ Resume'}
        </a>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <aside className="hidden md:flex w-72 flex-shrink-0 flex-col bg-gray-900/40 backdrop-blur-sm border-r border-gray-800/50 px-3 py-5 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 text-gray-300"
        aria-label="Open menu"
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-gray-950 border-r border-gray-800 z-50 md:hidden px-3 py-5 flex flex-col"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400"
                aria-label="Close menu"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
              <SidebarContent onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 5: Create the ChatShell layout wrapper**

Create `components/chat/ChatShell.tsx`:

```tsx
'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function ChatShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
```

- [ ] **Step 6: Wire `ChatShell` into the root layout**

Modify `app/layout.tsx` — add the import and wrap `{children}`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSetter from "@/components/LanguageSetter";
import ChatShell from "@/components/chat/ChatShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Yaroslav Tarasov — Product Designer / UI & UX",
  description: "Product Designer / UI & UX. I create intuitive interfaces and think through user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-950" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} antialiased bg-gray-950 text-gray-100`}>
        <LanguageProvider>
          <LanguageSetter />
          <ChatShell>{children}</ChatShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000`.

Check:
- Sidebar renders on the left with three visually separated groups (About alone, then the two case items, then Contact alone), a thin divider between each group.
- "Обо мне" is highlighted (active) since the path is `/`.
- Clicking the RU/EN toggle at the bottom of the sidebar switches every sidebar label's language immediately.
- Clicking "↓ Резюме" opens `Tarasov Yaroslav (4).pdf` in a new tab.
- Clicking the ISY or Agro sidebar items navigates to the still-unmodified old long-form case pages — expected at this point in the plan, they get rewritten in Tasks 4–5.
- Clicking "Контакты" 404s — expected, `/contact` is created in Task 6.
- Resize the browser below 768px width (or use dev tools device toolbar): the sidebar disappears, a hamburger button appears top-left; clicking it slides in the drawer with a backdrop; clicking the backdrop or the close button closes it.

- [ ] **Step 8: Commit**

```bash
git add lib/chat/types.ts lib/chat/nav.ts components/chat/icons.tsx components/chat/Sidebar.tsx components/chat/ChatShell.tsx app/layout.tsx
git commit -m "$(cat <<'EOF'
Add chat sidebar shell and outline icon set

Sidebar groups About / cases / Contact with dividers, RU/EN toggle, and
resume download, matching the approved chat-portfolio mockup. Wired into
the root layout so it persists across route navigations.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Chat rendering primitives, About chat script, and home page rewrite

**Files:**
- Create: `lib/chat/scripts/about.ts`
- Create: `lib/chat/scripts/about.test.ts`
- Create: `components/chat/ChatHeader.tsx`
- Create: `components/chat/ChatMessageList.tsx`
- Create: `components/chat/SuggestedQuestions.tsx`
- Create: `components/chat/TelegramCta.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `ChatScript`, `ChatMessage`, `SuggestedLink` types from Task 2 (`lib/chat/types.ts`). `getTranslation` from `@/i18n/translations` (existing). `ImageModal` from `@/components/ImageModal` (existing, unmodified).
- Produces: `getAboutChat(language: 'en' | 'ru'): ChatScript`, and the shared components `<ChatHeader icon meta title tags>`, `<ChatMessageList messages>`, `<SuggestedQuestions items>`, `<TelegramCta>` — reused as-is by Tasks 4–6.

- [ ] **Step 1: Write the failing test for the About chat script**

Create `lib/chat/scripts/about.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getAboutChat } from './about'

describe('getAboutChat', () => {
  it('returns the same number of messages for ru and en', () => {
    const ru = getAboutChat('ru')
    const en = getAboutChat('en')
    expect(ru.messages.length).toBe(en.messages.length)
    expect(ru.messages.length).toBeGreaterThan(0)
  })

  it('returns the same number of suggested links for ru and en', () => {
    const ru = getAboutChat('ru')
    const en = getAboutChat('en')
    expect(ru.suggested.length).toBe(en.suggested.length)
    expect(ru.suggested.length).toBeGreaterThan(0)
  })

  it('every message has at least one block', () => {
    const messages = getAboutChat('ru').messages
    for (const message of messages) {
      expect(message.blocks.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './about'` (the file doesn't exist yet).

- [ ] **Step 3: Implement the About chat script**

Create `lib/chat/scripts/about.ts`:

```ts
import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getAboutChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)

  return {
    title: language === 'ru' ? 'Обо мне' : 'About',
    meta: language === 'ru' ? 'Product Designer · 5+ лет' : 'Product Designer · 5+ years',
    tags: ['Product Design', 'B2B', language === 'ru' ? '5+ лет' : '5+ years'],
    messages: [
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Привет! Меня зовут Ярослав Тарасов, это моё портфолио — в формате чата, чтобы было интереснее листать.'
              : "Hi! I'm Yaroslav Tarasov, and this is my portfolio — in a chat format, to make it more interesting to browse.",
          },
          { type: 'text', content: t('about.paragraph1') },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Что ты умеешь?' : 'What can you do?' }],
      },
      {
        role: 'author',
        blocks: [
          { type: 'text', content: `${t('skills.productDesign.title')} — ${t('skills.productDesign.description')}` },
          { type: 'text', content: `${t('skills.designSystems.title')} — ${t('skills.designSystems.description')}` },
          { type: 'text', content: `${t('skills.processes.title')} — ${t('skills.processes.description')}` },
          {
            type: 'chips',
            items: ['UX/UI Design', 'User Research', 'Dashboards', 'Design Systems', 'Prototyping', 'Information Architecture'],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Кейс: мониторинг инфраструктуры →' : 'Case: infrastructure monitoring →', href: '/cases/isy-iseeyou' },
      { label: language === 'ru' ? 'Кейс: агроплатформа →' : 'Case: agricultural platform →', href: '/cases/agro-platform' },
      { label: language === 'ru' ? 'Как связаться →' : 'Get in touch →', href: '/contact' },
    ],
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all 3 tests in `about.test.ts` green, plus the Task 1 sanity test.

- [ ] **Step 5: Create the chat header component**

Create `components/chat/ChatHeader.tsx`:

```tsx
import type { ReactNode } from 'react'

interface ChatHeaderProps {
  icon: ReactNode
  title: string
  tags: string[]
}

export default function ChatHeader({ icon, title, tags }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-2.5 px-6 sm:px-10 py-4 border-b border-gray-800/50 bg-gray-950/90 backdrop-blur-sm">
      <span className="w-[18px] h-[18px] text-gray-400 flex-shrink-0">{icon}</span>
      <h1 className="text-[15px] font-semibold text-gray-100">{title}</h1>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-[11px] text-gray-400 border border-gray-700/50 rounded-full px-2.5 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </header>
  )
}
```

- [ ] **Step 6: Create the message list component**

Create `components/chat/ChatMessageList.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageModal from '@/components/ImageModal'
import type { ChatMessage } from '@/lib/chat/types'

export default function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 space-y-7">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`flex gap-3.5 ${message.role === 'visitor' ? 'justify-end' : ''}`}
        >
          {message.role === 'visitor' ? (
            <div className="bg-gray-800/60 rounded-2xl rounded-tr-sm px-4 py-2.5 text-[14.5px] text-gray-100 max-w-[75%]">
              {message.blocks.map((block, i) => (block.type === 'text' ? <span key={i}>{block.content}</span> : null))}
            </div>
          ) : (
            <>
              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mt-0.5">
                YT
              </div>
              <div className="min-w-0 flex-1 space-y-3 text-[14.5px] leading-relaxed text-gray-200">
                {message.blocks.map((block, i) => {
                  if (block.type === 'text') {
                    return <p key={i}>{block.content}</p>
                  }
                  if (block.type === 'image') {
                    return (
                      <div key={i}>
                        <button
                          type="button"
                          onClick={() => setZoomedImage({ src: block.src, alt: block.alt })}
                          className="block w-full rounded-xl border border-gray-800/50 overflow-hidden cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={block.src} alt={block.alt} loading="lazy" className="w-full h-auto" />
                        </button>
                        {block.caption && <p className="text-xs text-gray-500 mt-1.5">{block.caption}</p>}
                      </div>
                    )
                  }
                  if (block.type === 'metrics') {
                    return (
                      <div key={i} className="flex flex-wrap gap-3">
                        {block.items.map((item) => (
                          <div key={item.label} className="bg-gray-900/40 border border-gray-800/50 rounded-xl px-4 py-3 min-w-[140px]">
                            <div className="text-lg font-bold text-blue-400">{item.value}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  if (block.type === 'chips') {
                    return (
                      <div key={i} className="flex flex-wrap gap-2">
                        {block.items.map((chip) => (
                          <span key={chip} className="text-xs text-gray-400 bg-gray-800/30 border border-gray-700/30 rounded-full px-3 py-1.5">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )
                  }
                  if (block.type === 'links') {
                    return (
                      <div key={i} className="flex flex-col sm:flex-row gap-3 pt-1">
                        {block.items.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={
                              link.variant === 'primary'
                                ? 'flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                                : 'flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700'
                            }
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </>
          )}
        </motion.div>
      ))}

      {zoomedImage && (
        <ImageModal src={zoomedImage.src} alt={zoomedImage.alt} isOpen={true} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  )
}
```

- [ ] **Step 7: Create the suggested-questions component**

Create `components/chat/SuggestedQuestions.tsx`:

```tsx
import Link from 'next/link'
import type { SuggestedLink } from '@/lib/chat/types'

export default function SuggestedQuestions({ items }: { items: SuggestedLink[] }) {
  if (items.length === 0) return null
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-4 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="text-[13px] text-gray-400 border border-gray-800/50 rounded-full px-4 py-2 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
```

- [ ] **Step 8: Create the Telegram CTA component**

Create `components/chat/TelegramCta.tsx`:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowUpRightIcon } from './icons'

export default function TelegramCta() {
  const { language } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-8">
      <a
        href="https://t.me/yatarasov"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-gray-900/40 border border-gray-800/50 rounded-2xl px-4 py-3.5 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
      >
        {language === 'ru' ? 'Написать мне в Telegram' : 'Message me on Telegram'}
        <span className="ml-auto w-[30px] h-[30px] rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
          <ArrowUpRightIcon className="w-[15px] h-[15px] text-white" />
        </span>
      </a>
    </div>
  )
}
```

- [ ] **Step 9: Replace the home page**

Modify `app/page.tsx` — replace the entire file:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getAboutChat } from '@/lib/chat/scripts/about'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { AboutIcon } from '@/components/chat/icons'

export default function Home() {
  const { language } = useLanguage()
  const chat = getAboutChat(language)

  return (
    <>
      <ChatHeader icon={<AboutIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
```

- [ ] **Step 10: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000`.

Check:
- The About chat renders: author avatar "YT", greeting message, visitor bubble "Что ты умеешь?", skills reply with chip row.
- Switching RU/EN in the sidebar updates all message text immediately.
- The three suggested-question pills at the bottom link to `/cases/isy-iseeyou`, `/cases/agro-platform`, `/contact` (the first two still show the old unmodified case pages — expected until Tasks 4–5; the third still 404s — expected until Task 6).
- The Telegram CTA at the very bottom opens `https://t.me/yatarasov` in a new tab.
- Messages fade/slide in on load (Framer Motion).

- [ ] **Step 11: Commit**

```bash
git add lib/chat/scripts/about.ts lib/chat/scripts/about.test.ts components/chat/ChatHeader.tsx components/chat/ChatMessageList.tsx components/chat/SuggestedQuestions.tsx components/chat/TelegramCta.tsx app/page.tsx
git commit -m "$(cat <<'EOF'
Rewrite home page as the About chat

Adds the shared chat rendering primitives (header, message list with
text/image/metrics/chips/links blocks, suggested-question pills, Telegram
CTA) reused by every subsequent chat page.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: ISY case chat script and page rewrite

**Files:**
- Create: `lib/chat/scripts/isy.ts`
- Create: `lib/chat/scripts/isy.test.ts`
- Modify: `app/cases/isy-iseeyou/page.tsx`
- Delete: `app/cases/isy-iseeyou/data.ts`

**Interfaces:**
- Consumes: `ChatScript` type, `getTranslation`/`TranslationKey` (for `case.isy.roles.*` keys), the shared components from Task 3.
- Produces: `getIsyChat(language: 'en' | 'ru'): ChatScript`.

- [ ] **Step 1: Write the failing tests**

Create `lib/chat/scripts/isy.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getIsyChat } from './isy'

describe('getIsyChat', () => {
  it('returns the same number of messages for ru and en', () => {
    expect(getIsyChat('ru').messages.length).toBe(getIsyChat('en').messages.length)
    expect(getIsyChat('ru').messages.length).toBeGreaterThan(0)
  })

  it('does not mention Kaspersky anywhere in the case', () => {
    const text = JSON.stringify(getIsyChat('ru'))
    expect(text.toLowerCase()).not.toContain('касперск')
  })

  it('does not use the word "инфобез"', () => {
    const text = JSON.stringify(getIsyChat('ru'))
    expect(text.toLowerCase()).not.toContain('инфобез')
  })

  it('includes the three result metrics', () => {
    const metricsBlock = getIsyChat('ru').messages
      .flatMap((m) => m.blocks)
      .find((b) => b.type === 'metrics')
    expect(metricsBlock).toBeDefined()
    if (metricsBlock?.type === 'metrics') {
      expect(metricsBlock.items).toHaveLength(3)
    }
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './isy'`.

- [ ] **Step 3: Implement the ISY chat script**

Create `lib/chat/scripts/isy.ts`:

```ts
import { getTranslation, TranslationKey } from '@/i18n/translations'
import type { ChatScript } from '@/lib/chat/types'

export function getIsyChat(language: 'en' | 'ru'): ChatScript {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const roleIds = ['ciso', 'departmentHead', 'itOperator', 'auditor'] as const

  return {
    title: language === 'ru' ? 'ISY — дашборд для мониторинга инфраструктуры' : 'ISY — infrastructure monitoring dashboard',
    meta: 'B2B · 2025',
    tags: ['B2B', 'Analytics', 'Info sec', '2025'],
    messages: [
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Расскажи про этот проект' : 'Tell me about this project' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'ISY (I See You) — внутренний B2B-продукт для мониторинга инфраструктуры. До него команда собирала статистику вручную: выгрузки в Excel, графики руками, часы на каждый отчёт.'
              : 'ISY (I See You) is an internal B2B product for infrastructure monitoring. Before it, the team collected statistics manually: Excel exports, hand-built charts, hours per report.',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Я спроектировал автоматизированный дашборд — единое окно, где данные видны в реальном времени, от общей картины до деталей по каждому сервису.'
              : 'I designed an automated dashboard — a single window where data is visible in real time, from the big picture down to details for each service.',
          },
          {
            type: 'image',
            src: '/cases/isy-iseeyou/images/laptop-dashboard.png',
            alt: language === 'ru' ? 'Дашборд для топ-менеджмента' : 'Executive dashboard',
            caption: language === 'ru' ? 'Главный экран дашборда' : 'Dashboard main screen',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Какая была твоя роль?' : 'What was your role?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru'
              ? 'Изучил ручной процесс сбора статистики и сегментировал аудиторию: C-level, комплаенс, security-team. Построил структуру от общего к частному — от главных сущностей до детализированных авточеков по каждому сервису.'
              : 'I studied the manual statistics collection process and segmented the audience: C-level, compliance, security team. Built a structure from general to specific — from main entities down to detailed autochecks per service.',
          },
          {
            type: 'text',
            content: language === 'ru'
              ? 'Спроектировал систему фильтров и визуальный язык для уровней риска и статусов. Сервис переводили с Angular на единую B2B дизайн-систему на React — вместе с командой дизайн-системы адаптировал компоненты под специфику дашборда.'
              : 'I designed a filtering system and a visual language for risk levels and statuses. The service was migrated from Angular to a unified B2B design system on React — together with the design system team, I adapted components to the dashboard specifics.',
          },
          {
            type: 'image',
            src: '/cases/isy-iseeyou/images/table_filter.png',
            alt: language === 'ru' ? 'Настройки таблицы' : 'Table settings',
          },
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'Для кого именно этот дашборд?' : 'Who exactly is this dashboard for?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'text',
            content: language === 'ru' ? 'Дашборд закрывает задачи сразу нескольких ролей:' : 'The dashboard covers the needs of several different roles:',
          },
          ...roleIds.map((id) => ({
            type: 'text' as const,
            content: `${t(`case.isy.roles.${id}.role` as TranslationKey)} — ${t(`case.isy.roles.${id}.tasks` as TranslationKey)}.`,
          })),
        ],
      },
      {
        role: 'visitor',
        blocks: [{ type: 'text', content: language === 'ru' ? 'И что получилось?' : 'And what came out of it?' }],
      },
      {
        role: 'author',
        blocks: [
          {
            type: 'metrics',
            items: [
              { value: language === 'ru' ? 'Часы → минуты' : 'Hours → minutes', label: language === 'ru' ? 'генерация отчётов' : 'report generation' },
              { value: language === 'ru' ? '1 окно' : '1 window', label: language === 'ru' ? 'вместо ручных выгрузок' : 'instead of manual exports' },
              { value: 'Real-time', label: language === 'ru' ? 'данные без ожидания' : 'data with no waiting' },
            ],
          },
        ],
      },
    ],
    suggested: [
      { label: language === 'ru' ? 'Кейс: агроплатформа →' : 'Case: agricultural platform →', href: '/cases/agro-platform' },
      { label: language === 'ru' ? 'Обо мне →' : 'About me →', href: '/' },
    ],
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 4 tests in `isy.test.ts` green.

- [ ] **Step 5: Replace the ISY case page**

Modify `app/cases/isy-iseeyou/page.tsx` — replace the entire file:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getIsyChat } from '@/lib/chat/scripts/isy'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { BarChartIcon } from '@/components/chat/icons'

export default function IsyCasePage() {
  const { language } = useLanguage()
  const chat = getIsyChat(language)

  return (
    <>
      <ChatHeader icon={<BarChartIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
```

- [ ] **Step 6: Delete the now-unused data file**

```bash
git rm app/cases/isy-iseeyou/data.ts
```

- [ ] **Step 7: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000/cases/isy-iseeyou`.

Check:
- Chat renders with the visitor/author exchange described above, including the dashboard screenshot (click it — `ImageModal` should open it full-screen, click again/Escape to close).
- The four role lines render actual RU copy (e.g. "CISO / Директор по безопасности — Следить за общей картиной...").
- The three metric cards render at the end ("Часы → минуты", "1 окно", "Real-time").
- No mention of "Касперский"/"Kaspersky" or the word "инфобез" anywhere on the page.
- Switching to EN re-renders everything in English.

- [ ] **Step 8: Commit**

```bash
git add lib/chat/scripts/isy.ts lib/chat/scripts/isy.test.ts app/cases/isy-iseeyou/page.tsx
git commit -m "$(cat <<'EOF'
Rewrite ISY case page as a scripted chat

Condensed from the existing long-form case content: intro, role/process,
four representative stakeholder roles, and the three result metrics.
Employer name and the word "инфобез" are excluded per spec, enforced by
a regression test.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Agro case chat script and page rewrite

**Files:**
- Create: `lib/chat/scripts/agro.ts`
- Create: `lib/chat/scripts/agro.test.ts`
- Modify: `app/cases/agro-platform/page.tsx`
- Delete: `app/cases/agro-platform/data.ts`
- Delete: `app/cases/agro-platform/functions-data.ts`

**Interfaces:**
- Consumes: `ChatScript` type, the shared components from Task 3.
- Produces: `getAgroChat(language: 'en' | 'ru'): ChatScript`.

- [ ] **Step 1: Write the failing tests**

Create `lib/chat/scripts/agro.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getAgroChat } from './agro'

describe('getAgroChat', () => {
  it('returns the same number of messages for ru and en', () => {
    expect(getAgroChat('ru').messages.length).toBe(getAgroChat('en').messages.length)
    expect(getAgroChat('ru').messages.length).toBeGreaterThan(0)
  })

  it('does not include fabricated metrics', () => {
    const hasMetrics = getAgroChat('ru').messages.some((m) => m.blocks.some((b) => b.type === 'metrics'))
    expect(hasMetrics).toBe(false)
  })

  it('lists the five platform modules as chips', () => {
    const chipsBlock = getAgroChat('ru').messages
      .flatMap((m) => m.blocks)
      .find((b) => b.type === 'chips')
    expect(chipsBlock).toBeDefined()
    if (chipsBlock?.type === 'chips') {
      expect(chipsBlock.items).toHaveLength(5)
    }
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './agro'`.

- [ ] **Step 3: Implement the Agro chat script**

Create `lib/chat/scripts/agro.ts`:

```ts
import type { ChatScript } from '@/lib/chat/types'

export function getAgroChat(language: 'en' | 'ru'): ChatScript {
  return {
    title: language === 'ru' ? 'Агроплатформа' : 'Agricultural platform',
    meta: 'AgTech · 2023–2024',
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
      { label: language === 'ru' ? 'Кейс: мониторинг инфраструктуры →' : 'Case: infrastructure monitoring →', href: '/cases/isy-iseeyou' },
      { label: language === 'ru' ? 'Обо мне →' : 'About me →', href: '/' },
    ],
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 3 tests in `agro.test.ts` green.

- [ ] **Step 5: Replace the Agro case page**

Modify `app/cases/agro-platform/page.tsx` — replace the entire file:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getAgroChat } from '@/lib/chat/scripts/agro'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'
import TelegramCta from '@/components/chat/TelegramCta'
import { SproutIcon } from '@/components/chat/icons'

export default function AgroPlatformCasePage() {
  const { language } = useLanguage()
  const chat = getAgroChat(language)

  return (
    <>
      <ChatHeader icon={<SproutIcon className="w-full h-full" />} title={chat.title} tags={chat.tags} />
      <ChatMessageList messages={chat.messages} />
      <SuggestedQuestions items={chat.suggested} />
      <TelegramCta />
    </>
  )
}
```

- [ ] **Step 6: Delete the now-unused data files**

```bash
git rm app/cases/agro-platform/data.ts app/cases/agro-platform/functions-data.ts
```

- [ ] **Step 7: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000/cases/agro-platform`.

Check:
- Chat renders the four-exchange conversation, hero image, the five-item chip row, and the two supporting images (fields management, Gantt chart) — click each to confirm `ImageModal` zoom works.
- No metric cards appear anywhere on this page (unlike ISY).
- Switching to EN re-renders everything in English.

- [ ] **Step 8: Commit**

```bash
git add lib/chat/scripts/agro.ts lib/chat/scripts/agro.test.ts app/cases/agro-platform/page.tsx
git commit -m "$(cat <<'EOF'
Rewrite Agro Platform case page as a scripted chat

Condensed from the existing long-form case content: intro, research
approach, five platform modules as chips + two supporting screenshots,
and user validation. No fabricated metrics, per spec.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Contact page

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `getTranslation` (reuses existing `contact.title`, `contact.description`, `contact.telegram`, `contact.linkedin`, `nav.contact` keys — no new copy needed), `ChatMessage`/`ChatBlockLinks` types, `ChatHeader`/`ChatMessageList` from Task 3.
- Produces: the `/contact` route the sidebar already links to since Task 2.

- [ ] **Step 1: Create the Contact page**

Create `app/contact/page.tsx`:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/i18n/translations'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatMessageList from '@/components/chat/ChatMessageList'
import { MailIcon } from '@/components/chat/icons'
import type { ChatMessage } from '@/lib/chat/types'

export default function ContactPage() {
  const { language, t } = useLanguage()

  const messages: ChatMessage[] = [
    {
      role: 'author',
      blocks: [
        { type: 'text', content: t('contact.title') },
        { type: 'text', content: t('contact.description') },
        {
          type: 'links',
          items: [
            { label: t('contact.telegram'), href: 'https://t.me/yatarasov', variant: 'primary' },
            { label: t('contact.linkedin'), href: 'https://www.linkedin.com/in/yatarasov/', variant: 'secondary' },
            {
              label: language === 'ru' ? 'Скачать резюме (PDF)' : 'Download resume (PDF)',
              href: '/Tarasov Yaroslav (4).pdf',
              variant: 'secondary',
            },
          ],
        },
      ],
    },
  ]

  return (
    <>
      <ChatHeader
        icon={<MailIcon className="w-full h-full" />}
        title={getTranslation(language, 'nav.contact')}
        tags={['Telegram', 'LinkedIn', 'CV']}
      />
      <ChatMessageList messages={messages} />
    </>
  )
}
```

- [ ] **Step 2: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000/contact`.

Check:
- "Контакты" is now highlighted (active) in the sidebar.
- The single author message renders the title/description text and three buttons: "Написать в Telegram" (white, primary) opens `t.me/yatarasov`; "LinkedIn" (dark, secondary) opens the LinkedIn profile; "Скачать резюме (PDF)" opens the résumé PDF. All three open in a new tab.
- Switching to EN updates the heading/body text and button labels.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "$(cat <<'EOF'
Add /contact route

Single-message chat page reusing the existing contact.* translations;
completes the four sidebar destinations (About, ISY, Agro, Contact).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Remove dead components and verify the full build

**Files:**
- Delete: `components/Timeline.tsx`
- Delete: `components/CaseImage.tsx`
- Delete: `components/CaseTimeline.tsx`
- Delete: `components/SectionTitle.tsx`
- Delete: `components/ProjectCard.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new — this task only removes files confirmed unreferenced, and is the final verification gate for the whole plan.

- [ ] **Step 1: Confirm `Header.tsx` is still needed (must NOT be deleted)**

Run: `grep -rn "components/Header'" app`
Expected: exactly one match, `app/cases/product-roadmap/page.tsx` — confirming `Header.tsx` stays because the (intentionally untouched) Product Roadmap page still imports it.

- [ ] **Step 2: Confirm `Timeline.tsx` has zero references**

Run: `grep -rln "components/Timeline'" app components`
Expected: no output (empty) — `Timeline.tsx` was already unused before this plan.

- [ ] **Step 3: Confirm `CaseImage.tsx` has zero references**

Run: `grep -rln "components/CaseImage'" app components`
Expected: no output — already unused before this plan.

- [ ] **Step 4: Confirm `CaseTimeline.tsx` has zero references**

Run: `grep -rln "components/CaseTimeline'" app components`
Expected: no output — was only used by the now-rewritten ISY and Agro case pages (Tasks 4–5).

- [ ] **Step 5: Confirm `SectionTitle.tsx` has zero references**

Run: `grep -rln "components/SectionTitle'" app components`
Expected: no output — was only used by the now-rewritten home page (Task 3).

- [ ] **Step 6: Confirm `ProjectCard.tsx` has zero references**

Run: `grep -rln "components/ProjectCard'" app components`
Expected: no output — was only used by the now-rewritten home page (Task 3).

- [ ] **Step 7: Delete the confirmed-dead files**

```bash
git rm components/Timeline.tsx components/CaseImage.tsx components/CaseTimeline.tsx components/SectionTitle.tsx components/ProjectCard.tsx
```

- [ ] **Step 8: Run the full test suite**

Run: `npm test`
Expected: PASS — sanity test + about/isy/agro parity tests, 11 tests total, 0 failures.

- [ ] **Step 9: Run the production static-export build**

Run: `npm run build`
Expected: build succeeds (`✓ Compiled successfully`, `✓ Generating static pages`), no TypeScript errors, no broken imports. This is the project's primary type-safety net since there is no component test suite — it will fail loudly if Step 7 deleted something still referenced somewhere.

- [ ] **Step 10: Final manual smoke test of every route**

Run: `npm run dev`, then in the browser check each of:
- `/` — About chat, sidebar highlights "Обо мне".
- `/cases/isy-iseeyou` — ISY chat, sidebar highlights the ISY item.
- `/cases/agro-platform` — Agro chat, sidebar highlights the Agro item.
- `/contact` — Contact chat, sidebar highlights "Контакты".
- `/cases/product-roadmap` — still renders the old long-form page (unmodified, unlinked from the sidebar — reachable only by direct URL, as before this plan).
- Mobile width (< 768px) on at least one route: hamburger opens/closes the drawer correctly.

- [ ] **Step 11: Commit**

```bash
git commit -m "$(cat <<'EOF'
Remove dead components superseded by the chat redesign

Timeline.tsx and CaseImage.tsx were already unused; CaseTimeline.tsx,
SectionTitle.tsx, and ProjectCard.tsx became unused once the home, ISY,
and Agro pages were rewritten as chats. Header.tsx and the animations/*
helpers are kept — still used by the untouched Product Roadmap page.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** three-section sidebar with dividers (Task 2), outline icons/no emoji (Task 2), first-person voice throughout (Tasks 3–6 content), no "инфобез"/no Kaspersky in ISY (Task 4, enforced by test), honest Telegram CTA with no "срежиссировано" disclaimer (Task 3's `TelegramCta`), no fabricated Agro metrics (Task 5, enforced by test), Product Roadmap excluded from nav and otherwise untouched (Task 2's `NAV_SECTIONS` never includes it; Global Constraints call it out explicitly), `/contact` route (Task 6), static export/GitHub Pages deployment unaffected (no changes to `next.config.ts`, `.github/workflows/`, verified by the Task 7 build). All spec sections are covered.
- **Type consistency:** `ChatScript`/`ChatMessage`/`ChatBlock` (Task 2) are the single source of type truth imported unchanged by Tasks 3–6; `getAboutChat`/`getIsyChat`/`getAgroChat` all share the exact `(language: 'en' | 'ru') => ChatScript` signature; `ChatHeader`/`ChatMessageList`/`SuggestedQuestions`/`TelegramCta` prop names match their call sites in every consuming page.
- **No placeholders:** every step contains complete, runnable code or an exact shell command with its expected output.
