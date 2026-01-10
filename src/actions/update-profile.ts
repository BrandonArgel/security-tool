'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters')
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export async function updateProfile(data: UpdateProfileSchema) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const result = updateProfileSchema.safeParse(data)
  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: result.data.name }
    })

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw new Error('Failed to update profile')
  }
}
