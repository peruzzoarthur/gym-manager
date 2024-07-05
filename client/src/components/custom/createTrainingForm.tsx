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
import { ErrorResponse, Tempo, Training } from '@/types/gym.types'
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
// import { Badge } from '../ui/badge'
// import { PlusCircle } from 'lucide-react'
import { useGetUsers } from '@/hooks/useGetUsers'
import { faker } from '@faker-js/faker'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useGetUserById } from '@/hooks/useGetUser'

const trainingSchema = z.object({
    daysInWeek: z.number(),
    reps: z.number(),
    sets: z.number(),
    tempo: z.enum([
        Tempo.ONE2ONE,
        Tempo.ONE2TWO,
        Tempo.ONE2THREE,
        Tempo.ONE2FOUR,
    ]),
    rest: z.number(),
    userId: z.string(),
    creatorId: z.string(),
    name: z.string(),
})

type TrainingInput = z.infer<typeof trainingSchema>

type CreateTrainingFormProps = {
    refetchTrainings: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Training[], Error>>
}
export function CreateTrainingForm({
    refetchTrainings,
}: CreateTrainingFormProps) {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const { users } = useGetUsers()
    const { user } = useGetUserById()

    const form = useForm<TrainingInput>({
        resolver: zodResolver(trainingSchema),
        defaultValues: {
            reps: 10,
            sets: 3,
            creatorId: user ? `${user.id}` : undefined,
            rest: 60,
            tempo: Tempo.ONE2TWO,
            daysInWeek: 5,
            userId: undefined,
            name: `${faker.word.adjective()}-${faker.animal.type()}`,
        },
    })

    const { handleSubmit } = form

    const tempoArray = [
        Tempo.ONE2ONE,
        Tempo.ONE2TWO,
        Tempo.ONE2THREE,
        Tempo.ONE2FOUR,
    ]

    const onSubmit = async (input: TrainingInput) => {
        try {
            const requestBody: TrainingInput = input
            const data: AxiosResponse<Training> = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/trainings/`,
                requestBody
            )
            toast({
                title: `Created training ${data.data.name} 🏋️‍♀️🏋️‍♂️`,
            })
            await refetchTrainings()
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>

                if (axiosError.response && axiosError.response.status === 400) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage(`Error creating training.`)
            }
        }
    }

    return (
        <div className="flex flex-col p-2 ">
            <Card className="max-w-sm mx-auto min-w-[320px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Training</CardTitle>
                    <CardDescription>
                        Training creating assistant
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <div className="grid gap-4">
                            {/* days, sets, reps */}
                            <div className="grid grid-cols-3 gap-2 ">
                                <FormField
                                    control={form.control}
                                    name="daysInWeek"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Days</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="5"
                                                    {...field}
                                                    type="number"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sets"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sets</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="3"
                                                    {...field}
                                                    type="number"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="reps"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reps</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="10"
                                                    {...field}
                                                    type="number"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* tempo, rest */}
                            <div className="grid grid-cols-2 gap-2 ">
                                <FormField
                                    name="tempo"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tempo</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <div className="flex">
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a user" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <div className="flex flex-row">
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>
                                                                    Tempo
                                                                </SelectLabel>
                                                                {tempoArray.map(
                                                                    (t) => (
                                                                        <SelectItem
                                                                            value={
                                                                                t
                                                                            }
                                                                        >
                                                                            {t}
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </div>
                                                </div>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rest"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rest</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="60"
                                                    {...field}
                                                    type="number"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                name="userId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Users</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <div className="flex">
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a user" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <div className="flex flex-row">
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Users
                                                            </SelectLabel>
                                                            {users &&
                                                                users.map(
                                                                    (u) => (
                                                                        <SelectItem
                                                                            value={
                                                                                u.id
                                                                            }
                                                                            key={
                                                                                u.id
                                                                            }
                                                                        >
                                                                            {
                                                                                u.firstName
                                                                            }{' '}
                                                                            {
                                                                                u.lastName
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                        </SelectGroup>
                                                    </SelectContent>
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
