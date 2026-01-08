'use client'

import { Modal } from '@/components/ui'
import { SavedLoginForm } from './create-login-form'
import { SavedLoginValues } from '@/lib/schemas'

interface EditLoginModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: SavedLoginValues & { id: string }
}

export const EditLoginModal = ({ isOpen, onClose, initialData }: EditLoginModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Credential"
      description="Update the details of your saved account."
    >
      <SavedLoginForm initialData={initialData} onSuccess={onClose} />
    </Modal>
  )
}
