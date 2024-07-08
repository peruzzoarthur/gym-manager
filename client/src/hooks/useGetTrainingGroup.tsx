import { axiosInstance } from '@/axiosInstance'
import { TrainingGroup } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingGroup = (trainingGroupId: string | null) => {
    const {
        data: trainingGroup,
        isFetching: isFetchingTrainingGroup,
        refetch: refetchTrainingGroup,
    } = useQuery({
        queryKey: ['get-trainingGroup-byId', trainingGroupId],
        queryFn: async (): Promise<TrainingGroup> => {
            const { data }: { data: TrainingGroup } = await axiosInstance.get(
                `/training-groups/${trainingGroupId}`
            )

            return data
        },
        enabled: !!trainingGroupId,
    })

    return { trainingGroup, isFetchingTrainingGroup, refetchTrainingGroup }
}
