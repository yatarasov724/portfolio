'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function ChatShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLegacyRoadmapPage = pathname?.startsWith('/cases/product-roadmap')

  if (isLegacyRoadmapPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
