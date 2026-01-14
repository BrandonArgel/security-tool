'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Modal, Button, Input } from '@/components/ui'
import { updateProfile } from '@/actions/update-profile'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
})

type FormData = z.infer<typeof schema>

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { data: session, update } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  })

  useEffect(() => {
    if (session?.user?.name) {
      reset({ name: session.user.name })
    }
  }, [session, reset, isOpen])

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile(data)
      await update() // Refresh session data
      toast.success('Profile updated successfully')
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" description="Update your personal information.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-foreground text-sm font-medium">
            Name
          </label>
          <Input id="name" placeholder="Your name" {...register('name')} error={errors.name?.message} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
