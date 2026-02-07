import { AuthProvider, ModalProvider, Navbar, ThemeProvider } from '@/components'
import { ThemeToaster } from '@/components/ui/ThemeToaster'
import { ThemeInitializer } from '@/components/ThemeInitializer'
import './globals.css'

import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000')

export const metadata: Metadata = {
  title: 'Security Tool | Secure Password Manager & Encrypted Vault',
  description:
    'Securely manage your passwords and sensitive data with Security Tool. Experience advanced local encryption, zero tracking, and maximum privacy for your information.',
  metadataBase: baseUrl,
  openGraph: {
    title: 'Security Tool | Secure Password Manager & Encrypted Vault', // Optional: inherits from `title` above
    description:
      'Securely manage your passwords and sensitive data with Security Tool. Experience advanced local encryption, zero tracking, and maximum privacy for your information.', // Optional: inherits from `description` above
    url: '/', // Defines the canonical URL
    siteName: 'Security Tool', // Optional: site name
    locale: 'en_US', // Optional: locale
    type: 'website' // Optional: defaults to 'website'
  },
  twitter: {
    card: 'summary'
    // title: '', // Optional: inherits from `title` above
    // description: '' // Optional: inherits from `description` above
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png'
      }
    ]
  },
  manifest: '/site.webmanifest'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center text-base antialiased select-none">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ThemeToaster />
            <ThemeInitializer />
            <ModalProvider>
              <Navbar />
              <main className="w-full max-w-4xl flex-1 px-4">{children}</main>
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
