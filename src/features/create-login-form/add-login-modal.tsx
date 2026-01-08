'use client'

import { Modal } from '@/components/ui'
import { SavedLoginForm } from './create-login-form'

interface AddLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddLoginModal = ({ isOpen, onClose }: AddLoginModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add new credential"
      description="Enter the details of the new account you want to save."
    >
      <SavedLoginForm onSuccess={onClose} />
    </Modal>
  )
}
