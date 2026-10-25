import Link from 'next/link'
import type { CaseLink } from '@/lib/cases'

interface CaseNavProps {
  back: string
  prev: CaseLink | null
  next: CaseLink | null
  number: string
  total: number
}

export default function CaseNav({ back, prev, next, number, total }: CaseNavProps) {
  return (
    <nav className="sw-grid py-4 text-[13px] font-bold" aria-label="Case navigation">
      <Link href="/#work" className="col-span-6 sw-link justify-self-start">
        {back}
      </Link>
      <div className="col-span-6 flex justify-end gap-4">
        {prev && (
          <Link href={`/cases/${prev.slug}`} className="sw-link" aria-label={`${prev.number} ${prev.title}`}>
            ← {prev.number}
          </Link>
        )}
        <span aria-current="page">
          {number} / {String(total).padStart(2, '0')}
        </span>
        {next && (
          <Link href={`/cases/${next.slug}`} className="sw-link" aria-label={`${next.number} ${next.title}`}>
            {next.number} →
          </Link>
        )}
      </div>
    </nav>
  )
}
