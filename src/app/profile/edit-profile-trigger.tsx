'use client'

import { Button } from '@/components/ui'
import { useModal } from '@/components/providers'

export function EditProfileTrigger() {
  const { openEditProfileModal } = useModal()

  return (
    <Button variant="outline" className="w-full" onClick={openEditProfileModal}>
      Edit Profile
    </Button>
  )
}
