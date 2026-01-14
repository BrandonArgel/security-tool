import { Card, CardContent, Button } from '@/components/ui'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Bell, Shield, Key } from 'lucide-react'
import { ThemeColorSelector } from '@/components/ui/ThemeColorSelector'

export default async function SettingsPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-foreground mb-8 text-3xl font-bold">Settings</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
            <ApperanceIcon className="h-5 w-5 opacity-70" />
            Appearance
          </h2>
          <Card>
            <ThemeColorSelector />
          </Card>
        </section>

        <section className="pointer-events-none opacity-50">
          <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
            <SecurityIcon className="h-5 w-5 opacity-70" />
            Security (soon)
          </h2>
          <Card>
            <CardContent className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-500">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Two-Factor Authentication</p>
                    <p className="text-text-muted text-sm">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="bg-border-subtle h-px" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-500/10 p-2 text-amber-500">
                    <Key size={20} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Change Master Password</p>
                    <p className="text-text-muted text-sm">Update your main vault password</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="pointer-events-none opacity-50">
          <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
            <BellIcon className="h-5 w-5 opacity-70" />
            Notifications (soon)
          </h2>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Security Alerts</p>
                    <p className="text-text-muted text-sm">Get notified about suspicious activity</p>
                  </div>
                </div>
                <div className="bg-primary/20 relative h-6 w-11 cursor-pointer rounded-full">
                  <div className="bg-primary absolute top-1 right-1 h-4 w-4 rounded-full shadow-sm" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

const ApperanceIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const SecurityIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)
