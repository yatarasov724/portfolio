'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteCopy, CONTACT_LINKS } from '@/lib/site/copy'

export default function ContactPage() {
  const { language } = useLanguage()
  const copy = getSiteCopy(language)

  const links = [
    { href: CONTACT_LINKS.telegram, label: copy.contactLabels.telegram, arrow: '↗', external: true },
    { href: CONTACT_LINKS.linkedin, label: copy.contactLabels.linkedin, arrow: '↗', external: true },
    { href: CONTACT_LINKS.resume, label: copy.contactLabels.resume, arrow: '↓', external: false },
  ]

  return (
    <section className="sw-grid gap-y-6 pt-12 md:pt-20 pb-12">
      <h1 className="col-span-12 md:col-span-9 text-[clamp(36px,7vw,96px)] font-bold leading-[1] tracking-[-0.045em]">
        {copy.contactTitle}
      </h1>
      <p className="col-span-12 md:col-span-6 text-base text-[color:var(--muted)]">{copy.contactDescription}</p>

      <ul className="col-span-12 mt-8 border-b border-[color:var(--ink)]">
        {links.map((link) => (
          <li key={link.href} className="border-t border-[color:var(--ink)]">
            <a
              href={link.href}
              className="flex items-baseline justify-between gap-4 py-4 md:px-2 text-2xl md:text-4xl font-bold tracking-[-0.03em] hover:bg-[color:var(--ink)] hover:text-[color:var(--bg)] transition-colors"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span>{link.label}</span>
              <span aria-hidden>{link.arrow}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
