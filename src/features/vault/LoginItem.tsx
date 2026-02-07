'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Card,
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  Input
} from '@/components/ui'
import { Copy, Eye, EyeOff, ExternalLink, Globe, Star, MoreVertical, Edit, User, Key, Trash2 } from 'lucide-react'
import { revealPassword } from '@/actions/reveal-password'
import { toggleFavorite } from '@/actions/toggle-favorite'
import { toast } from 'sonner'
import { cn } from '@/lib'
import { motion } from 'framer-motion'
import { useCopyToClipboard } from '@/hooks'

export type LoginItemProps = {
  id: string
  siteName?: string | null
  username: string
  url: string
  createdAt: Date
  isFavorite: boolean
}

export const LoginItem = ({
  data,
  onEdit,
  onDelete
}: {
  data: LoginItemProps
  onEdit: (_data: LoginItemProps) => void
  onDelete: (_data: LoginItemProps) => void
}) => {
  const [, copyPw] = useCopyToClipboard()
  const [, copyUsr] = useCopyToClipboard()
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState<string | null>(null)
  const [isDecrypting, setIsDecrypting] = useState(false)

  const decryptPassword = async () => {
    setIsDecrypting(true)

    try {
      const { password } = await revealPassword(data.id)

      if (!password) throw new Error()

      setPassword(password)

      return password
    } finally {
      setIsDecrypting(false)
    }
  }

  const handleToggle = () => {
    if (isVisible) {
      setIsVisible(false)
      return
    }

    if (password) {
      setIsVisible(true)
      return
    }

    decryptPassword()
    setIsVisible(true)
  }

  const handleCopyPassword = async () => {
    try {
      const pw = password ?? (await decryptPassword())
      const res = await copyPw(pw)

      if (res) {
        toast.success('Password copied to clipboard')
      } else {
        toast.error('Could not copy password')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      } else {
        toast.error('Could not copy password')
      }
    }
  }

  const handleCopyUsername = async () => {
    const res = await copyUsr(data.username)

    if (res) {
      toast.success('Username copied to clipboard')
    } else {
      toast.error('Could not copy username')
    }
  }

  const handleFavorite = async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const result = await toggleFavorite(data.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.isFavorite ? 'Added to favorites' : 'Removed from favorites')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="group relative flex items-center justify-center"
    >
      <Card
        padding="sm"
        className="hover:bg-surface-hover flex w-full flex-col items-center justify-between gap-4 transition-all sm:flex-row"
      >
        <div className="flex w-full min-w-0 flex-1 items-center justify-between gap-4">
          <div className="flex w-full flex-row-reverse items-center justify-between gap-2 sm:flex-row">
            <Button
              variant="ghost"
              onClick={handleFavorite}
              className={cn(
                'rounded-full p-1 transition-colors hover:bg-yellow-500/10',
                data.isFavorite
                  ? 'text-yellow-500 hover:text-yellow-500/75'
                  : 'text-text-muted hover:text-yellow-500/50'
              )}
              aria-label={data.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={cn('h-5 w-5', data.isFavorite && 'fill-current')} />
            </Button>

            <div className="flex w-full items-center justify-between gap-4 overflow-hidden">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                {data.url ? (
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${data.url}&sz=24`}
                    alt={data.siteName || 'Site icon'}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain opacity-80"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <Globe className={cn('h-5 w-5', data.url ? 'hidden' : '')} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-foreground truncate font-semibold">{data.siteName || 'Unnamed Site'}</h3>
                <p className="text-text-muted truncate text-sm">{data.username}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
          <Input
            value={isDecrypting ? 'Decrypting...' : isVisible && password ? password : '••••••••••••'}
            readOnly
            endIcon={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="text-text-muted hover:text-foreground"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            }
          />

          <div className="flex items-center">
            {/* Copy Dropdown */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-muted hover:text-foreground"
                  aria-label="Copy options"
                >
                  <Copy size={18} />
                </Button>
              </DropdownTrigger>
              <DropdownContent align="right">
                <DropdownItem onClick={handleCopyUsername} icon={<User size={14} />}>
                  Copy Username
                </DropdownItem>
                <DropdownItem onClick={handleCopyPassword} icon={<Key size={14} />}>
                  Copy Password
                </DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Actions Dropdown */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-muted hover:text-foreground"
                  aria-label="More actions"
                >
                  <MoreVertical size={18} />
                </Button>
              </DropdownTrigger>
              <DropdownContent align="right">
                <DropdownItem onClick={() => onEdit(data)} icon={<Edit size={14} />}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleFavorite()}
                  icon={<Star size={14} className={data.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''} />}
                >
                  {data.isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                </DropdownItem>
                <DropdownItem onClick={() => onDelete(data)} icon={<Trash2 size={14} />}>
                  Delete
                </DropdownItem>
                {data.url && (
                  <DropdownSection borderTop>
                    <a href={data.url} target="_blank" rel="noopener noreferrer" className="contents">
                      <DropdownItem icon={<ExternalLink size={14} />}>Launch Website</DropdownItem>
                    </a>
                  </DropdownSection>
                )}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
