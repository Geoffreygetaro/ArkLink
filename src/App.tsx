import { RootLayout } from '@/layouts/RootLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">ArkLink Dashboard</h1>
          <p className="mt-4 text-muted-foreground">
            Welcome to your Pterodactyl management dashboard.
          </p>
        </div>
      </RootLayout>
    </QueryClientProvider>
  )
}

export default App
