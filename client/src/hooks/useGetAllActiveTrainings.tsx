import { axiosInstance } from '@/axiosInstance'
import { Training, TrainingGroup, User } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetAllActiveTrainings = () => {
    const {
        data: allActiveTrainings,
        isFetching: isFetchingAllActiveTrainings,
        refetch: refetchAllActiveTrainings,
    } = useQuery({
        queryKey: ['get-all-active-trainings'],
        queryFn: async (): Promise<
            | {
                  user: User
                  tg: TrainingGroup
                  t: Training
              }[]
            | null
        > => {
            const {
                data,
            }: { data: { user: User; tg: TrainingGroup; t: Training }[] } =
                await axiosInstance.get(`/users/all-active-trainings`)
            if (!data) {
                return null
            }

            return data
        },
    })

    return {
        allActiveTrainings,
        isFetchingAllActiveTrainings,
        refetchAllActiveTrainings,
    }
}
