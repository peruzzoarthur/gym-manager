import { TrainingGroupTable } from '@/components/custom/trainingGroupTable/trainingGroupTable'
import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from '@/components/custom/trainingGroupTable/trainingGroupTableColumns'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { useGetAllActiveTrainings } from '@/hooks/useGetAllActiveTrainings'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/activity/')({
    component: Activity,
})

function Activity() {
    const { allActiveTrainings, refetchAllActiveTrainings } =
        useGetAllActiveTrainings()

    return (
        <div className="flex flex-col w-full mt-2 space-y-4 sm:w-11/12 md:w-10/12 xl:w-8/12">
            <h2 className="ml-2 text-xl font-bold ">Active trainings</h2>
            {allActiveTrainings &&
                allActiveTrainings.map((object) => {
                    const trainingTableData:
                        | TrainingGroupTableProps[]
                        | undefined = object.tg?.exercises.map((e) => {
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
                        <div key={object.tg.id} className="space-y-1">
                            <Card className="p-2">
                                <Link
                                    to={'/trainings/$id'}
                                    params={{ id: object.t.id }}
                                >
                                    <CardTitle>{object.t.name}</CardTitle>
                                </Link>
                                <div className="flex">
                                    <CardDescription>{`Created by ${object.t.createdBy.firstName} ${object.t.createdBy.lastName} for ${object.t.user.firstName} ${object.t.user.lastName} `}</CardDescription>

                                    {object.user.profileImage && (
                                        <img
                                            src={object.user.profileImage}
                                            alt="Avatar"
                                            className="object-cover ml-1 rounded-full w-9 h-9"
                                        />
                                    )}
                                </div>
                            </Card>
                            {trainingTableData ? (
                                <TrainingGroupTable
                                    columns={trainingGroupTableColumns}
                                    data={trainingTableData}
                                    refetchAllActiveTrainings={
                                        refetchAllActiveTrainings
                                    }
                                />
                            ) : null}
                        </div>
                    )
                })}
        </div>
    )
}
