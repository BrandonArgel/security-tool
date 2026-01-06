'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui'
import { UserMenu } from './user-menu'
import { NAV_ITEMS, AUTH_NAV_ITEMS } from './nav-config'

const NavLink = dynamic(() => import('./nav-link').then((mod) => mod.NavLink), {
  ssr: false,
  loading: () => <button className="px-6 py-2 opacity-0">Loading...</button>
})

export const Navbar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isAuthenticated = status === 'authenticated'

  const currentNavItems = isAuthenticated ? [...NAV_ITEMS, ...AUTH_NAV_ITEMS] : NAV_ITEMS

  return (
    <nav className="w-full max-w-md mt-10 mb-6 px-4">
      <Card variant="glass" padding="xs" className="flex justify-center items-center gap-1 border-white/5 rounded-2xl">
        {currentNavItems.map((item) => (
          <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
            {item.label}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <UserMenu user={session?.user} />
        ) : (
          <NavLink href="/login" isActive={pathname === '/login'}>
            Login
          </NavLink>
        )}
      </Card>
    </nav>
  )
}
