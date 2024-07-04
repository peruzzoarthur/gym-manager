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
    const { trainings } = useGetTrainings()

    const trainingsTableData: TrainingsTableProps[] | undefined =
        trainings?.map((t) => {
            const usersStringArray = t.users.map(
                (u) => `${u.firstName} ${u.lastName}`
            )
            return {
                id: t.id,
                creator: `${t.createdBy.firstName} ${t.createdBy.lastName}`,
                users: usersStringArray,
                createdAt: new Date(t.createdAt).toLocaleDateString(),
                name: t.name ?? '',
            }
        })

    return (
        <div>
            <div className="flex flex-row justify-center gap-2 pb-2">
                <Badge
                    className={twMerge(
                        'cursor-pointer', // Common classes
                        showCreateForm
                            ? 'bg-primary'
                            : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' // Conditional classes
                    )}
                    onClick={() => setShowCreateForm((prevState) => !prevState)}
                >
                    Create
                </Badge>
                <Badge
                    className={twMerge(
                        'cursor-pointer', // Common classes
                        showTrainingsList
                            ? 'bg-primary'
                            : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' // Conditional classes
                    )}
                    onClick={() =>
                        setShowTrainingsList((prevState) => !prevState)
                    }
                >
                    List
                </Badge>
            </div>
            {showCreateForm ? <CreateTrainingForm /> : null}
            {showTrainingsList && trainingsTableData ? (
                <TrainingsTable
                    columns={trainingsTableColumns}
                    data={trainingsTableData}
                />
            ) : null}
        </div>
    )
}
