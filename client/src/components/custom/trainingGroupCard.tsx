import { PlusCircle } from 'lucide-react'
import { Card } from '../ui/card'
import { TrainingGroupTable } from './trainingGroupTable/trainingGroupTable'
import {
    TrainingGroupTableProps,
    trainingGroupTableColumns,
} from './trainingGroupTable/trainingGroupTableColumns'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'

type TrainingGroupCardProps = {
    trainingTableData: TrainingGroupTableProps[]
}
export const TrainingGroupCard = ({
    trainingTableData,
}: TrainingGroupCardProps) => {
    const { allExerciseReferences } = useGetAllExerciseReferences()
    return (
        <Card className="flex flex-col items-center justify-center p-8 space-y-4">
            <TrainingGroupTable
                columns={trainingGroupTableColumns}
                data={trainingTableData}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <PlusCircle />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Exercises</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Card>
    )
}

export default TrainingGroupCard
