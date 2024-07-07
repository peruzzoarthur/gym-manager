import {
    ScrollRestoration,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from '@/hooks/useAuth'

import { RootNav } from '@/components/custom/rootNav'
import { Outlet } from '@tanstack/react-router'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
                  // For Embedded Mode
                  // default: res.TanStackRouterDevtoolsPanel
              }))
          )

export type RouterContext = {
    authentication: AuthContext
    queryClient: QueryClient
}
export const Route = createRootRouteWithContext<RouterContext>()({
    component: Root,
})

function Root() {
    return (
        <>
            <RootNav />
            <div className="flex justify-center mt-24 overflow-hidden">
                <Outlet />
            </div>
            <ScrollRestoration />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
            <ReactQueryDevtools />
        </>
    )
}
