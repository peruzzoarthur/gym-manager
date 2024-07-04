import { axiosInstance } from '@/axiosInstance'
import { User } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUsers = () => {
    const {
        data: users,
        isFetching: isFetchingUsers,
        refetch: refetchUsers,
    } = useQuery({
        queryKey: ['get-all-users'],
        queryFn: async (): Promise<User[]> => {
            const { data }: { data: User[] } =
                await axiosInstance.get(`/users/`)
            return data
        },
    })

    return { users, isFetchingUsers, refetchUsers }
}
