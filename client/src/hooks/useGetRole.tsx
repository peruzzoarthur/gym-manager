import { axiosInstance } from '@/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const useGetRole = () => {
    const accessToken = localStorage.getItem('accessToken')
    const {
        data: role,
        isFetching: isFetchingRole,
        refetch: refetchRole,
    } = useQuery({
        queryKey: ['get-role', accessToken],
        queryFn: async (): Promise<'ADMIN' | 'USER' | null> => {
            const { data }: { data: string | null } =
                await axiosInstance.get('/auth/role')
            if (data === 'ADMIN') {
                return 'ADMIN'
            } else if (data === 'USER') {
                return 'USER'
            } else {
                return null
            }
        },
        enabled: !!accessToken,
    })

    return { role, isFetchingRole, refetchRole }
}
