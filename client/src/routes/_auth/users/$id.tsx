import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { Card } from '@/components/ui/card'
import { useGetTrainingsByUserId } from '@/hooks/useGetTrainingsByUserId'
import { useGetUserByUserId } from '@/hooks/useGetUserByUserId'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useGetTrainingById } from '@/hooks/useGetTrainingById'
import { useGetTrainingGroup } from '@/hooks/useGetTrainingGroup'
import { Badge } from '@/components/ui/badge'
import { useGetTrainingGroupsByTrainingWithKey } from '@/hooks/useGetTrainingGroupsByTrainingWithKey'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Circle } from 'lucide-react'
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
import { twMerge } from 'tailwind-merge'

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

    const { trainingById, refetchTrainingById } =
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
                <header className="flex flex-col items-center justify-center w-full space-x-4 sm:gr">
                    <ProfileHeaderCard user={user} refetchUser={refetchUser}>
                        {userTrainings ? (
                            <SelectUserTrainings
                                setSelectedTraining={setSelectedTraining}
                                user={user}
                                userTrainings={userTrainings}
                                activeTraining={activeTraining}
                            />
                        ) : (
                            <p>No trainings</p>
                        )}
                    </ProfileHeaderCard>
                </header>
            )}

            <main>
                <div className="flex flex-col items-center justify-center w-full space-y-2">
                    {trainingById && user && (
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Card className="flex items-center gap-1 p-2">
                                {trainingGroupsKeys.map((key) => {
                                    if (key === selectedTrainingGroupsKey) {
                                        return (
                                            <Badge
                                                className="ml-1 cursor-pointer"
                                                variant="default"
                                                onClick={() => {
                                                    setSelectedTrainingGroupsKey(
                                                        key
                                                    )
                                                }}
                                                key={key}
                                            >
                                                {key}
                                            </Badge>
                                        )
                                    } else {
                                        return (
                                            <Badge
                                                className="ml-1 cursor-pointer"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedTrainingGroupsKey(
                                                        key
                                                    )
                                                    setSelectedTrainingGroup(
                                                        null
                                                    )
                                                }}
                                                key={key}
                                            >
                                                {key}
                                            </Badge>
                                        )
                                    }
                                })}
                                {user.activeTrainingId === trainingById.id ? (
                                    <CheckCircle2
                                        className="ml-2 cursor-pointer"
                                        onClick={async () =>
                                            handleActiveTraining(
                                                user.id,
                                                trainingById.id,
                                                'deactivate'
                                            )
                                        }
                                    />
                                ) : (
                                    <Circle
                                        className="ml-2 cursor-pointer"
                                        onClick={async () =>
                                            handleActiveTraining(
                                                user.id,
                                                trainingById.id,
                                                'activate'
                                            )
                                        }
                                    />
                                )}
                            </Card>
                            <TrainingGroupsProgress
                                trainingById={trainingById}
                            />
                        </div>
                    )}
                    <div className="grid gap-2 sm:gap-4 md:grid-cols-2">
                        {trainingGroupsByKey &&
                            selectedTrainingGroupsKey !== 'all' && (
                                <Card
                                    className={twMerge(
                                        'grid grid-cols-2 gap-4 p-2',
                                        selectedTrainingGroup
                                            ? ''
                                            : 'col-span-2'
                                    )}
                                >
                                    <div className="grid grid-cols-3 space-y-0.5">
                                        {trainingGroupsByKey.map((tg) => {
                                            if (
                                                tg.id === selectedTrainingGroup
                                            ) {
                                                return (
                                                    <Badge
                                                        className="justify-center ml-1 cursor-pointer"
                                                        variant="default"
                                                        onClick={() =>
                                                            setSelectedTrainingGroup(
                                                                tg.id
                                                            )
                                                        }
                                                        key={tg.id}
                                                    >
                                                        {tg.phase}
                                                    </Badge>
                                                )
                                            } else {
                                                if (tg.done) {
                                                    return (
                                                        <Badge
                                                            className="justify-center ml-1 cursor-pointer"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                setSelectedTrainingGroup(
                                                                    tg.id
                                                                )
                                                            }
                                                            key={tg.id}
                                                        >
                                                            {tg.phase}
                                                        </Badge>
                                                    )
                                                }
                                                if (!tg.done) {
                                                    return (
                                                        <Badge
                                                            className="justify-center ml-1 cursor-pointer"
                                                            variant="outline"
                                                            onClick={() =>
                                                                setSelectedTrainingGroup(
                                                                    tg.id
                                                                )
                                                            }
                                                            key={tg.id}
                                                        >
                                                            {tg.phase}
                                                        </Badge>
                                                    )
                                                }
                                            }
                                        })}
                                    </div>
                                    <div className="flex flex-col items-center pt-4 space-y-4 ">
                                        <div className="flex items-center space-x-2">
                                            {showAllTrainingGroups ? (
                                                <Label>Show all</Label>
                                            ) : (
                                                <Label>Unfinished</Label>
                                            )}
                                            <Switch
                                                checked={showAllTrainingGroups}
                                                onCheckedChange={() =>
                                                    setShowAllTrainingGroups(
                                                        (prevState) =>
                                                            !prevState
                                                    )
                                                }
                                            />
                                        </div>
                                        {trainingById && (
                                            <>
                                                <Badge variant="secondary">{`Rest[${trainingById?.rest}]`}</Badge>
                                                <Badge variant="secondary">{`Tempo[${trainingById?.tempo}]`}</Badge>
                                            </>
                                        )}
                                    </div>
                                </Card>
                            )}
                        {selectedTrainingGroup && trainingById ? (
                            <AddExercisesCard
                                trainingTableData={trainingTableData}
                                training={trainingById}
                                trainingGroup={trainingGroup}
                                refetchTrainingGroup={refetchTrainingGroup}
                            />
                        ) : null}
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
