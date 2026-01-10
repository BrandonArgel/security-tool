'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Dropdown, DropdownContent, DropdownItem, DropdownSection, DropdownTrigger } from '@/components/ui'
import type { Session } from 'next-auth'

interface UserMenuProps {
  user: Session['user']
}

export const UserMenu = ({ user }: UserMenuProps) => {
  if (!user) return null

  return (
    <Dropdown className="ml-2 h-10 w-10">
      <DropdownTrigger className="ring-offset-primary focus-visible:ring-primary overflow-hidden rounded-full p-0 ring-offset-2 focus-visible:ring-2">
        {user.image ? (
          <Image
            src={user.image}
            alt={`${user.name}'s profile`}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-700">
            <span className="text-sm font-bold">{user.name?.charAt(0) || 'U'}</span>
          </div>
        )}
      </DropdownTrigger>

      <DropdownContent align="right" className="w-72">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <div className="flex flex-col">
            <span className="text-sm text-text-subtle">Logged in as</span>
            <span className="truncate text-sm font-semibold text-foreground">{user.name || 'User'}</span>
          </div>
        </div>

        <DropdownSection>
          <Link href="/profile">
            <DropdownItem icon={<User size={16} />}>Profile</DropdownItem>
          </Link>
        </DropdownSection>

        <DropdownSection>
          <Link href="/settings">
            <DropdownItem icon={<Settings size={16} />}>Settings</DropdownItem>
          </Link>
        </DropdownSection>

        <DropdownSection borderTop>
          <DropdownItem icon={<LogOut size={16} />} onClick={() => signOut({ callbackUrl: '/login' })}>
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownContent>
    </Dropdown>
  )
}
