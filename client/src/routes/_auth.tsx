import { createFileRoute, redirect } from '@tanstack/react-router'
import { RouterContext } from './__root'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context }: { context: RouterContext }) => {
        const { isLogged } = context.authentication
        if (!isLogged()) {
            throw redirect({ to: '/login' })
        }
    },
})
