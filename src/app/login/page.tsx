import { LucideIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { ComponentType, SVGProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { auth, signIn, providerMap, type AuthProviderId } from '@/auth'
import { AuthError } from 'next-auth'
import { Button } from '@/components/ui'
import { GoogleIcon, GitHubIcon } from '@/components/icons'
import { cn } from '@/lib'

const SIGNIN_ERROR_URL = '/error'

const buttonVariants = cva('w-full', {
  variants: {
    provider: {
      google: 'bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-sm',
      github: 'bg-[#24292f] text-white hover:bg-[#24292f]/90 shadow-md',
      default: 'bg-slate-200 text-slate-900 hover:bg-slate-300'
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
    <div className="flex flex-col gap-2">
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
            <Button type="submit" variant="primary" className={cn(buttonVariants({ provider: variant }))}>
              <span className="flex items-center justify-center gap-2">
                {Icon && <Icon className="w-5 h-5" />}
                Sign in with {provider.name}
              </span>
            </Button>
          </form>
        )
      })}
    </div>
  )
}
