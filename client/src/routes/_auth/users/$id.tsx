import { TrainingGroupTableProps } from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { Card } from '@/components/ui/card'
import { useGetTrainingsByUserId } from '@/hooks/useGetTrainingsByUserId'
import { useGetUserByUserId } from '@/hooks/useGetUserByUserId'
import { createFileRoute } from '@tanstack/react-router'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useGetTrainingById } from '@/hooks/useGetTrainingById'
import { useGetTrainingGroup } from '@/hooks/useGetTrainingGroup'
import { TrainingGroupCard } from '@/components/custom/trainingGroupCard'
import { Badge } from '@/components/ui/badge'
import { useGetTrainingGroupsByTrainingWithKey } from '@/hooks/useGetTrainingGroupsByTrainingWithKey'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_auth/users/$id')({
    component: User,
})

function User() {
    const { id } = Route.useParams()
    const { user } = useGetUserByUserId(id)
    const { userTrainings } = useGetTrainingsByUserId(id)
    const [selectedTraining, setSelectedTraining] = useState<
        string | undefined
    >()
    const [selectedTrainingGroupsKey, setSelectedTrainingGroupsKey] = useState<
        string | undefined
    >()
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState<
        string | undefined
    >()

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

    return (
        <>
            <Card className="flex flex-col justify-center w-11/12 p-4 space-y-4">
                <header className="flex flex-row items-center justify-center w-full space-x-4">
                    <h1 className="text-sm">
                        {user?.firstName} {user?.lastName}
                    </h1>
                    {userTrainings ? (
                        <Select
                            onValueChange={(value) =>
                                setSelectedTraining(value)
                            }
                        >
                            <SelectTrigger className="w-[140px] text-xs sm:text-base">
                                <SelectValue placeholder="Pick training" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-xs">
                                        Training
                                    </SelectLabel>
                                    {userTrainings.map((t) => (
                                        <SelectItem
                                            className="text-xs"
                                            value={t.id}
                                            key={t.id}
                                        >
                                            {t.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) : (
                        <p>No trainings</p>
                    )}
                </header>
                <main>
                    <div className="flex flex-col items-center justify-center w-full space-y-2">
                        {/* <h2>Create training</h2> */}
                        {trainingById && (
                            <Card className="p-2">
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
                                                        undefined
                                                    )
                                                }}
                                                key={key}
                                            >
                                                {key}
                                            </Badge>
                                        )
                                    }
                                })}
                            </Card>
                        )}
                        {trainingGroupsByKey &&
                            selectedTrainingGroupsKey !== 'all' && (
                                <Card className="grid grid-cols-2 gap-4 p-2 ">
                                    <div className="flex flex-col space-y-0.5">
                                        {trainingGroupsByKey.map((tg) => {
                                            if (
                                                tg.id === selectedTrainingGroup
                                            ) {
                                                return (
                                                    <Badge
                                                        className="ml-1 cursor-pointer"
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
                                                            className="ml-1 cursor-pointer"
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
                                                            className="ml-1 cursor-pointer"
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
                                </Card>
                            )}
                        {selectedTrainingGroup && trainingById ? (
                            <TrainingGroupCard
                                trainingTableData={trainingTableData}
                                training={trainingById}
                                trainingGroup={trainingGroup}
                                refetchTrainingGroup={refetchTrainingGroup}
                                refetchTrainingById={refetchTrainingById}
                            />
                        ) : null}
                    </div>
                </main>
            </Card>
        </>
    )
}
