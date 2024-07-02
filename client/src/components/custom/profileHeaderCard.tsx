import { User } from '@/types/padel.types'
import { Card } from '../ui/card'
import { ProfilePictureDrawerDialog } from './profilePictureDrawer'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type ProfileHeaderCardProps = {
    user: User
    refetchUser: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<User | null, Error>>
}
export function ProfileHeaderCard({
    user,
    refetchUser,
}: ProfileHeaderCardProps) {
    return (
        <Card className="flex w-full">
            <div className="flex space-x-8">
                <div className="flex flex-col items-center mt-5 ml-5">
                    <div className="p-2 mt-2 text-4xl">
                        Hello {user.firstName}!
                    </div>
                    {user.profileImage ? (
                        <img
                            className="rounded-full w-52 h-52"
                            src={user.profileImage}
                        />
                    ) : (
                        <img className="rounded-full w-52 h-52" />
                    )}
                    <ProfilePictureDrawerDialog refetchUser={refetchUser} />
                </div>
            </div>
        </Card>
    )
}
