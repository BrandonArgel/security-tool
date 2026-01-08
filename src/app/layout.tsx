import { Toaster } from 'sonner'
import { AuthProvider, ModalProvider, Navbar } from '@/components'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col items-center select-none">
        <Toaster position="bottom-right" theme="dark" duration={2000} richColors />

        <AuthProvider>
          <ModalProvider>
            <Navbar />
            <main className="w-full max-w-2xl px-4 flex-1">{children}</main>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
