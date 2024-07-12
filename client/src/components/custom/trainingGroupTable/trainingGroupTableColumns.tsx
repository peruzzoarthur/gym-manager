import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type TrainingGroupTableProps = {
    tgId: string | null
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
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                        className="w-4 text-xs text-right sm:w-auto sm:text-sm"
                    >
                        N°
                        <ArrowUpDown className="w-3 h-3 ml-0.5" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('index')}
                </div>
            )
        },
    },
    {
        accessorKey: 'sets',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">Séries</div>
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('sets')}
                </div>
            )
        },
    },
    {
        accessorKey: 'reps',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">Reps</div>
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('reps')}
                </div>
            )
        },
    },
    {
        accessorKey: 'name',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">Nome</div>
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('name')}
                </div>
            )
        },
    },
    {
        accessorKey: 'load',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">Carga</div>
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('load')}
                </div>
            )
        },
    },
]
