import { axiosInstance } from '@/axiosInstance'
import { ExerciseReference, Group } from '@/types/gym.types'
import { useQuery } from '@tanstack/react-query'

export const useGetFilteredExerciseReferences = ({
    chestOn,
    backOn,
    bicepsOn,
    calvesOn,
    complexOn,
    legsOn,
    shouldersOn,
    tricepsOn,
}: {
    chestOn: boolean | undefined
    backOn: boolean | undefined
    legsOn: boolean | undefined
    shouldersOn: boolean | undefined
    calvesOn: boolean | undefined
    complexOn: boolean | undefined
    tricepsOn: boolean | undefined
    bicepsOn: boolean | undefined
}) => {
    const {
        data: allExerciseReferences,
        isFetching: isFetchingFilteredExerciseReferences,
        refetch: refetchFilteredExerciseReferences,
    } = useQuery({
        queryKey: [
            'get-filtered-exercise-references',
            chestOn,
            calvesOn,
            backOn,
            bicepsOn,
            complexOn,
            legsOn,
            shouldersOn,
            tricepsOn,
        ],
        queryFn: async (): Promise<ExerciseReference[]> => {
            const { data }: { data: ExerciseReference[] } =
                await axiosInstance.get(`/exercise-references/`)

            return data
        },
    })

    let filteredExerciseReferences = allExerciseReferences

    if (!chestOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.CHEST)
        )
    }
    if (!backOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.BACK)
        )
    }
    if (!bicepsOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.BICEPS)
        )
    }
    if (!calvesOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.CALVES)
        )
    }
    if (!complexOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.COMPLEX)
        )
    }
    if (!legsOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.LEGS)
        )
    }
    if (!shouldersOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.SHOULDERS)
        )
    }
    if (!tricepsOn) {
        filteredExerciseReferences = filteredExerciseReferences?.filter(
            (er) => !er.groups.includes(Group.TRICEPS)
        )
    }

    return {
        isFetchingFilteredExerciseReferences,
        refetchFilteredExerciseReferences,
        filteredExerciseReferences,
    }
}
