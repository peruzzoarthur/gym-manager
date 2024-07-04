import { axiosInstance } from '@/axiosInstance'
import { Training } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetTrainings = () => {
    const {
        data: trainings,
        isFetching: isFetchingTrainings,
        refetch: refetchTrainings,
    } = useQuery({
        queryKey: ['get-all-trainings'],
        queryFn: async (): Promise<Training[]> => {
            const { data }: { data: Training[] } =
                await axiosInstance.get(`/trainings/`)
            return data
        },
    })

    return { trainings, isFetchingTrainings, refetchTrainings }
}
