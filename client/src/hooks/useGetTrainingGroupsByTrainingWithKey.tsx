import { axiosInstance } from '@/axiosInstance'
import { TrainingGroup } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingGroupsByTrainingWithKey = (
    trainingId: string | undefined,
    key: string | undefined,
    showAll: boolean
) => {
    const {
        data: trainingGroupsByKey,
        isFetching: isFetchingTrainingGroupsByKey,
        refetch: refetchTrainingGroupsByKey,
    } = useQuery({
        queryKey: ['get-trainingGroupsByKey-byId', trainingId, key, showAll],
        queryFn: async (): Promise<TrainingGroup[]> => {
            const reqBody = {
                trainingId: trainingId,
                key: key,
            }
            const { data }: { data: TrainingGroup[] } =
                await axiosInstance.post(
                    `/training-groups/tg-key-by-training-id/`,
                    reqBody
                )

            if (!showAll) {
                const filteredData = data.filter((tg) => tg.done !== true)
                return filteredData
            }
            return data
        },
        enabled: !!trainingId && !!key,
    })

    return {
        trainingGroupsByKey,
        isFetchingTrainingGroupsByKey,
        refetchTrainingGroupsByKey,
    }
}
