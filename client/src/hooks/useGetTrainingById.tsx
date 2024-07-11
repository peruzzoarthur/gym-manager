import { axiosInstance } from '@/axiosInstance'
import { Training } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainingById = (trainingId: string | null) => {
    const {
        data: trainingById,
        isFetching: isFetchingTrainingById,
        refetch: refetchTrainingById,
    } = useQuery({
        queryKey: ['get-training-byId', trainingId],
        queryFn: async (): Promise<Training | null> => {
            const { data }: { data: Training } = await axiosInstance.get(
                `/trainings/${trainingId}`
            )
            if (!data) {
                return null
            }
            return data
        },
        enabled: !!trainingId,
    })
    let datesTrained: Date[] = []
    if (trainingById) {
        const datesTrainedStrings: string[] = trainingById.trainingGroups
            .map((tg) => tg.doneAt)
            .filter(
                (doneAt): doneAt is string =>
                    doneAt !== null && doneAt !== undefined
            )

        if (datesTrainedStrings) {
            datesTrained = datesTrainedStrings.map((dt) => {
                return new Date(dt)
            })
        }
    }
    const activeTrainingGroup = trainingById?.trainingGroups.find(
        (tg) => tg.active === true
    )

    return {
        trainingById,
        isFetchingTrainingById,
        refetchTrainingById,
        datesTrained,
        activeTrainingGroup,
    }
}
