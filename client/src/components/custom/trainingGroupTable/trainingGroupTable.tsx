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
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { TrainingGroupTableProps } from './trainingGroupTableColumns'
import {
    ErrorResponse,
    Exercise,
    Training,
    TrainingGroup,
    User,
} from '@/types/gym.types'
import { axiosInstance } from '@/axiosInstance'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { SetLoadDrawer } from '../setLoadDrawer'
import { useGetRole } from '@/hooks/useGetRole'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorBox } from '../errorBox'

interface DataTableProps<TValue> {
    columns: ColumnDef<TrainingGroupTableProps, TValue>[]
    data: TrainingGroupTableProps[]
    refetchTrainingGroup?: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<TrainingGroup, Error>>
    refetchAllActiveTrainings?: (
        options?: RefetchOptions | undefined
    ) => Promise<
        QueryObserverResult<
            | {
                  user: User
                  tg: TrainingGroup
                  t: Training
              }[]
            | null,
            Error
        >
    >
}

export function TrainingGroupTable<TValue>({
    columns,
    data,
    refetchTrainingGroup,
    refetchAllActiveTrainings,
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
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const handleFixIndexes = async (trainingGroupId: string | null) => {
        try {
            const data: AxiosResponse<User> = await axiosInstance.patch(
                `${import.meta.env.VITE_SERVER_URL}/training-groups/fix-indexes/${trainingGroupId}`
            )

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (axiosError.response && axiosError.response.status === 404) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
                if (axiosError.response && axiosError.response.status === 400) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage(`Error fixing exercises indexes`)
            }
        }
    }

    const handleDeleteExercise = async (id: string) => {
        try {
            const { data: removedExercise }: { data: Exercise } =
                await axiosInstance.delete(`/exercises/${id}`)
            return removedExercise
        } catch (error) {
            return error
        }
    }

    const tableActionDeleteExercise = async (
        row: Row<TrainingGroupTableProps>
    ) => {
        const exerciseId: string = row.original.id
        const tgId: string | null = row.original.tgId
        {
            if (exerciseId && tgId) {
                await handleDeleteExercise(exerciseId)
                await handleFixIndexes(tgId)
                if (refetchTrainingGroup) {
                    await refetchTrainingGroup()
                }
                if (refetchAllActiveTrainings) {
                    await refetchAllActiveTrainings()
                }
            } else {
                throw new Error('Error deleting exercise.')
            }
        }
    }

    return (
        <div className="flex w-full h-auto border rounded-md md:col-span-2">
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
                                <TableCell>
                                    <SetLoadDrawer
                                        exerciseId={row.original.id}
                                        refetchTrainingGroup={
                                            refetchTrainingGroup
                                        }
                                        refetchAllActiveTrainings={
                                            refetchAllActiveTrainings
                                        }
                                    />
                                </TableCell>
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
                                                        tableActionDeleteExercise(
                                                            row
                                                        )
                                                    }
                                                >
                                                    Delete exercise from list
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
                                No exercises
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
