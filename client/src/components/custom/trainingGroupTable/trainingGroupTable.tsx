import {
    ColumnDef,
    // Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import React from 'react'
// import { axiosInstance } from '@/axiosInstance'
import { useGetRole } from '@/hooks/useGetRole'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { TrainingGroupTableProps } from './trainingGroupTableColumns'

interface DataTableProps<TValue> {
    columns: ColumnDef<TrainingGroupTableProps, TValue>[]
    data: TrainingGroupTableProps[]
}

export function TrainingGroupTable<TValue>({
    columns,
    data,
}: DataTableProps<TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const { role } = useGetRole()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    // const handleDeleteCategory = async (id: string) => {
    //     try {
    //         const { data: removedCategory }: { data: Category } =
    //             await axiosInstance.delete(`/training/${id}`)
    //         return removedCategory
    //     } catch (error) {
    //         return error
    //     }
    // }

    // const tableActionDeleteCategory = async (
    //     row: Row<TrainingTableProps>
    // ) => {
    //     const categoryId: string = row.original.id
    //     {
    //         if (categoryId) {
    //             await handleDeleteCategory(categoryId)
    //             await refetchAllTraining()
    //         } else {
    //             throw new Error('Error deleting category.')
    //         }
    //     }
    // }

    return (
        <div className="flex w-full h-auto border rounded-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                                {role === 'ADMIN' ? (
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="w-8 h-8 p-0"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                {/* <DropdownMenuItem
                                                    onClick={async () =>
                                                        tableActionDeleteCategory(
                                                            row
                                                        )
                                                    }
                                                >
                                                    Delete doubles from event
                                                </DropdownMenuItem> */}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
