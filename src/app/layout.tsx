'use client'

import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Card } from '@components/ui'
import { cn } from '@/lib'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <html lang="es">
      <body className="bg-surface-dark text-white min-h-screen flex flex-col items-center">
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'bg-surface border-border text-white rounded-xl'
          }}
          theme="dark"
          duration={2000}
          richColors
        />

        <nav className="w-full max-w-md mt-10 mb-6 px-4 select-none">
          <Card variant="glass" padding="xs" className="flex justify-center gap-1 border-white/5 rounded-2xl">
            <NavLink href="/" active={pathname === '/'}>
              Generator
            </NavLink>
            <NavLink href="/validator" active={pathname === '/validator'}>
              Validator
            </NavLink>
          </Card>
        </nav>

        <main className="w-full max-w-2xl px-4 flex-1 select-none">{children}</main>
      </body>
    </html>
  )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
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
