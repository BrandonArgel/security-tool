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
    <Dropdown className="ml-2 w-10 h-10">
      <DropdownTrigger className="p-0 rounded-full overflow-hidden ring-offset-2 ring-offset-primary focus-visible:ring-2 focus-visible:ring-primary">
        {user.image ? (
          <Image
            src={user.image}
            alt={`${user.name}'s profile`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-700 ml-2 border border-white/20 flex items-center justify-center">
            <span className="text-xs font-bold">{user.name?.charAt(0) || 'U'}</span>
          </div>
        )}
      </DropdownTrigger>

      <DropdownContent align="right" className="w-72">
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Logged in as</span>
            <span className="text-sm font-semibold text-white truncate">{user.name || 'User'}</span>
          </div>
        </div>

        <DropdownSection>
          <DropdownItem icon={<User size={16} />}>
            <Link href="/profile">Profile</Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection>
          <DropdownItem icon={<Settings size={16} />}>
            <Link href="/settings">Settings</Link>
          </DropdownItem>
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
