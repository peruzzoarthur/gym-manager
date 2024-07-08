import { ReactNode } from 'react'
import { User } from '@/types/gym.types'
import { Card } from '../ui/card'
import { ProfilePictureDrawerDialog } from './profilePictureDrawer'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMediaQuery } from 'usehooks-ts'

type ProfileHeaderCardProps = {
    user: User
    refetchUser: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<User | null, Error>>
    children?: ReactNode
}

export function ProfileHeaderCard({
    user,
    refetchUser,
    children,
}: ProfileHeaderCardProps) {
    const isDesktop = useMediaQuery('(min-width: 640px)')

    if (isDesktop) {
        return (
            <Card className="flex justify-center w-auto p-2">
                <div className="grid grid-cols-2 gap-4 justify-items-start">
                    <div className="flex flex-col">
                        {user.profileImage ? (
                            <img
                                className="w-48 h-48 rounded-full"
                                src={user.profileImage}
                            />
                        ) : (
                            <img className="w-48 h-48 rounded-full" />
                        )}
                        <ProfilePictureDrawerDialog refetchUser={refetchUser} />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-xl">
                            {user.firstName} {user.lastName}
                        </h1>
                        {children}
                    </div>
                </div>
            </Card>
        )
    }
    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <h1 className="text-xl">
                {user.firstName} {user.lastName}
            </h1>
            {children}
        </div>
    )
}
