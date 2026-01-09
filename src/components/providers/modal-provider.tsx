'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { AddLoginModal } from '@/features/create-login-form/add-login-modal'
import { PasswordGeneratorModal } from '@/features/create-login-form/password-generator-modal'

interface ModalContextType {
  newPassword: string
  setNewPassword: (_password: string) => void
  openAddLoginModal: () => void
  closeAddLoginModal: () => void
  openPasswordGeneratorModal: () => void
  closePasswordGeneratorModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [newPassword, setNewPassword] = useState('')
  const [isAddLoginOpen, setIsAddLoginOpen] = useState(false)
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)

  const openAddLoginModal = () => setIsAddLoginOpen(true)
  const closeAddLoginModal = () => setIsAddLoginOpen(false)

  const openPasswordGeneratorModal = () => setIsGeneratorOpen(true)
  const closePasswordGeneratorModal = () => setIsGeneratorOpen(false)

  return (
    <ModalContext.Provider
      value={{
        newPassword,
        setNewPassword,
        openAddLoginModal,
        closeAddLoginModal,
        openPasswordGeneratorModal,
        closePasswordGeneratorModal
      }}
    >
      {children}
      <AddLoginModal isOpen={isAddLoginOpen} onClose={closeAddLoginModal} />
      <PasswordGeneratorModal isOpen={isGeneratorOpen} onClose={closePasswordGeneratorModal} />
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
