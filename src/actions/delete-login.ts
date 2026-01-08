'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteSavedLogin = async (id: string) => {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized' }
  }

  try {
    const existingLogin = await prisma.savedLogin.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!existingLogin) {
      return { error: 'Login not found or unauthorized' }
    }

    await prisma.savedLogin.delete({
      where: { id }
    })

    revalidatePath('/vault')
    return { success: 'Login deleted successfully' }
  } catch (error) {
    console.error('Error deleting login:', error)
    return { error: 'Failed to delete login' }
  }
}
