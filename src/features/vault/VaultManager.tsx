'use client'

import { useState, useMemo, useTransition } from 'react'
import { Input, Button, Dropdown, DropdownContent, DropdownItem, DropdownTrigger, Modal } from '@/components/ui'
import { Search, Filter, SortAsc, SortDesc, Globe, Star } from 'lucide-react'
import { revealPassword } from '@/actions/reveal-password'
import { deleteSavedLogin } from '@/actions/delete-login'
import { toast } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import { EditLoginModal } from '@/features/create-login-form/edit-login-modal'
import { SavedLoginValues } from '@/lib/schemas'
import { LoginItem, LoginItemProps } from './LoginItem'

export const VaultManager = ({ logins }: { logins: LoginItemProps[] }) => {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'date-desc'>('asc')
  const [filterType, setFilterType] = useState<'all' | 'favorites'>('all')

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLogin, setEditingLogin] = useState<(SavedLoginValues & { id: string }) | null>(null)

  const handleEdit = (login: LoginItemProps) => {
    revealPassword(login.id).then((res) => {
      if (res.password) {
        setEditingLogin({
          id: login.id,
          siteName: login.siteName || '',
          username: login.username,
          url: login.url,
          password: res.password
        })
        setIsEditModalOpen(true)
      } else {
        toast.error('Could not load login details')
      }
    })
  }

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [loginToDelete, setLoginToDelete] = useState<LoginItemProps | null>(null)
  const [isDeleting, startDeleteTransition] = useTransition()

  const handleDeleteClick = (login: LoginItemProps) => {
    setLoginToDelete(login)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (!loginToDelete) return

    startDeleteTransition(async () => {
      const result = await deleteSavedLogin(loginToDelete.id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Credential deleted')
        setIsDeleteModalOpen(false)
        setLoginToDelete(null)
      }
    })
  }

  const filteredLogins = useMemo(() => {
    let result = [...logins]

    // 1. Filter by Search
    if (search) {
      const lowerSearch = search.toLowerCase()
      result = result.filter(
        (login) =>
          login.siteName?.toLowerCase().includes(lowerSearch) ||
          login.username.toLowerCase().includes(lowerSearch) ||
          login.url.toLowerCase().includes(lowerSearch)
      )
    }

    // 2. Filter by Type (Favorites)
    if (filterType === 'favorites') {
      result = result.filter((login) => login.isFavorite)
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortOrder === 'date-desc') {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      }

      const nameA = a.siteName || a.url || ''
      const nameB = b.siteName || b.url || ''
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    })

    return result
  }, [logins, search, sortOrder, filterType])

  return (
    <>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Input
              name="search logins"
              startIcon={<Search className="h-4 w-4" />}
              className="pl-9"
              placeholder="Search logins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="outline" size="md" className="gap-2 min-w-25 justify-between">
                  <span className="flex items-center gap-2">
                    {sortOrder === 'asc' && <SortAsc size={16} />}
                    {sortOrder === 'desc' && <SortDesc size={16} />}
                    {sortOrder === 'date-desc' && <Globe size={16} />}
                    {sortOrder === 'asc' ? 'A-Z' : sortOrder === 'desc' ? 'Z-A' : 'Recent'}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownContent align="right">
                <DropdownItem onClick={() => setSortOrder('asc')} icon={<SortAsc size={14} />}>
                  Name (A-Z)
                </DropdownItem>
                <DropdownItem onClick={() => setSortOrder('desc')} icon={<SortDesc size={14} />}>
                  Name (Z-A)
                </DropdownItem>
                <DropdownItem onClick={() => setSortOrder('date-desc')} icon={<Globe size={14} />}>
                  Recently Added
                </DropdownItem>
              </DropdownContent>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="outline" size="md" className="gap-2">
                  <Filter size={16} />
                  {filterType === 'all' ? 'All' : 'Favorites'}
                </Button>
              </DropdownTrigger>
              <DropdownContent align="right">
                <DropdownItem onClick={() => setFilterType('all')}>All Entries</DropdownItem>
                <DropdownItem onClick={() => setFilterType('favorites')} icon={<Star size={14} />}>
                  Favorites
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredLogins.length > 0 ? (
              filteredLogins.map((login) => (
                <LoginItem key={login.id} data={login} onEdit={handleEdit} onDelete={handleDeleteClick} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-text-muted"
              >
                <Search className="mx-auto h-12 w-12 opacity-20 mb-4" />
                <p>No results found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {editingLogin && (
        <EditLoginModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingLogin(null)
          }}
          initialData={editingLogin}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete credential"
        description="Are you sure you want to delete this credential? This action cannot be undone."
      >
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
