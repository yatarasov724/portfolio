'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteCopy } from '@/lib/site/copy'
import CaseIndex from '@/components/site/CaseIndex'

export default function Home() {
  const { language } = useLanguage()
  const copy = getSiteCopy(language)

  return (
    <>
      <section className="sw-grid pt-12 md:pt-20 pb-12 md:pb-20">
        <h1 className="col-span-12 text-[clamp(40px,9.5vw,132px)] font-bold leading-[0.98] tracking-[-0.05em]">
          {copy.headline}
        </h1>
        <p className="col-span-12 mt-6 text-sm text-[color:var(--muted)]">{copy.specialty}</p>
      </section>

      <section id="work" className="sw-grid scroll-mt-4 gap-y-4">
        <h2 className="sw-label col-span-12 pb-2">{copy.workLabel}</h2>
        <CaseIndex />
      </section>

      <section id="about" className="sw-grid scroll-mt-4 mt-24 gap-y-6">
        <h2 className="sw-label col-span-12 md:col-span-3 border-t border-[color:var(--ink)] pt-3">{copy.aboutLabel}</h2>
        <div className="col-span-12 md:col-span-9 md:border-t border-[color:var(--ink)] md:pt-3 space-y-4 text-base md:text-lg leading-snug max-w-3xl">
          {copy.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="col-span-12 md:col-start-4 md:col-span-9 mt-6">
          {copy.skills.map((skill) => (
            <li
              key={skill.title}
              className="grid md:grid-cols-[1fr_2fr] gap-x-6 gap-y-1 border-t border-[color:var(--ink)] py-3"
            >
              <span className="text-sm font-bold">{skill.title}</span>
              <span className="text-sm text-[color:var(--muted)]">{skill.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
