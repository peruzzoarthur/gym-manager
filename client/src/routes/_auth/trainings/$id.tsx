import { AddExercisesCard } from '@/components/custom/addExercisesCard'
import { EndTrainingGroupButton } from '@/components/custom/endTrainingGroupButton'
import { TrainingGroupKeysCard } from '@/components/custom/trainingGroupKeysCard'
// import { ErrorBox } from '@/components/custom/errorBox'
import { TrainingGroupTable } from '@/components/custom/trainingGroupTable/trainingGroupTable'
import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { TrainingGroupsProgress } from '@/components/custom/trainingGroupsProgress'
import { TrainingGroupsWPhasesCard } from '@/components/custom/trainingGroupsWPhasesCard'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { useGetTrainingById } from '@/hooks/useGetTrainingById'
import { useGetTrainingGroup } from '@/hooks/useGetTrainingGroup'
import { useGetTrainingGroupsByTrainingWithKey } from '@/hooks/useGetTrainingGroupsByTrainingWithKey'
import { useGetUserByUserId } from '@/hooks/useGetUserByUserId'
import { createFileRoute } from '@tanstack/react-router'
import { Dumbbell } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_auth/trainings/$id')({
    component: Training,
})

function Training() {
    // const [isError, setError] = useState<boolean>(false)
    // const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const { id } = Route.useParams()
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState<
        string | null
    >(null)
    const [showExercisesCard, setShowExercisesCard] = useState<boolean>(false)

    const [selectedTrainingGroupsKey, setSelectedTrainingGroupsKey] = useState<
        string | null
    >(null)

    // const { toast } = useToast()
    const [showAllTrainingGroups, setShowAllTrainingGroups] =
        useState<boolean>(true)

    const { trainingById, refetchTrainingById, activeTrainingGroup } =
        useGetTrainingById(id)
    const { user } = useGetUserByUserId(trainingById?.user.id)

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

    useEffect(() => {
        if (activeTrainingGroup?.id) {
            setSelectedTrainingGroupsKey(activeTrainingGroup.key)
            setSelectedTrainingGroup(activeTrainingGroup.id)
        }
    }, [activeTrainingGroup])

    const trainingTableData: TrainingGroupTableProps[] | undefined =
        trainingGroup?.exercises.map((e) => {
            return {
                id: e.id,
                index: e.index ?? undefined,
                reps: e.reps ?? undefined,
                sets: e.sets ?? undefined,
                load: e.load ?? undefined,
                name: e.ref.name,
                tgId: selectedTrainingGroup,
            }
        })

    return (
        <div className="flex flex-col justify-center w-full p-2 space-y-2 sm:w-11/12">
            <header>
                {trainingById && user && (
                    <Card className="p-2">
                        <CardTitle>{trainingById.name}</CardTitle>
                        <div className="flex">
                            <CardDescription>{`Created by ${trainingById.createdBy.firstName} ${trainingById.createdBy.lastName} for ${trainingById.user.firstName} ${trainingById.user.lastName} `}</CardDescription>

                            {user.profileImage && (
                                <img
                                    src={user.profileImage}
                                    alt="Avatar"
                                    className="object-cover ml-1 rounded-full w-9 h-9"
                                />
                            )}
                        </div>
                    </Card>
                )}
            </header>
            <main className="mt-2">
                <div className="flex flex-col items-center justify-center w-full space-y-2">
                    {trainingById && user && (
                        <div className="grid gap-2 sm:grid-cols-2">
                            <TrainingGroupKeysCard
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
        </div>
    )
}
