import { axiosInstance } from '@/axiosInstance'
import { Training } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingsByUserId = (
    userId: string,
    activeTrainingId: string | undefined | null
) => {
    const {
        data: userTrainings,
        isFetching: isFetchingUserTrainings,
        refetch: refetchUserTrainings,
    } = useQuery({
        queryKey: ['get-user-trainings', userId],
        queryFn: async (): Promise<Training[]> => {
            const { data }: { data: Training[] } = await axiosInstance.get(
                `/trainings/user/${userId}`
            )
            return data
        },
        enabled: !!userId,
    })
    const activeTraining = userTrainings?.find((t) => t.id === activeTrainingId)

    return {
        userTrainings,
        isFetchingUserTrainings,
        refetchUserTrainings,
        activeTraining,
    }
}
