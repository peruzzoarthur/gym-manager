import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/trainings/$id')({
    component: Training,
})

function Training() {
    const { id } = Route.useParams()
    return <div>{`Hello from ${id}`}</div>
}
