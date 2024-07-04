import { Plus, PlusCircle } from 'lucide-react'
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
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

type TrainingGroupCardProps = {
    trainingTableData: TrainingGroupTableProps[] | undefined
    training: Training | undefined
    trainingGroup: TrainingGroup | undefined
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    refetchTrainingById: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Training, Error>>
}
export const TrainingGroupCard = ({
    trainingTableData,
    training,
    trainingGroup,
    refetchTrainingGroup,
    refetchTrainingById,
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
                    setErrorMessage('Error adding exercise')
                }
            } else {
                setError(true)
                setErrorMessage('Error adding exercise')
            }
        }
    }

    const addExerciseToTrainingGroupsWithSameKey = async (input: {
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
                '/exercises/create-to-all-with-same-key/',
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
                    setErrorMessage('Error adding exercise')
                }
            } else {
                setError(true)
                setErrorMessage('Error adding exercise')
            }
        }
    }

    const setTrainingGroupDone = async (id: string) => {
        try {
            const data: AxiosResponse<TrainingGroup> =
                await axiosInstance.patch(`/training-groups/set-done/${id}`)
            await refetchTrainingGroup()
            await refetchTrainingById()
            toast({ title: 'Success', description: `${id} done` })
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
                    setErrorMessage('Error finishing training')
                }
            } else {
                setError(true)
                setErrorMessage('Error finishing training')
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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Plus />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Exercises</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ScrollArea className=" h-[420px]">
                                {allExerciseReferences?.map((er) => (
                                    <DropdownMenuItem
                                        key={er.id}
                                        onClick={async () =>
                                            addExerciseToTrainingGroupsWithSameKey(
                                                {
                                                    refId: er.id,
                                                    trainingGroupId:
                                                        trainingGroup?.id,
                                                }
                                            )
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
            {trainingGroup && !trainingGroup.done && (
                <Button
                    onClick={async () => setTrainingGroupDone(trainingGroup.id)}
                >
                    Finish
                </Button>
            )}
            {trainingGroup && trainingGroup.done && trainingGroup.doneAt && (
                <Badge>
                    {new Date(trainingGroup.doneAt).toLocaleDateString()}
                </Badge>
            )}
        </Card>
    )
}
