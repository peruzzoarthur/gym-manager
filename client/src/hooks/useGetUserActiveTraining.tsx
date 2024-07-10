import { axiosInstance } from '@/axiosInstance'
import { TrainingGroup } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUserActiveTraining = () => {
    const accessToken = localStorage.getItem('accessToken')
    const {
        data: activeTraining,
        isFetching: isFetchingActiveTraining,
        refetch: refetchActiveTraining,
    } = useQuery({
        queryKey: ['get-user-active-training', accessToken],
        queryFn: async (): Promise<TrainingGroup | null> => {
            const { data }: { data: TrainingGroup } = await axiosInstance.get(
                `/users/active-training`
            )
            if (!data) {
                return null
            }

            return data
        },
        enabled: !!accessToken,
    })

    return { activeTraining, isFetchingActiveTraining, refetchActiveTraining }
}
