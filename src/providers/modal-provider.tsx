'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { AddLoginModal } from '@/features/create-login-form/add-login-modal'

interface ModalContextType {
  openAddLoginModal: () => void
  closeAddLoginModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isAddLoginOpen, setIsAddLoginOpen] = useState(false)

  const openAddLoginModal = () => setIsAddLoginOpen(true)
  const closeAddLoginModal = () => setIsAddLoginOpen(false)

  return (
    <ModalContext.Provider value={{ openAddLoginModal, closeAddLoginModal }}>
      {children}
      <AddLoginModal isOpen={isAddLoginOpen} onClose={closeAddLoginModal} />
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
