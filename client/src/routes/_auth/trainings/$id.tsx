import { AddExercisesCard } from '@/components/custom/addExercisesCard'
import { EndTrainingGroupButton } from '@/components/custom/endTrainingGroupButton'
// import { ErrorBox } from '@/components/custom/errorBox'
import { TrainingGroupTable } from '@/components/custom/trainingGroupTable/trainingGroupTable'
import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { TrainingGroupsProgress } from '@/components/custom/trainingGroupsProgress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
// import { useToast } from '@/components/ui/use-toast'
import { useGetTrainingById } from '@/hooks/useGetTrainingById'
import { useGetTrainingGroup } from '@/hooks/useGetTrainingGroup'
import { useGetTrainingGroupsByTrainingWithKey } from '@/hooks/useGetTrainingGroupsByTrainingWithKey'
import { useGetUserByUserId } from '@/hooks/useGetUserByUserId'
import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Circle, Dumbbell } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

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

    const { trainingById, refetchTrainingById } = useGetTrainingById(id)
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

    const totalTrainingsGroupsDone = trainingById?.trainingGroups.filter(
        (tg) => tg.done === true
    ).length

    return (
        <main>
            <div className="flex flex-col items-center justify-center w-full mt-2 space-y-2">
                {trainingById && (
                    <div className="grid gap-2 sm:grid-cols-2">
                        <Card
                            className={twMerge(
                                'flex items-center gap-1 p-2',
                                totalTrainingsGroupsDone === 0
                                    ? 'col-span-2'
                                    : ''
                            )}
                        >
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
                                                setSelectedTrainingGroup(null)
                                            }}
                                            key={key}
                                        >
                                            {key}
                                        </Badge>
                                    )
                                }
                            })}
                            {user &&
                            user.activeTrainingId === trainingById.id ? (
                                <CheckCircle2
                                    className="ml-2 cursor-pointer"
                                    // onClick={async () =>
                                    //     handleActiveTraining(
                                    //         user.id,
                                    //         trainingById.id,
                                    //         'deactivate'
                                    //     )
                                    // }
                                />
                            ) : (
                                <Circle
                                    className="ml-2 cursor-pointer"
                                    // onClick={async () =>
                                    //     handleActiveTraining(
                                    //         user.id,
                                    //         trainingById.id,
                                    //         'activate'
                                    //     )
                                    // }
                                />
                            )}
                        </Card>
                        <TrainingGroupsProgress trainingById={trainingById} />
                    </div>
                )}
                <div className="grid gap-2 sm:gap-4 md:grid-cols-2">
                    {trainingGroupsByKey &&
                        selectedTrainingGroupsKey !== 'all' && (
                            <Card
                                className={twMerge(
                                    'grid grid-cols-2 gap-4 p-2',
                                    selectedTrainingGroup ? '' : 'col-span-2'
                                )}
                            >
                                <div className="grid grid-cols-3 space-y-0.5">
                                    {trainingGroupsByKey.map((tg) => {
                                        if (tg.id === selectedTrainingGroup) {
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
                                                    (prevState) => !prevState
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
            {/* {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )} */}
        </main>
    )
}
