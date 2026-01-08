'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { savedLoginSchema, SavedLoginValues } from '@/lib/schemas'
import { createSavedLogin } from '@/actions/save-login'
import { updateSavedLogin } from '@/actions/update-login'
import { Button, Input, Tooltip } from '@/components/ui'
import { toast } from 'sonner'
import { Globe, Lock, User, Link as LinkIcon, RefreshCw } from 'lucide-react'
import { generatePassword } from '@/lib/password'

interface SavedLoginFormProps {
  initialData?: SavedLoginValues & { id?: string }
  onSuccess?: () => void
}

export const SavedLoginForm = ({ initialData, onSuccess }: SavedLoginFormProps) => {
  const [isPending, startTransition] = useTransition()
  const isEditing = !!initialData?.id

  const form = useForm<SavedLoginValues>({
    resolver: zodResolver(savedLoginSchema),
    defaultValues: {
      siteName: initialData?.siteName || '',
      url: initialData?.url || 'https://',
      username: initialData?.username || '',
      password: initialData?.password || ''
    }
  })

  const onSubmit = (values: SavedLoginValues) => {
    startTransition(async () => {
      let result

      if (isEditing && initialData?.id) {
        result = await updateSavedLogin(initialData.id, values)
      } else {
        result = await createSavedLogin(values)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(isEditing ? 'Credential updated successfully' : 'Credential saved successfully')
        if (!isEditing) form.reset()
        onSuccess?.()
      }
    })
  }

  const handleGeneratePassword = () => {
    const newPassword = generatePassword({
      length: 16,
      upper: true,
      lower: true,
      number: true,
      special: true,
      avoidAmbiguous: false,
      avoidRepeated: true,
      avoidSequences: true,
      minNumbers: 1,
      minSpecial: 1
    })
    form.setValue('password', newPassword, { shouldValidate: true, shouldDirty: true })
    toast.success('Password generated')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            label="Site Name"
            {...form.register('siteName')}
            placeholder="e.g. Netflix Personal"
            disabled={isPending}
            startIcon={<Globe className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-2">
          <Input
            label="URL"
            {...form.register('url')}
            placeholder="https://..."
            disabled={isPending}
            error={form.formState.errors.url?.message}
            startIcon={<LinkIcon className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-2">
          <Input
            label="Username / Email"
            {...form.register('username')}
            placeholder="user@example.com"
            disabled={isPending}
            error={form.formState.errors.username?.message}
            startIcon={<User className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                type="password"
                label="Password"
                {...form.register('password')}
                placeholder="••••••••"
                disabled={isPending}
                error={form.formState.errors.password?.message}
                startIcon={<Lock className="h-4 w-4" />}
              />
            </div>
            <Tooltip content="Generate Secure Password">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGeneratePassword}
                className="p-2.25"
                disabled={isPending}
              >
                <RefreshCw size={18} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={isPending} className="w-full">
        {isPending ? (isEditing ? 'Updating...' : 'Saving...') : isEditing ? 'Update Credentials' : 'Save Credentials'}
      </Button>
    </form>
  )
}
