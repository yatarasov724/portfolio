'use client'

import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteCopy, CONTACT_LINKS } from '@/lib/site/copy'

export default function SiteFooter() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const copy = getSiteCopy(language)

  if (pathname === '/contact') return null

  const links = [
    { href: CONTACT_LINKS.telegram, label: `${copy.contactLabels.telegram} ↗`, external: true },
    { href: CONTACT_LINKS.linkedin, label: `${copy.contactLabels.linkedin} ↗`, external: true },
    { href: CONTACT_LINKS.resume, label: `${copy.contactLabels.resume} ↓`, external: false },
  ]

  return (
    <footer className="mt-24 border-t-2 border-[color:var(--ink)]">
      <div className="sw-grid gap-y-6 py-10">
        <h2 className="col-span-12 md:col-span-8 text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.98]">
          {copy.contactTitle}
        </h2>
        <p className="col-span-12 md:col-span-4 text-sm text-[color:var(--muted)]">{copy.contactDescription}</p>
        <div className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="sw-link"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
