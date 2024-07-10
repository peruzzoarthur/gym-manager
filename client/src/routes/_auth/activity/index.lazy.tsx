import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/activity/')({
    component: () => <div>Hello /_auth/activity/!</div>,
})
