import { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ErrorBox } from './errorBox'
import { useToast } from '../ui/use-toast'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, Exercise, TrainingGroup } from '@/types/gym.types'
import { axiosInstance } from '@/axiosInstance'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type SetLoadDrawerProps = {
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    exerciseId: string
}
export const SetLoadDrawer = ({
    exerciseId,
    refetchTrainingGroup,
}: SetLoadDrawerProps) => {
    const [open, setOpen] = useState(false)
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Set load</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Set load</DrawerTitle>
                    <DrawerDescription>
                        Set load you are using to do this exercise
                    </DrawerDescription>
                </DrawerHeader>
                <ExerciseLoadForm
                    refetchTrainingGroup={refetchTrainingGroup}
                    exerciseId={exerciseId}
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

type ExerciseLoadFormProps = {
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    exerciseId: string
}
function ExerciseLoadForm({
    refetchTrainingGroup,
    exerciseId,
}: ExerciseLoadFormProps) {
    const [inputValue, setInputValue] = useState('')
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()

    const toasted = (exercise: Exercise) => {
        toast({
            title: 'Keep going 🏋️‍♀️🏋️‍♂️',
            description: `Load set to ${exercise.ref.name}`,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            console.log(inputValue)
            const requestBody = {
                exerciseId: exerciseId,
                load: inputValue,
            }

            const data: AxiosResponse<Exercise> = await axiosInstance.patch(
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

    return (
        <div className="flex mt-6">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-end space-y-2">
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button className="w-1/3" type="submit">
                        Upload
                    </Button>
                </div>
            </form>

            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
