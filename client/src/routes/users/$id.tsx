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

export const Route = createFileRoute('/users/$id')({
    component: User,
})

function User() {
    const { id } = Route.useParams()
    const { user } = useGetUserByUserId(id)
    const { userTrainings } = useGetTrainingsByUserId(id)
    const [selectedTraining, setSelectedTraining] = useState<
        string | undefined
    >()
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState<
        string | undefined
    >()
    const { trainingById } = useGetTrainingById(selectedTraining)
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
            <div className="flex flex-col justify-center w-11/12">
                <header className="flex flex-col items-center full ">
                    <h1 className="text-2xl">
                        {user?.firstName} {user?.lastName}
                    </h1>
                </header>
                <main>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {/* <h2>Create training</h2> */}
                        <Card className="flex flex-col p-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 ">
                            {userTrainings ? (
                                <Select
                                    onValueChange={(value) =>
                                        setSelectedTraining(value)
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecionar treino" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Training</SelectLabel>
                                            {userTrainings.map((t) => (
                                                <SelectItem
                                                    value={t.id}
                                                    key={t.id}
                                                >
                                                    {new Date(
                                                        t.createdAt
                                                    ).toLocaleDateString()}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>No trainings</p>
                            )}
                            {selectedTraining && trainingById ? (
                                <Select
                                    onValueChange={(value) =>
                                        setSelectedTrainingGroup(value)
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecionar grupo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Index</SelectLabel>
                                            {trainingById.trainingGroups.map(
                                                (tg) => (
                                                    <SelectItem
                                                        value={tg.id}
                                                        key={tg.id}
                                                    >
                                                        {tg.key}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : null}
                        </Card>
                        {trainingTableData && (
                            <TrainingGroupCard
                                trainingTableData={trainingTableData}
                                training={trainingById}
                                trainingGroup={trainingGroup}
                                refetchTrainingGroup={refetchTrainingGroup}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}
