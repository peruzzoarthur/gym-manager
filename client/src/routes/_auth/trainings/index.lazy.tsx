import { CreateTrainingForm } from '@/components/custom/createTrainingForm'
import { TrainingsTable } from '@/components/custom/trainingsTable/trainingsTable'
import {
    TrainingsTableProps,
    trainingsTableColumns,
} from '@/components/custom/trainingsTable/trainingsTableColumns'
import { Badge } from '@/components/ui/badge'
import { useGetTrainings } from '@/hooks/useGetTrainings'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Route = createLazyFileRoute('/_auth/trainings/')({
    component: Trainings,
})

function Trainings() {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
    const [showTrainingsList, setShowTrainingsList] = useState<boolean>(false)
    const { trainings, refetchTrainings } = useGetTrainings()

    const trainingsTableData: TrainingsTableProps[] | undefined =
        trainings?.map((t) => {
            return {
                id: t.id,
                userId: t.user.id,
                creator: `${t.createdBy.firstName} ${t.createdBy.lastName}`,
                user: `${t.user.firstName} ${t.user.lastName}`,
                createdAt: new Date(t.createdAt).toLocaleDateString(),
                name: t.name ?? '',
                creatorId: t.createdBy.id,
            }
        })

    return (
        <div className="flex flex-col mt-2 space-y-2">
            <div className="flex flex-row justify-center gap-2 pb-2">
                <Badge
                    className={twMerge(
                        'cursor-pointer px-5 py-1 ',
                        showCreateForm
                            ? 'bg-primary'
                            : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                    onClick={() => setShowCreateForm((prevState) => !prevState)}
                >
                    Create
                </Badge>
                <Badge
                    className={twMerge(
                        'cursor-pointer px-5 py-1 ',
                        showTrainingsList
                            ? 'bg-primary'
                            : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                    onClick={() =>
                        setShowTrainingsList((prevState) => !prevState)
                    }
                >
                    List
                </Badge>
            </div>
            {showCreateForm ? (
                <CreateTrainingForm refetchTrainings={refetchTrainings} />
            ) : null}
            {showTrainingsList && trainingsTableData ? (
                <TrainingsTable
                    columns={trainingsTableColumns}
                    data={trainingsTableData}
                    refetchTrainings={refetchTrainings}
                />
            ) : null}
        </div>
    )
}
