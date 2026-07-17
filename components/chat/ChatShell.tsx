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
