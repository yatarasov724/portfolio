export type NavIconName = 'about' | 'isy' | 'agro' | 'contact'

export interface NavItem {
  id: 'about' | 'isy' | 'agro' | 'contact'
  href: string
  icon: NavIconName
}

export const NAV_SECTIONS: { items: NavItem[] }[] = [
  { items: [{ id: 'about', href: '/', icon: 'about' }] },
  {
    items: [
      { id: 'isy', href: '/cases/isy-iseeyou', icon: 'isy' },
      { id: 'agro', href: '/cases/agro-platform', icon: 'agro' },
    ],
  },
  { items: [{ id: 'contact', href: '/contact', icon: 'contact' }] },
]
