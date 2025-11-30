'use client'

interface SectionTitleProps {
  children: React.ReactNode
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-4xl md:text-5xl font-semibold text-gray-50">
      {children}
    </h2>
  )
}

