import { axiosInstance } from '@/axiosInstance'
import { User } from '@/types/padel.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUserById = () => {
    const accessToken = localStorage.getItem('accessToken')
    const {
        data: user,
        isFetching: isFetchingUser,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ['get-user', accessToken],
        queryFn: async (): Promise<User | null> => {
            const { data }: { data: User } =
                await axiosInstance.get(`/users/profile`)
            if (!data) {
                return null
            }

            return data
        },
        enabled: !!accessToken,
    })

    return { user, isFetchingUser, refetchUser }
}
