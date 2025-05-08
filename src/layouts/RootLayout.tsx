import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="arklink-theme">
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar will go here */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
} 