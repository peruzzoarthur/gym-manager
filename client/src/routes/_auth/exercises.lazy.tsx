import { CreateExerciseForm } from '@/components/custom/createExerciseForm'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/exercises')({
    component: Exercises,
})

function Exercises() {
    return <CreateExerciseForm />
}
