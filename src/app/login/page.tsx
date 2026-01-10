import { LucideIcon, Shield } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { ComponentType, SVGProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { auth, signIn, providerMap, type AuthProviderId } from '@/auth'
import { AuthError } from 'next-auth'
import { Button, Card, CardContent } from '@/components/ui'
import { GoogleIcon, GitHubIcon } from '@/components/icons'
import { cn } from '@/lib'

const SIGNIN_ERROR_URL = '/error'

const buttonVariants = cva('w-full relative', {
  variants: {
    provider: {
      google: 'bg-surface-hover text-foreground hover:bg-surface-active border border-border-strong',
      github: 'bg-surface-hover text-foreground hover:bg-surface-active border border-border-strong',
      default: 'bg-surface-hover text-foreground hover:bg-surface-active'
    }
  },
  defaultVariants: {
    provider: 'default'
  }
})

type ProviderConfig = {
  icon?: ComponentType<SVGProps<SVGSVGElement>> | LucideIcon
  variant: VariantProps<typeof buttonVariants>['provider']
}

const PROVIDER_UI_CONFIG: Partial<Record<AuthProviderId, ProviderConfig>> = {
  google: { icon: GoogleIcon, variant: 'google' },
  github: { icon: GitHubIcon, variant: 'github' }
}

export default async function LogInPage(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  const { callbackUrl } = await props.searchParams

  return (
    <div className="animate-slide-in flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <div className="bg-primary/10 text-primary ring-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl ring-1">
          <Shield className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-text-muted mt-2">Sign in to access your secure vault</p>
        </div>
      </div>

      <Card className="w-full max-w-sm" variant="default" shadow="md">
        <CardContent className="pt-6">
          <div className="grid gap-4">
            {Object.values(providerMap).map((provider) => {
              const uiConfig = PROVIDER_UI_CONFIG[provider.id]

              const Icon = uiConfig?.icon
              const variant = uiConfig?.variant ?? 'default'

              return (
                <form
                  key={provider.id}
                  action={async () => {
                    'use server'
                    try {
                      await signIn(provider.id, {
                        redirectTo: callbackUrl ?? '/'
                      })
                    } catch (error) {
                      // Signin can fail for a number of reasons, such as the user
                      // not existing, or the user not having the correct role.
                      // In some cases, you may want to redirect to a custom error
                      if (error instanceof AuthError) {
                        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                      }

                      // Otherwise if a redirects happens Next.js can handle it
                      // so you can just re-thrown the error and let Next.js handle it.
                      // Docs:
                      // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                      throw error
                    }
                  }}
                >
                  <Button type="submit" size="lg" className={cn(buttonVariants({ provider: variant }))}>
                    {Icon && <Icon className="absolute left-4 h-5 w-5" />}
                    <span>Sign in with {provider.name}</span>
                  </Button>
                </form>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <p className="text-text-muted/60 mt-6 text-center text-sm">
        By clicking continue, you agree to our{' '}
        <span className="hover:text-primary cursor-pointer underline underline-offset-4">Terms of Service</span> and{' '}
        <span className="hover:text-primary cursor-pointer underline underline-offset-4">Privacy Policy</span>.
      </p>
    </div>
  )
}
