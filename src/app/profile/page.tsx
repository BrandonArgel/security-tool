import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardContent } from '@/components/ui'
import { Mail, Shield, Calendar } from 'lucide-react'
import Image from 'next/image'
import { EditProfileTrigger } from './edit-profile-trigger'

export default async function ProfilePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/profile')
  }

  const user = session.user

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="border-primary/20 bg-surface-hover relative min-h-20 min-w-20 overflow-hidden rounded-full border-2">
              {user.image ? (
                <Image src={user.image} width={100} height={100} alt={user.name || 'User'} className="object-cover" />
              ) : (
                <div className="text-text-muted flex h-full w-full items-center justify-center text-2xl font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-text-muted">Security Enthusiast</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="bg-surface-hover/50 border-border-subtle flex items-center gap-3 rounded-lg border p-3">
              <Mail className="text-primary h-5 w-5" />
              <div>
                <p className="text-text-muted text-sm">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>

            <div className="bg-surface-hover/50 border-border-subtle flex items-center gap-3 rounded-lg border p-3">
              <Shield className="text-primary h-5 w-5" />
              <div>
                <p className="text-text-muted text-sm">Role</p>
                <p className="font-medium text-foreground">User</p>
              </div>
            </div>

            <div className="bg-surface-hover/50 border-border-subtle flex items-center gap-3 rounded-lg border p-3">
              <Calendar className="text-primary h-5 w-5" />
              <div>
                <p className="text-text-muted text-sm">Member Since</p>
                <p className="font-medium text-foreground">January 2026</p>
              </div>
            </div>
          </div>

          <EditProfileTrigger />
        </CardContent>
      </Card>
    </div>
  )
}
