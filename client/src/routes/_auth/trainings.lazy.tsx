import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/trainings')({
  component: () => <div>Hello /_auth/trainings!</div>
})