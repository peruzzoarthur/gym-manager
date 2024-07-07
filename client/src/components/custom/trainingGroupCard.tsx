import { PlusCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'
import { ScrollArea } from '../ui/scroll-area'
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
import { ComboBoxResponsive } from './test'
import { CommandDemo } from './test2'

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

    const [selectedValue, setSelectedValue] = useState('')

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
        <Card className="flex flex-col items-center justify-center w-11/12 p-4 space-y-4 sm:w-11/12">
            {trainingTableData && (
                <>
                    <TrainingGroupTable
                        columns={trainingGroupTableColumns}
                        data={trainingTableData}
                        refetchTrainingGroup={refetchTrainingGroup}
                    />
                    {/* Add single exercise */}
                    <Card className="flex flex-col justify-center p-2 space-y-4">
                        <CardTitle>Create exercise</CardTitle>
                        <CardDescription className="grid grid-cols-2 justify-items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex flex-row gap-2">
                                        <p>Add</p>
                                        <PlusCircle />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Exercises
                                    </DropdownMenuLabel>
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

                            {/* Add single exercise to all groups with same key  */}

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex flex-row gap-2">
                                        <p>{`Add to all ${trainingGroup?.key}`}</p>
                                        <PlusCircle />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Exercises
                                    </DropdownMenuLabel>
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
                        </CardDescription>
                    </Card>
                    {/* Add combined exercise */}
                    <Card className="flex flex-col justify-center p-2 space-y-4">
                        <CardTitle>Create combined exercise</CardTitle>
                        <CardContent>
                            <Select
                                onValueChange={(value) =>
                                    setSelectedValue(value)
                                }
                            >
                                <div className="flex space-x-1">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select exercise" />
                                    </SelectTrigger>
                                    <div className="flex flex-row">
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Muscle groups
                                                </SelectLabel>
                                                {allExerciseReferences?.map(
                                                    (e) => (
                                                        <SelectItem
                                                            value={e.id}
                                                            key={e.id}
                                                            className="cursor-pointer"
                                                        >
                                                            {e.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                        <Button
                                            className="flex items-center w-full rounded-tl-sm rounded-bl-sm "
                                            onClick={() =>
                                                addCombinedId(selectedValue)
                                            }
                                            variant="outline"
                                        >
                                            <PlusCircle />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {combinedIds.map((id) => {
                                        return (
                                            <Badge
                                                onClick={() =>
                                                    removeCombinedId(id)
                                                }
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
                            </Select>
                        </CardContent>
                        <Button
                            onClick={async () =>
                                addCombinedExerciseToTrainingGroup({
                                    refIds: combinedIds,
                                    trainingGroupId: trainingGroup?.id,
                                })
                            }
                        >
                            Create
                        </Button>
                    </Card>
                    <ExerciseComboBox
                        selectedExercise={selectedExercise}
                        setSelectedExercise={setSelectedExercise}
                    />
                    {/* <ComboBoxResponsive />
                    <CommandDemo /> */}
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
