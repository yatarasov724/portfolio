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
        <ul className="col-span-12 md:col-span-4 text-sm border-t border-[color:var(--ink)] pt-2 space-y-1">
          {data.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>

      <div className="sw-grid pb-10">
        <div className="col-span-12 md:col-start-4 md:col-span-9">
          <CaseBlocks blocks={data.intro} />
        </div>
      </div>

      {data.sections.map((section, index) => (
        <section key={section.heading} className="sw-grid gap-y-4 py-8 border-t border-[color:var(--ink)] first:border-t-0">
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
