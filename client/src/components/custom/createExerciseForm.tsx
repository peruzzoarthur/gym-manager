import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, ExerciseReference, Group } from '@/types/gym.types'
import { ErrorBox } from './errorBox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Badge } from '../ui/badge'
import { PlusCircle } from 'lucide-react'
import { axiosInstance } from '@/axiosInstance'
import { useGetUserById } from '@/hooks/useGetUser'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

const exerciseSchema = z.object({
    name: z.string(),
    group: z.enum([
        Group.BACK,
        Group.BICEPS,
        Group.CALVES,
        Group.CHEST,
        Group.COMPLEX,
        Group.LEGS,
        Group.SHOULDERS,
        Group.TRICEPS,
    ]),
})

const muscleGroups = [
    Group.BACK,
    Group.BICEPS,
    Group.CALVES,
    Group.CHEST,
    Group.COMPLEX,
    Group.LEGS,
    Group.SHOULDERS,
    Group.TRICEPS,
]

type ExerciseInput = z.infer<typeof exerciseSchema>

type CreateExerciseFormProps = {
    refetchAllExerciseReferences: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<ExerciseReference[], Error>>
}

export function CreateExerciseForm({
    refetchAllExerciseReferences,
}: CreateExerciseFormProps) {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [muscleGroupsState, setMuscleGroupsState] = useState<Group[]>([])
    const { toast } = useToast()
    const { user } = useGetUserById()

    const form = useForm<ExerciseInput>({
        resolver: zodResolver(exerciseSchema),
        defaultValues: {
            name: '',
            group: undefined,
        },
    })

    const { handleSubmit } = form

    const onSubmit = async (input: ExerciseInput) => {
        try {
            const requestBody: {
                name: string
                groups: Group[]
                creatorId: string
            } = {
                name: input.name,
                groups: muscleGroupsState,
                creatorId: user?.id ?? '',
            }

            const data: AxiosResponse<ExerciseReference> =
                await axiosInstance.post(
                    `${import.meta.env.VITE_SERVER_URL}/exercise-references/`,
                    requestBody
                )
            await refetchAllExerciseReferences()
            toast({
                title: `Created exercise ${input.name} 🏋️‍♀️🏋️‍♂️`,
            })

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (axiosError.response && axiosError.response.status === 409) {
                    setError(true)
                    setErrorMessage('Exercise already registered')
                }
                if (axiosError.response && axiosError.response.status === 400) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage(`Error creating exercise ${input.name}.`)
            }
        }
    }

    const addMuscleGroup = (muscleGroup: Group) => {
        if (muscleGroupsState.includes(muscleGroup)) {
            return
        }
        const groupArray: Group[] = muscleGroupsState.concat(muscleGroup)
        setMuscleGroupsState(groupArray)
    }

    const removeMuscleGroup = (deleteGroup: Group) => {
        const groupArray: Group[] = muscleGroupsState.filter(
            (group) => group !== deleteGroup
        )
        setMuscleGroupsState(groupArray)
    }
    return (
        <div className="flex flex-col ">
            <Card className="max-w-sm mx-auto min-w-[320px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Exercise</CardTitle>
                    <CardDescription>
                        Enter name and muscle group of exercise
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                {/* email */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Exercise name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                name="group"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Muscle groups</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <div className="flex">
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a group" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <div className="flex flex-row">
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Muscle groups
                                                            </SelectLabel>
                                                            {muscleGroups.map(
                                                                (mg) => (
                                                                    <SelectItem
                                                                        value={
                                                                            mg
                                                                        }
                                                                        key={mg}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        {mg}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                    <Button
                                                        className="flex items-center w-full rounded-tl-sm rounded-bl-sm "
                                                        onClick={() =>
                                                            addMuscleGroup(
                                                                field.value
                                                            )
                                                        }
                                                        variant="ghost"
                                                    >
                                                        <PlusCircle />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex-col justify-center w-1/3">
                                                    {muscleGroupsState.map(
                                                        (mg) => {
                                                            return (
                                                                <Badge
                                                                    onClick={() =>
                                                                        removeMuscleGroup(
                                                                            mg
                                                                        )
                                                                    }
                                                                    key={mg}
                                                                    className="justify-center cursor-pointer w-auto h-5 text-center rounded-full ml-1 mt-2 mr-0.5"
                                                                >
                                                                    {mg}
                                                                </Badge>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                onClick={handleSubmit(onSubmit)}
                                type="button"
                                className="w-full"
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
