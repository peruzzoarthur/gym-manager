// import { useGetUserActiveTraining } from '@/hooks/useGetUserActiveTraining'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/activity/$id')({
    component: Activity,
})

function Activity() {
    const { id } = Route.useParams()
    // const { activeTraining } = useGetUserActiveTraining()
    // console.log(activeTraining)
    return <div>{`Activity for ${id}`}</div>
}
