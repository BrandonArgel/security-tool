'use client'

import { Modal } from '@/components/ui'
import { PasswordGeneratorForm } from './password-generator-form'

interface PasswordGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PasswordGeneratorModal = ({ isOpen, onClose }: PasswordGeneratorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate a new password"
      description="Use the password generator to create a strong password."
    >
      <PasswordGeneratorForm onSuccess={onClose} />
    </Modal>
  )
}
