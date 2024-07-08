import { axiosInstance } from '@/axiosInstance'
import { ErrorResponse, Training, TrainingGroup } from '@/types/gym.types'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { ErrorAlert } from './errorAlert'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

type EndTrainingGroupButtonProps = {
    refetchTrainingById: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Training, Error>>
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    trainingGroup: TrainingGroup | undefined
}
export const EndTrainingGroupButton = ({
    refetchTrainingById,
    refetchTrainingGroup,
    trainingGroup,
}: EndTrainingGroupButtonProps) => {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()

    const setTrainingGroupDone = async (id: string) => {
        try {
            const data: AxiosResponse<TrainingGroup> =
                await axiosInstance.patch(`/training-groups/set-done/${id}`)
            await refetchTrainingGroup()
            await refetchTrainingById()
            toast({
                title: 'Keep going 🏋️‍♀️🏋️‍♂️',
                description: `One more day at the gym!`,
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
                    setErrorMessage('Error finishing training')
                }
            } else {
                setError(true)
                setErrorMessage('Error finishing training')
            }
        }
    }
    return (
        <>
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
            {isError && (
                <div onClick={async () => setError(false)} className="mt-4">
                    <ErrorAlert message={errorMessage} />
                </div>
            )}
        </>
    )
}
