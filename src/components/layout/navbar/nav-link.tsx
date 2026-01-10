'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { cn } from '@/lib'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive: boolean
}

export const NavLink = ({ href, children, isActive }: NavLinkProps) => {
  return (
    <Button asChild variant="nav" className="relative px-6 py-2">
      <Link href={href}>
        {isActive && (
          <motion.div
            layoutId="active-nav"
            className="bg-primary shadow-primary/20 absolute inset-0 -z-10 rounded-lg shadow-lg"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className={cn('relative z-10 flex items-center gap-2', isActive && 'text-primary-foreground')}>
          {children}
        </span>
      </Link>
    </Button>
  )
}
