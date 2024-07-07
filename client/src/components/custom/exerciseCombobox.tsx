import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ExerciseReference } from '@/types/gym.types'
import { useGetAllExerciseReferences } from '@/hooks/useGetAllExercises'
import { useMediaQuery } from 'usehooks-ts'

type ComboBoxResponsiveProps = {
    selectedExercise: ExerciseReference | null
    setSelectedExercise: React.Dispatch<
        React.SetStateAction<ExerciseReference | null>
    >
}

export function ExerciseComboBox({
    selectedExercise,
    setSelectedExercise,
}: ComboBoxResponsiveProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                    >
                        {selectedExercise ? (
                            <>{selectedExercise.name}</>
                        ) : (
                            <>+ Select exercise</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <ExercisesList
                        setOpen={setOpen}
                        setSelectedExercise={setSelectedExercise}
                    />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {selectedExercise ? (
                        <>{selectedExercise.name}</>
                    ) : (
                        <>+ Select exercise</>
                    )}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <ExercisesList
                        setOpen={setOpen}
                        setSelectedExercise={setSelectedExercise}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function ExercisesList({
    setOpen,
    setSelectedExercise,
}: {
    setOpen: (open: boolean) => void
    setSelectedExercise: (exercise: ExerciseReference | null) => void
}) {
    const { allExerciseReferences } = useGetAllExerciseReferences()

    return (
        <Command>
            <CommandInput placeholder="Filter exercises..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {allExerciseReferences?.map((e) => (
                        <CommandItem
                            key={e.id}
                            value={e.name}
                            onSelect={(value) => {
                                setSelectedExercise(
                                    allExerciseReferences.find(
                                        (priority) => priority.name === value
                                    ) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {e.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
