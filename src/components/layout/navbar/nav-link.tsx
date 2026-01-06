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
            className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-lg shadow-primary/20"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className={cn('relative z-10 flex items-center gap-2', isActive && 'text-white')}>{children}</span>
      </Link>
    </Button>
  )
}
