import { PlusCircle } from 'lucide-react'
import { Card } from '../ui/card'
import { TrainingGroupTable } from './trainingGroupTable/trainingGroupTable'
import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from './trainingGroupTable/trainingGroupTableColumns'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'
import { ScrollArea } from '../ui/scroll-area'
import { useToast } from '../ui/use-toast'
import {
    ErrorResponse,
    Exercise,
    Training,
    TrainingGroup,
} from '@/types/gym.types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '@/axiosInstance'
import { useState } from 'react'
import { ErrorAlert } from './errorAlert'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type TrainingGroupCardProps = {
    trainingTableData: TrainingGroupTableProps[] | undefined
    training: Training | undefined
    trainingGroup: TrainingGroup | undefined
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
}
export const TrainingGroupCard = ({
    trainingTableData,
    training,
    trainingGroup,
    refetchTrainingGroup,
}: TrainingGroupCardProps) => {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const toasted = (exercise: Exercise) => {
        toast({
            title: 'Success! 🙌',
            description: `Added ${exercise.ref.name}`,
        })
    }

    const addExerciseToTrainingGroup = async (input: {
        refId: string | undefined
        trainingGroupId: string | undefined
    }) => {
        try {
            const requestBody = {
                reps: training?.reps,
                sets: training?.sets,
                refId: input.refId,
                trainingGroupId: input.trainingGroupId,
            }

            const data: AxiosResponse<Exercise> = await axiosInstance.post(
                '/exercises/',
                requestBody
            )
            await refetchTrainingGroup()
            toasted(data.data)
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (
                    axiosError.response &&
                    (axiosError.response.status === 400 || 409)
                ) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                } else {
                    setError(true)
                    setErrorMessage('Error creating player')
                }
            } else {
                setError(true)
                setErrorMessage('Error creating player')
            }
        }
    }
    const { allExerciseReferences } = useGetAllExerciseReferences()
    return (
        <Card className="flex flex-col items-center justify-center w-11/12 p-4 space-y-4 sm:w-11/12">
            {trainingTableData && (
                <>
                    <TrainingGroupTable
                        columns={trainingGroupTableColumns}
                        data={trainingTableData}
                        refetchTrainingGroup={refetchTrainingGroup}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <PlusCircle />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Exercises</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ScrollArea className=" h-[420px]">
                                {allExerciseReferences?.map((er) => (
                                    <DropdownMenuItem
                                        key={er.id}
                                        onClick={async () =>
                                            addExerciseToTrainingGroup({
                                                refId: er.id,
                                                trainingGroupId:
                                                    trainingGroup?.id,
                                            })
                                        }
                                        className="cursor-pointer hover:bg-opacity-50"
                                    >
                                        {er.name}
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}

            {isError && (
                <div onClick={async () => setError(false)} className="mt-4">
                    <ErrorAlert message={errorMessage} />
                </div>
            )}
        </Card>
    )
}
