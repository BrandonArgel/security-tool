import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardContent, Button } from '@/components/ui'
import { User, Mail, Shield, Calendar } from 'lucide-react'
import Image from 'next/image'

export default async function ProfilePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/profile')
  }

  const user = session.user

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-hover">
              {user.image ? (
                <Image src={user.image} alt={user.name || 'User'} fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-text-muted">
                  {user.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-text-muted">Security Enthusiast</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover/50 border border-border-subtle">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-muted">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover/50 border border-border-subtle">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-muted">Role</p>
                <p className="font-medium">User</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover/50 border border-border-subtle">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-text-muted">Member Since</p>
                <p className="font-medium">January 2026</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
