import { axiosInstance } from '@/axiosInstance'
import { Training } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingById = (trainingByIdId: string | null) => {
    const {
        data: trainingById,
        isFetching: isFetchingTrainingById,
        refetch: refetchTrainingById,
    } = useQuery({
        queryKey: ['get-training-byId', trainingByIdId],
        queryFn: async (): Promise<Training | null> => {
            const { data }: { data: Training } = await axiosInstance.get(
                `/trainings/${trainingByIdId}`
            )
            if (!data) {
                return null
            }
            return data
        },
        enabled: !!trainingByIdId,
    })

    return { trainingById, isFetchingTrainingById, refetchTrainingById }
}
