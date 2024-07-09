import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { TrainingGroupTableProps } from './trainingGroupTable/trainingGroupTableColumns'
import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'
import { useToast } from '../ui/use-toast'
import {
    CombinedExercise,
    ErrorResponse,
    Exercise,
    ExerciseReference,
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
import { ExerciseComboBox } from './exerciseCombobox'
import { Label } from '../ui/label'
import { X } from 'lucide-react'

type AddExercisesCardProps = {
    trainingTableData: TrainingGroupTableProps[] | undefined
    training: Training | undefined
    trainingGroup: TrainingGroup | undefined
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    setShowExercisesCard: React.Dispatch<React.SetStateAction<boolean>>
}
export const AddExercisesCard = ({
    trainingTableData,
    training,
    trainingGroup,
    refetchTrainingGroup,
    setShowExercisesCard,
}: AddExercisesCardProps) => {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const [combinedIds, setCombinedIds] = useState<string[]>([])
    const [selectedExercise, setSelectedExercise] =
        useState<ExerciseReference | null>(null)

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

    const addCombinedExerciseToTrainingGroup = async (input: {
        refIds: string[] | undefined
        trainingGroupId: string | undefined
    }) => {
        try {
            const requestBody = {
                reps: training?.reps,
                sets: training?.sets,
                refIds: input.refIds,
                trainingGroupId: input.trainingGroupId,
            }

            const data: AxiosResponse<CombinedExercise> =
                await axiosInstance.post('/combined-exercises/', requestBody)
            await refetchTrainingGroup()
            toast({
                title: 'Success! 🙌',
                description: `Added combined exercise`,
            })
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
                    setErrorMessage('Error adding combined exercise')
                }
            } else {
                setError(true)
                setErrorMessage('Error adding combined exercise')
            }
        }
    }

    const addCombinedExerciseToTrainingGroupsWithSameKey = async (input: {
        refIds: string[] | undefined
        trainingGroupId: string | undefined
    }) => {
        try {
            const requestBody = {
                reps: training?.reps,
                sets: training?.sets,
                refIds: input.refIds,
                trainingGroupId: input.trainingGroupId,
            }

            const data: AxiosResponse<TrainingGroup> = await axiosInstance.post(
                '/combined-exercises/create-to-all-with-same-key/',
                requestBody
            )
            await refetchTrainingGroup()
            toast({
                title: 'Success! 🙌',
                description: `Added combined exercise to all ${data.data.key}`,
            })
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
                    setErrorMessage('Error adding combinedExercise')
                }
            } else {
                setError(true)
                setErrorMessage('Error adding combinedExercise')
            }
        }
    }

    const { allExerciseReferences } = useGetAllExerciseReferences()

    const addCombinedId = (id: string) => {
        if (combinedIds.includes(id)) {
            return
        }
        const stringArray: string[] = combinedIds.concat(id)
        setCombinedIds(stringArray)
    }

    const removeCombinedId = (deletedId: string) => {
        const stringArray: string[] = combinedIds.filter(
            (string) => string !== deletedId
        )
        setCombinedIds(stringArray)
    }
    return (
        <>
            {trainingTableData && (
                <Card className="flex flex-col justify-center p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>Exercises</CardTitle>
                        <div className="flex justify-end">
                            <Button
                                className="w-12 h-12"
                                variant="ghost"
                                onClick={() => setShowExercisesCard(false)}
                            >
                                <X />
                            </Button>
                        </div>
                    </div>
                    <CardDescription>{`Manage exercises related to the selected training`}</CardDescription>
                    <CardContent className="grid space-y-2 sm:grid-cols-2 justify-items-center">
                        <div className="flex flex-col items-center ">
                            <ExerciseComboBox
                                selectedExercise={selectedExercise}
                                setSelectedExercise={setSelectedExercise}
                                addCombinedId={addCombinedId}
                            />
                            <div className="grid grid-cols-2">
                                {combinedIds.map((id) => {
                                    return (
                                        <Badge
                                            onClick={() => removeCombinedId(id)}
                                            variant="secondary"
                                            key={id}
                                            className="justify-center cursor-pointer w-auto p-4 h-6 text-center  ml-1 mt-2 mr-0.5"
                                        >
                                            {
                                                allExerciseReferences?.filter(
                                                    (e) => e.id === id
                                                )[0].name
                                            }
                                        </Badge>
                                        //! fix this later
                                    )
                                })}
                            </div>
                        </div>
                        {combinedIds.length === 1 && (
                            <div className="flex flex-col space-y-1">
                                <Button
                                    onClick={async () =>
                                        addExerciseToTrainingGroup({
                                            refId: selectedExercise?.id,
                                            trainingGroupId: trainingGroup?.id,
                                        })
                                    }
                                >
                                    Add to this group
                                </Button>
                                <Button
                                    onClick={async () =>
                                        addExerciseToTrainingGroupsWithSameKey({
                                            refId: selectedExercise?.id,
                                            trainingGroupId: trainingGroup?.id,
                                        })
                                    }
                                >
                                    {`Add to all [${trainingGroup?.key}]`}
                                </Button>
                            </div>
                        )}
                        {combinedIds.length > 1 && (
                            <div className="flex flex-col">
                                <Label>Combined</Label>
                                <Button
                                    onClick={async () =>
                                        addCombinedExerciseToTrainingGroup({
                                            refIds: combinedIds,
                                            trainingGroupId: trainingGroup?.id,
                                        })
                                    }
                                >
                                    Add to this group
                                </Button>
                                <Button
                                    onClick={async () =>
                                        addCombinedExerciseToTrainingGroupsWithSameKey(
                                            {
                                                refIds: combinedIds,
                                                trainingGroupId:
                                                    trainingGroup?.id,
                                            }
                                        )
                                    }
                                >
                                    {`Add to all [${trainingGroup?.key}]`}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {isError && (
                <div onClick={async () => setError(false)} className="mt-4">
                    <ErrorAlert message={errorMessage} />
                </div>
            )}
        </>
    )
}
