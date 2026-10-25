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
  const current = Number(number)
  const numbers = Array.from({ length: total }, (_, i) => i + 1)

  const target = (n: number): CaseLink | null => {
    if (n === current - 1) return prev
    if (n === current + 1) return next
    return null
  }

  return (
    <nav className="sw-grid py-4 text-[13px] font-bold" aria-label="Case navigation">
      <Link href="/#work" className="col-span-6 sw-link justify-self-start">
        {back}
      </Link>
      <div className="col-span-6 flex justify-end gap-2">
        {numbers.map((n) => {
          const label = String(n).padStart(2, '0')
          const link = target(n)
          if (n === current) return <span key={n} aria-current="page">{label}</span>
          return link ? (
            <Link key={n} href={`/cases/${link.slug}`} className="sw-link" aria-label={link.title}>
              {label}
            </Link>
          ) : (
            <span key={n} className="text-[color:var(--muted)]">{label}</span>
          )
        })}
        <span className="text-[color:var(--muted)]">/ {String(total).padStart(2, '0')}</span>
      </div>
    </nav>
  )
}
