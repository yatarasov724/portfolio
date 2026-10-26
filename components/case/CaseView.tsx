'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { CASE_SLUGS, getCase } from '@/lib/cases'
import type { CaseSlug } from '@/lib/cases'
import { getSiteCopy } from '@/lib/site/copy'
import CaseBlocks from './CaseBlocks'
import CaseNav from './CaseNav'

export default function CaseView({ slug }: { slug: CaseSlug }) {
  const { language } = useLanguage()
  const data = getCase(slug, language)
  const copy = getSiteCopy(language)

  return (
    <article>
      <CaseNav back={copy.caseBack} prev={data.prev} next={data.next} number={data.number} total={CASE_SLUGS.length} />

      <header className="sw-grid gap-y-6 pt-8 md:pt-14 pb-10">
        <h1 className="col-span-12 md:col-span-8 text-[clamp(32px,6vw,84px)] font-bold leading-[1] tracking-[-0.045em]">
          {data.title}
        </h1>
        <p className="col-span-12 md:col-span-4 md:self-end text-sm text-[color:var(--muted)]">
          {data.tags.join(' · ')}
        </p>
      </header>

      {data.facts.length > 0 && (
        <dl className="sw-grid gap-y-3 pb-10">
          {data.facts.map((fact) => (
            <div key={fact.label} className="col-span-12 grid grid-cols-subgrid items-baseline border-t border-[color:var(--ink)] pt-2">
              <dt className="sw-label col-span-12 md:col-span-3">{fact.label}</dt>
              <dd className="col-span-12 md:col-span-9 text-base md:text-[17px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="sw-grid pb-10">
        <div className="col-span-12 md:col-start-4 md:col-span-9">
          <CaseBlocks blocks={data.intro} />
        </div>
      </div>

      {data.sections.map((section, index) => (
        <section key={section.heading} className="sw-grid gap-y-4 py-8">
          <div aria-hidden className="col-span-12 border-t border-[color:var(--ink)]" />
          <h2 className="col-span-12 md:col-span-3 flex gap-3 items-baseline text-sm font-bold md:pr-4">
            <span className="sw-label">{String(index + 1).padStart(2, '0')}</span>
            <span>{section.heading}</span>
          </h2>
          <div className="col-span-12 md:col-span-9">
            <CaseBlocks blocks={section.blocks} />
          </div>
        </section>
      ))}
    </article>
  )
}
