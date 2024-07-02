import RegisterLoginForm from '@/components/custom/registerLoginForm'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/register')({
    component: Register,
})

function Register() {
    return <RegisterLoginForm />
}
