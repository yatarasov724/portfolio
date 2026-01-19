'use client'

interface SectionTitleProps {
  children: React.ReactNode
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
      {children}
    </h2>
  )
}

