export type NavIconName = 'about' | 'infra' | 'agro' | 'contact'

export interface NavItem {
  id: 'about' | 'infra' | 'agro' | 'contact'
  href: string
  icon: NavIconName
}

export const NAV_SECTIONS: { items: NavItem[] }[] = [
  { items: [{ id: 'about', href: '/', icon: 'about' }] },
  {
    items: [
      { id: 'infra', href: '/cases/infrastructure-monitoring', icon: 'infra' },
      { id: 'agro', href: '/cases/agro-platform', icon: 'agro' },
    ],
  },
  { items: [{ id: 'contact', href: '/contact', icon: 'contact' }] },
]
