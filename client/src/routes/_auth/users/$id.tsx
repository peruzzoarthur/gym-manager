import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { useGetTrainingsByUserId } from '@/hooks/useGetTrainingsByUserId'
import { useGetUserByUserId } from '@/hooks/useGetUserByUserId'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useGetTrainingById } from '@/hooks/useGetTrainingById'
import { useGetTrainingGroup } from '@/hooks/useGetTrainingGroup'
import { useGetTrainingGroupsByTrainingWithKey } from '@/hooks/useGetTrainingGroupsByTrainingWithKey'
import { CalendarDays, Dumbbell, X } from 'lucide-react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, User as UserType } from '@/types/gym.types'
import { ErrorBox } from '@/components/custom/errorBox'
import { useToast } from '@/components/ui/use-toast'
import { axiosInstance } from '@/axiosInstance'
import { TrainingGroupTable } from '@/components/custom/trainingGroupTable/trainingGroupTable'
import { AddExercisesCard } from '@/components/custom/addExercisesCard'
import { EndTrainingGroupButton } from '@/components/custom/endTrainingGroupButton'
import { ProfileHeaderCard } from '@/components/custom/profileHeaderCard'
import { SelectUserTrainings } from '@/components/custom/selectUserTrainings'
import { TrainingGroupsProgress } from '@/components/custom/trainingGroupsProgress'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { TrainingGroupKeysCard } from '@/components/custom/trainingGroupKeysCard'
import { TrainingGroupsWPhasesCard } from '@/components/custom/trainingGroupsWPhasesCard'

export const Route = createFileRoute('/_auth/users/$id')({
    component: User,
})

