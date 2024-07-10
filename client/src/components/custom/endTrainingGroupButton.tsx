import { axiosInstance } from '@/axiosInstance'
import { ErrorResponse, Training, TrainingGroup } from '@/types/gym.types'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { ErrorAlert } from './errorAlert'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Calendar } from '../ui/calendar'
import { TrainingTimer } from './trainingTimer'
import { Clock } from 'lucide-react'
import { StopWatch } from './stopWatch'

type EndTrainingGroupButtonProps = {
    refetchTrainingGroup: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    trainingGroup: TrainingGroup | undefined
    refetchTrainingById: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Training | null, Error>>
}
export const EndTrainingGroupButton = ({
    refetchTrainingById,
    refetchTrainingGroup,
    trainingGroup,
}: EndTrainingGroupButtonProps) => {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const [openCalendar, setOpenCalendar] = useState<boolean>(false)
    const [openStopWatch, setOpenStopWatch] = useState<boolean>(false)

    const [date, setDate] = useState<Date | undefined>(new Date())

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
                    (axiosError.response.status === 400 || 404 || 409)
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

    const updateDoneDate = async (id: string, date: Date | undefined) => {
        try {
            const requestBody = {
                date: date,
            }

            const data: AxiosResponse<TrainingGroup> =
                await axiosInstance.patch(
                    `/training-groups/update-done/${id}`,
                    requestBody
                )
            await refetchTrainingGroup()
            await refetchTrainingById()
            toast({
                title: 'Training date updated 🏋️‍♀️🏋️‍♂️',
                // description: `Focus!`,
            })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (
                    axiosError.response &&
                    (axiosError.response.status === 400 || 404 || 409)
                ) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                } else {
                    setError(true)
                    setErrorMessage('Error updating training')
                }
            } else {
                setError(true)
                setErrorMessage('Error updating training')
            }
        }
    }

    const setTrainingGroupActive = async (id: string) => {
        try {
            const data: AxiosResponse<TrainingGroup> =
                await axiosInstance.patch(`/training-groups/set-active/${id}`)
            await refetchTrainingGroup()
            await refetchTrainingById()
            toast({
                title: "Let's go 🏋️‍♀️🏋️‍♂️",
                description: `Focus!`,
            })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (
                    axiosError.response &&
                    (axiosError.response.status === 400 || 404 || 409)
                ) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                } else {
                    setError(true)
                    setErrorMessage('Error starting training')
                }
            } else {
                setError(true)
                setErrorMessage('Error starting training')
            }
        }
    }

    return (
        <>
            {trainingGroup && !trainingGroup.done && (
                <>
                    {trainingGroup.active && trainingGroup.activeAt ? (
                        <div className="grid grid-cols-2 gap-2">
                            <TrainingTimer
                                startTime={new Date(
                                    trainingGroup.activeAt
                                ).getTime()}
                            />
                            <Button
                                onClick={async () =>
                                    setTrainingGroupDone(trainingGroup.id)
                                }
                            >
                                Finish
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex items-center justify-center col-span-2 hover:bg-background"
                            >
                                <Clock
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setOpenStopWatch(
                                            (prevState) => !prevState
                                        )
                                    }
                                />
                            </Button>
                            {openStopWatch && (
                                <div className="col-span-2">
                                    <StopWatch running={false} startTime={0} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            onClick={async () =>
                                setTrainingGroupActive(trainingGroup.id)
                            }
                        >
                            Activate
                        </Button>
                    )}
                </>
            )}
            {trainingGroup &&
                trainingGroup.done &&
                trainingGroup.doneAt &&
                trainingGroup.activeAt && (
                    <>
                        {openCalendar ? (
                            <div className="flex flex-col items-center">
                                <div className="grid items-center grid-cols-2 gap-2">
                                    <Badge
                                        className="cursor-pointer"
                                        variant="secondary"
                                        onClick={() =>
                                            setOpenCalendar(
                                                (prevState) => !prevState
                                            )
                                        }
                                    >
                                        {new Date(
                                            trainingGroup.doneAt
                                        ).toLocaleDateString()}
                                    </Badge>
                                    <Button
                                        onClick={async () =>
                                            updateDoneDate(
                                                trainingGroup.id,
                                                date
                                            )
                                        }
                                        className="h-6"
                                        variant="secondary"
                                    >
                                        Update
                                    </Button>
                                </div>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="border rounded-md shadow"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setOpenCalendar(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    {new Date(
                                        trainingGroup.doneAt
                                    ).toLocaleDateString()}
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setOpenCalendar(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    {`${Math.round(
                                        (new Date(
                                            trainingGroup.doneAt
                                        ).getTime() -
                                            new Date(
                                                trainingGroup.activeAt
                                            ).getTime()) /
                                            60000
                                    )}'`}
                                </Badge>
                            </div>
                        )}
                    </>
                )}
            {isError && (
                <div onClick={async () => setError(false)} className="mt-4">
                    <ErrorAlert message={errorMessage} />
                </div>
            )}
        </>
    )
}
