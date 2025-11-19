import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter } from 'react-router'
import AppRoutes from '@/routes'

export default function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    )
}