function User() {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { id } = Route.useParams()
    const { user, refetchUser } = useGetUserByUserId(id)
    const { userTrainings, activeTraining } = useGetTrainingsByUserId(
        id,
        user?.activeTrainingId
    )
    const [selectedTraining, setSelectedTraining] = useState<string | null>(
        activeTraining?.id ?? null
    )

    const [selectedTrainingGroupsKey, setSelectedTrainingGroupsKey] = useState<
        string | null
    >(null)
    useEffect(() => {
        if (activeTraining?.id) {
            setSelectedTraining(activeTraining.id)
            setSelectedTrainingGroupsKey('A')
        }
    }, [activeTraining])
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState<
        string | null
    >(null)
    const { toast } = useToast()
    const [showAllTrainingGroups, setShowAllTrainingGroups] =
        useState<boolean>(true)
    const [showExercisesCard, setShowExercisesCard] = useState<boolean>(false)
    const [calendarOn, setCalendarOn] = useState<boolean>(false)
    const { trainingById, refetchTrainingById, datesTrained } =
        useGetTrainingById(selectedTraining)
    const trainingGroupsKeys = [
        ...new Set(trainingById?.trainingGroups.map((tg) => tg.key)),
    ]

    const { trainingGroupsByKey } = useGetTrainingGroupsByTrainingWithKey(
        trainingById?.id,
        selectedTrainingGroupsKey,
        showAllTrainingGroups
    )

    const { trainingGroup, refetchTrainingGroup } = useGetTrainingGroup(
        selectedTrainingGroup
    )

    const trainingTableData: TrainingGroupTableProps[] | undefined =
        trainingGroup?.exercises.map((e) => {
            return {
                id: e.id,
                index: e.index ?? undefined,
                reps: e.reps ?? undefined,
                sets: e.sets ?? undefined,
                load: e.load ?? undefined,
                name: e.ref.name,
            }
        })

    const handleActiveTraining = async (
        userId: string,
        trainingId: string,
        option: 'activate' | 'deactivate'
    ) => {
        try {
            const requestBody: { trainingId: string } = {
                trainingId: trainingId,
            }

            if (option === 'activate') {
                const data: AxiosResponse<UserType> = await axiosInstance.patch(
                    `${import.meta.env.VITE_SERVER_URL}/users/activate-training/${id}`,
                    requestBody
                )
                toast({
                    title: `Activated training ${trainingId} 🏋️‍♀️🏋️‍♂️`,
                })
                await refetchUser()
                return data
            }

            if (option === 'deactivate') {
                const data: AxiosResponse<UserType> = await axiosInstance.patch(
                    `${import.meta.env.VITE_SERVER_URL}/users/deactivate-training/${userId}`,
                    requestBody
                )
                toast({
                    title: `Deactivated training ${trainingId} 🏋️‍♀️🏋️‍♂️`,
                })
                await refetchUser()

                return data
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (axiosError.response && axiosError.response.status === 404) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
                if (axiosError.response && axiosError.response.status === 400) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage(`Error changing training state`)
            }
        }
    }

    return (
        <div className="flex flex-col justify-center w-full p-2 space-y-2 sm:w-11/12">
            {user && (
                <header className="flex flex-col items-center justify-center w-full space-x-4 sm:flex-row sm:gr">
                    <ProfileHeaderCard user={user} refetchUser={refetchUser}>
                        {userTrainings ? (
                            <SelectUserTrainings
                                setSelectedTraining={setSelectedTraining}
                                user={user}
                                userTrainings={userTrainings}
                                activeTraining={activeTraining}
                                selectedTrainingGroup={selectedTrainingGroup}
                                setSelectedTrainingGroup={
                                    setSelectedTrainingGroup
                                }
                            />
                        ) : (
                            <p>No trainings</p>
                        )}
                    </ProfileHeaderCard>
                    {calendarOn ? (
                        datesTrained && (
                            <div className="flex flex-col items-end p-2">
                                <Button
                                    className="w-12 h-12 hover:bg-background"
                                    variant="ghost"
                                    onClick={() => setCalendarOn(false)}
                                >
                                    <X />
                                </Button>
                                <Calendar
                                    mode="multiple"
                                    selected={datesTrained}
                                    className="border rounded-md shadow"
                                />
                            </div>
                        )
                    ) : (
                        <div className="flex items-center justify-center p-2">
                            <Button
                                className="w-12 h-12 rounded-full"
                                variant="outline"
                                onClick={() => setCalendarOn(true)}
                            >
                                <CalendarDays />
                            </Button>
                        </div>
                    )}
                </header>
            )}

            <main>
                <div className="flex flex-col items-center justify-center w-full space-y-2">
                    {trainingById && user && (
                        <div className="grid gap-2 sm:grid-cols-2">
                            <TrainingGroupKeysCard
                                handleActiveTraining={handleActiveTraining}
                                selectedTrainingGroupsKey={
                                    selectedTrainingGroupsKey
                                }
                                setSelectedTrainingGroup={
                                    setSelectedTrainingGroup
                                }
                                setSelectedTrainingGroupsKey={
                                    setSelectedTrainingGroupsKey
                                }
                                trainingById={trainingById}
                                trainingGroupsKeys={trainingGroupsKeys}
                                user={user}
                                showExercisesCard={showExercisesCard}
                            />
                            <TrainingGroupsProgress
                                trainingById={trainingById}
                            />
                        </div>
                    )}
                    <div className="grid gap-2 sm:gap-4 md:grid-cols-2">
                        {trainingGroupsByKey &&
                            trainingById &&
                            selectedTrainingGroupsKey !== null && (
                                <TrainingGroupsWPhasesCard
                                    selectedTrainingGroup={
                                        selectedTrainingGroup
                                    }
                                    setSelectedTrainingGroup={
                                        setSelectedTrainingGroup
                                    }
                                    setShowAllTrainingGroups={
                                        setShowAllTrainingGroups
                                    }
                                    showAllTrainingGroups={
                                        showAllTrainingGroups
                                    }
                                    trainingById={trainingById}
                                    trainingGroupsByKey={trainingGroupsByKey}
                                />
                            )}
                        {selectedTrainingGroup &&
                        trainingById &&
                        showExercisesCard ? (
                            <AddExercisesCard
                                trainingTableData={trainingTableData}
                                training={trainingById}
                                trainingGroup={trainingGroup}
                                refetchTrainingGroup={refetchTrainingGroup}
                                setShowExercisesCard={setShowExercisesCard}
                            />
                        ) : (
                            <>
                                {selectedTrainingGroup && (
                                    <div className="flex items-center justify-center">
                                        <Button
                                            className="w-12 h-12 rounded-full"
                                            variant="outline"
                                            onClick={() =>
                                                setShowExercisesCard(true)
                                            }
                                        >
                                            <Dumbbell />
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                        {selectedTrainingGroup && trainingTableData ? (
                            <TrainingGroupTable
                                columns={trainingGroupTableColumns}
                                data={trainingTableData}
                                refetchTrainingGroup={refetchTrainingGroup}
                            />
                        ) : null}
                    </div>
                    <EndTrainingGroupButton
                        refetchTrainingById={refetchTrainingById}
                        refetchTrainingGroup={refetchTrainingGroup}
                        trainingGroup={trainingGroup}
                    />
                </div>
            </main>
            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
