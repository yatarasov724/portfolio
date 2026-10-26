'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteCopy } from '@/lib/site/copy'

export default function SiteHeader() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const copy = getSiteCopy(language)

  const links = [
    { href: '/#work', label: copy.nav.work, active: pathname === '/' || pathname?.startsWith('/cases') },
    { href: '/#about', label: copy.nav.about, active: false },
    { href: '/contact', label: copy.nav.contact, active: pathname === '/contact' },
  ]

  return (
    <header className="border-b-2 border-[color:var(--ink)]">
      <div className="sw-grid items-baseline gap-y-2 py-3 text-[13px] font-bold">
        <Link href="/" className="col-span-12 md:col-span-4">
          {copy.name}
        </Link>
        <nav className="col-span-12 md:col-span-8 flex flex-wrap items-baseline gap-x-5 gap-y-1 md:justify-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.active ? 'sw-link' : 'hover:underline underline-offset-4'}
            >
              {link.label}
            </Link>
          ))}
          <span className="flex gap-2" role="group" aria-label="Language">
            {(['ru', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={language === lang ? 'sw-link' : 'text-[color:var(--muted)] hover:underline underline-offset-4'}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </span>
        </nav>
      </div>
    </header>
  )
}
