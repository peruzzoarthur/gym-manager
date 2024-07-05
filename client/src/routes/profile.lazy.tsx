import { ProfileDashboard } from '@/components/custom/profileDashboard'
import { useGetUserById } from '@/hooks/useGetUser'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { RouterContext } from './__root'

export const Route = createFileRoute('/profile')({
    beforeLoad: async ({ context }: { context: RouterContext }) => {
        const { isLogged } = context.authentication
        console.log(isLogged)
        if (!isLogged()) {
            throw redirect({ to: '/login' })
        }
    },
    component: Profile,
})

function Profile() {
    const { user, refetchUser } = useGetUserById()

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {user && (
                    <ProfileDashboard refetchUser={refetchUser} user={user} />
                )}
            </div>
        </>
    )
}
