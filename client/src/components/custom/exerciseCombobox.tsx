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
import { useMediaQuery } from 'usehooks-ts'

type ComboBoxResponsiveProps = {
    selectedExercise: ExerciseReference | null
    setSelectedExercise: React.Dispatch<
        React.SetStateAction<ExerciseReference | null>
    >
    addCombinedId: (id: string) => void
    exerciseReferences: ExerciseReference[] | undefined
}

export function ExerciseComboBox({
    selectedExercise,
    setSelectedExercise,
    addCombinedId,
    exerciseReferences,
}: ComboBoxResponsiveProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="justify-start w-full overflow-hidden"
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
                        addCombinedId={addCombinedId}
                        exerciseReferences={exerciseReferences}
                    />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-start w-full overflow-hidden"
                >
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
                        addCombinedId={addCombinedId}
                        exerciseReferences={exerciseReferences}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function ExercisesList({
    setOpen,
    setSelectedExercise,
    addCombinedId,
    exerciseReferences,
}: {
    setOpen: (open: boolean) => void
    setSelectedExercise: (exercise: ExerciseReference | null) => void
    addCombinedId: (id: string) => void
    exerciseReferences: ExerciseReference[] | undefined
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter exercises..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {exerciseReferences?.map((e) => (
                        <CommandItem
                            key={e.id}
                            value={e.name}
                            onSelect={(value) => {
                                setSelectedExercise(
                                    exerciseReferences.find(
                                        (priority) => priority.name === value
                                    ) || null
                                )
                                addCombinedId(e.id)
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
