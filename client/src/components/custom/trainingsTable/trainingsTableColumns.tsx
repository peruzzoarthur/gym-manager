import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type TrainingsTableProps = {
    id: string
    name: string
    createdAt: string
    creator: string
    creatorId: string
    user: string
    userId: string
}

export const trainingsTableColumns: ColumnDef<TrainingsTableProps>[] = [
    {
        accessorKey: 'name',
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
                        Name
                        <ArrowUpDown className="w-3 h-3 ml-0.5" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <Link to="/trainings/$id" params={{ id: row.original.id }}>
                    <div className="text-xs font-medium text-right sm:text-sm">
                        {row.getValue('name')}
                    </div>
                </Link>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => {
            return (
                <div className="text-xs text-right sm:text-sm">Created at</div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-xs font-medium text-right sm:text-sm">
                    {row.getValue('createdAt')}
                </div>
            )
        },
    },
    {
        accessorKey: 'user',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">User</div>
        },
        cell: ({ row }) => {
            return (
                <Link to="/users/$id" params={{ id: row.original.userId }}>
                    <div className="text-xs font-medium text-right sm:text-sm">
                        {row.original.user}
                    </div>
                </Link>
            )
        },
    },
    {
        accessorKey: 'creator',
        header: () => {
            return <div className="text-xs text-right sm:text-sm">Creator</div>
        },
        cell: ({ row }) => {
            return (
                <Link to="/users/$id" params={{ id: row.original.creatorId }}>
                    <div className="text-xs font-medium text-right sm:text-sm">
                        {row.getValue('creator')}
                    </div>
                </Link>
            )
        },
    },
]
