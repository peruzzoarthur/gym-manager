import { axiosInstance } from '@/axiosInstance'
import { User } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUserByUserId = (userId: string | undefined) => {
    const {
        data: user,
        isFetching: isFetchingUser,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ['get-user-byId', userId],
        queryFn: async (): Promise<User> => {
            const { data }: { data: User } = await axiosInstance.get(
                `/users/${userId}`
            )

            return data
        },
        enabled: !!userId,
    })

    return { user, isFetchingUser, refetchUser }
}
