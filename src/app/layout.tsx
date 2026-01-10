import { AuthProvider, ModalProvider, Navbar, ThemeProvider } from '@/components'
import { ThemeToaster } from '@/components/ui/ThemeToaster'
import { ThemeInitializer } from '@/components/ThemeInitializer'
import './globals.css'

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
              <main className="w-full max-w-2xl flex-1 px-4">{children}</main>
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
