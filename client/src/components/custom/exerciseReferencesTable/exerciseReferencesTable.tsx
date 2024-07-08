import {
    ColumnDef,
    Row,
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
    DropdownMenuItem,
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
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { ExerciseReference } from '@/types/gym.types'
import { axiosInstance } from '@/axiosInstance'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useGetRole } from '@/hooks/useGetRole'
import { ExerciseReferencesTableProps } from './exerciseReferencesTableColumns'

interface DataTableProps<TValue> {
    columns: ColumnDef<ExerciseReferencesTableProps, TValue>[]
    data: ExerciseReferencesTableProps[]
    refetchAllExerciseReferences: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<ExerciseReference[], Error>>
}

export function ExerciseReferencesTable<TValue>({
    columns,
    data,
    refetchAllExerciseReferences,
}: DataTableProps<TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
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
    const { role } = useGetRole()

    const handleDeleteExerciseReference = async (id: string) => {
        try {
            const {
                data: removedExerciseReference,
            }: { data: ExerciseReference } = await axiosInstance.delete(
                `/exercise-references/${id}`
            )
            return removedExerciseReference
        } catch (error) {
            return error
        }
    }

    const tableActionDeleteExerciseReference = async (
        row: Row<ExerciseReferencesTableProps>
    ) => {
        const exerciseReferenceId: string = row.original.id
        {
            if (exerciseReferenceId) {
                await handleDeleteExerciseReference(exerciseReferenceId)
                await refetchAllExerciseReferences()
            } else {
                throw new Error('Error deleting exerciseReference.')
            }
        }
    }

    return (
        <div className="flex flex-col w-full h-auto border rounded-md">
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
                                                <DropdownMenuItem
                                                    onClick={async () =>
                                                        tableActionDeleteExerciseReference(
                                                            row
                                                        )
                                                    }
                                                >
                                                    Delete training
                                                </DropdownMenuItem>
                                                <DropdownMenuItem></DropdownMenuItem>
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
                                No trainings
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end py-4 space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
