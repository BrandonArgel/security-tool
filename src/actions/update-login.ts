'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { savedLoginSchema, SavedLoginValues } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

import { encrypt } from '@/lib/encryption'

export const updateSavedLogin = async (id: string, values: SavedLoginValues) => {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = savedLoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { siteName, url, username, password } = validatedFields.data

  try {
    const existingLogin = await prisma.savedLogin.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!existingLogin) {
      return { error: 'Login not found or unauthorized' }
    }

    // Encrypt password before updating
    const encryptedPassword = encrypt(password)

    await prisma.savedLogin.update({
      where: { id },
      data: {
        siteName,
        url,
        username,
        password: encryptedPassword
      }
    })

    revalidatePath('/vault')
    return { success: 'Login updated successfully' }
  } catch (error) {
    console.error('Error updating login:', error)
    return { error: 'Failed to update login' }
  }
}
