// /src/main.tsx

import ReactDOM from 'react-dom/client'
// import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { routeTree } from './routeTree.gen'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { StrictMode } from 'react'
import { ThemeProvider } from './components/themeProvider'
import App from './App'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <>
            <StrictMode>
                <ThemeProvider>
                    <Toaster />
                    {/* <QueryClientProvider client={queryClient}> */}
                    {/* <RouterProvider router={router} context={authentication} /> */}
                    {/* </QueryClientProvider> */}
                    <App />
                </ThemeProvider>
            </StrictMode>
        </>
    )
}
