'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Plus } from 'lucide-react'
import { Button, Card, Tooltip } from '@/components/ui'
import { UserMenu } from './user-menu'
import { NAV_ITEMS, AUTH_NAV_ITEMS } from './nav-config'
import { NavLink } from './nav-link'
import { useModal } from '@/components/providers'
import { cn } from '@/lib'

export const Navbar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Use the global modal context
  const { openAddLoginModal } = useModal()

  const isAuthenticated = status === 'authenticated'
  const currentNavItems = isAuthenticated ? [...NAV_ITEMS, ...AUTH_NAV_ITEMS] : NAV_ITEMS

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 py-4">
        <Card
          variant="glass"
          padding="sm"
          className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl border-white/5 bg-surface/80 backdrop-blur-xl"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2 text-foreground transition-colors hover:text-primary">
            <Shield className="h-6 w-6" />
            <span className="hidden text-lg font-bold tracking-tight sm:inline-block">SecurityTool</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {currentNavItems.map((item) => (
              <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Tooltip content="Add Login">
                <Button size="icon" className="hidden rounded-full gap-2 md:flex" onClick={openAddLoginModal}>
                  <Plus className="h-4 w-4" />
                </Button>
              </Tooltip>
            )}

            {isAuthenticated ? (
              <UserMenu user={session?.user} />
            ) : (
              <div className="hidden md:block">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </Card>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[88px] z-30 px-4 md:hidden"
          >
            <Card variant="glass" className="overflow-hidden border-white/5 bg-surface/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-2 p-2">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:bg-white/5 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      openAddLoginModal()
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium hover:bg-primary-hover transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Login
                  </Button>
                )}

                {!isAuthenticated && (
                  <div className="mt-2 border-t border-white/5 pt-2">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Login</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
