import { axiosInstance } from '@/axiosInstance'
import { ExerciseReference } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetAllExerciseReferences = () => {
    const {
        data: allExerciseReferences,
        isFetching: isFetchingAllExerciseReferences,
        refetch: refetchAllExerciseReferences,
    } = useQuery({
        queryKey: ['get-all-exercise-references'],
        queryFn: async (): Promise<ExerciseReference[]> => {
            const { data }: { data: ExerciseReference[] } =
                await axiosInstance.get(`/exercise-references/`)

            return data
        },
    })

    return {
        allExerciseReferences,
        isFetchingAllExerciseReferences,
        refetchAllExerciseReferences,
    }
}
