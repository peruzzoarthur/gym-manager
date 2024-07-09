import { CreateExerciseForm } from '@/components/custom/createExerciseForm'
import { ExerciseReferencesTable } from '@/components/custom/exerciseReferencesTable/exerciseReferencesTable'
import {
    ExerciseReferencesTableProps,
    exerciseReferencesTableColumns,
} from '@/components/custom/exerciseReferencesTable/exerciseReferencesTableColumns'
import { Badge } from '@/components/ui/badge'
import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Route = createLazyFileRoute('/_auth/exercises')({
    component: Exercises,
})

function Exercises() {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
    const [showExerciseReferencesList, setShowExerciseReferencesList] =
        useState<boolean>(false)

    const { allExerciseReferences, refetchAllExerciseReferences } =
        useGetAllExerciseReferences()

    const exerciseReferencesTableData:
        | ExerciseReferencesTableProps[]
        | undefined = allExerciseReferences?.map((e) => {
        return {
            id: e.id,
            creator: `${e.createdBy.firstName} ${e.createdBy.lastName}`,
            createdAt: new Date(e.createdAt).toLocaleDateString(),
            name: e.name ?? '',
            groups: e.groups,
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
                        showExerciseReferencesList
                            ? 'bg-primary'
                            : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                    onClick={() =>
                        setShowExerciseReferencesList((prevState) => !prevState)
                    }
                >
                    List
                </Badge>
            </div>
            {showCreateForm ? (
                <CreateExerciseForm
                    refetchAllExerciseReferences={refetchAllExerciseReferences}
                />
            ) : null}
            {showExerciseReferencesList && exerciseReferencesTableData ? (
                <ExerciseReferencesTable
                    columns={exerciseReferencesTableColumns}
                    data={exerciseReferencesTableData}
                    refetchAllExerciseReferences={refetchAllExerciseReferences}
                />
            ) : null}
        </div>
    )
}
