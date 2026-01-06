'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
// import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button, Card, Dropdown, DropdownContent, DropdownItem, DropdownSection, DropdownTrigger } from '@components/ui'
import { cn } from '@/lib'

// interface Session {
//   user?: {
//     name?: string | null
//     email?: string | null
//     image?: string | null
//   }
// }

// interface NavBarProps {
//   session: Session | null
// }

export const NavBar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)

    return () => clearTimeout(timer)
  }, [])

  const isAuthenticated = status === 'authenticated'

  return (
    <nav className="w-full max-w-md mt-10 mb-6 px-4">
      <Card variant="glass" padding="xs" className="flex justify-center items-center gap-1 border-white/5 rounded-2xl">
        <NavLink href="/" active={mounted && pathname === '/'}>
          Generator
        </NavLink>
        <NavLink href="/validator" active={pathname === '/validator'}>
          Validator
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink href="/vault" active={mounted && pathname === '/vault'}>
              Vault
            </NavLink>
            <Dropdown>
              <DropdownTrigger>
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={40}
                    height={40}
                    loading="eager"
                    className="rounded-full border border-white/20 object-cover ml-2"
                  />
                )}
              </DropdownTrigger>

              <DropdownContent align="right" className="w-72">
                <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center font-bold text-slate-900">
                    Test
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Logged in as</span>
                    <span className="text-sm font-semibold text-white">Brandon</span>
                  </div>
                </div>

                <DropdownSection>
                  <DropdownItem icon={<User size={16} />}>Profile</DropdownItem>
                </DropdownSection>

                <DropdownSection borderTop>
                  <DropdownItem icon={<LogOut size={16} />} onClick={() => signOut({ callbackUrl: '/login' })}>
                    Log out
                  </DropdownItem>
                </DropdownSection>
              </DropdownContent>
            </Dropdown>
          </>
        ) : (
          <NavLink href="/login" active={pathname === '/login'}>
            Login
          </NavLink>
        )}
      </Card>
    </nav>
  )
}

const NavLink = ({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) => {
  return (
    <Button asChild variant="nav" className="relative px-6 py-2">
      <Link href={href}>
        {active && (
          <motion.div
            layoutId="active-nav"
            className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-lg shadow-primary/20"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className={cn('relative z-10 flex items-center gap-2', active && 'text-white')}>{children}</span>
      </Link>
    </Button>
  )
}
