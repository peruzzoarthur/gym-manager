import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const router = createRouter({
    routeTree,
    context: {
        queryClient: queryClient,
        authentication: undefined!,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
function App() {
    const authentication = useAuth()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    router={router}
                    context={{
                        queryClient: queryClient,
                        authentication: authentication,
                    }}
                />
            </QueryClientProvider>
        </>
    )
}

export default App
