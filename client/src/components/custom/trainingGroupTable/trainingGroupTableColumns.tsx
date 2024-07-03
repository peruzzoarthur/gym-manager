import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type TrainingGroupTableProps = {
    id: string
    index: number | undefined
    sets: number | undefined
    reps: number | undefined
    load: number | undefined
    name: string
}

export const trainingGroupTableColumns: ColumnDef<TrainingGroupTableProps>[] = [
    {
        accessorKey: 'index',
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        N°
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right">
                    {row.getValue('index')}
                </div>
            )
        },
    },
    {
        accessorKey: 'sets',
        header: () => {
            return <div className="text-right">Séries </div>
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right">
                    {row.getValue('sets')}
                </div>
            )
        },
    },
    {
        accessorKey: 'reps',
        header: () => {
            return <div className="text-right">Reps</div>
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right">
                    {row.getValue('reps')}
                </div>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Name
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right">
                    {row.getValue('name')}
                </div>
            )
        },
    },
    {
        accessorKey: 'load',
        header: () => {
            return <div className="text-right">Carga</div>
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-right">
                    {row.getValue('load')}
                </div>
            )
        },
    },
]
