import { axiosInstance } from '@/axiosInstance'
import { Training } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingById = (trainingByIdId: string | undefined) => {
    const {
        data: trainingById,
        isFetching: isFetchingTrainingById,
        refetch: refetchTrainingById,
    } = useQuery({
        queryKey: ['get-training-byId', trainingByIdId],
        queryFn: async (): Promise<Training> => {
            const { data }: { data: Training } = await axiosInstance.get(
                `/trainings/${trainingByIdId}`
            )

            return data
        },
        enabled: !!trainingByIdId,
    })

    return { trainingById, isFetchingTrainingById, refetchTrainingById }
}
