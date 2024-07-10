import { Button } from '../ui/button'
import { Card } from '../ui/card'

type MuscleGroupsStateSelectProps = {
    chestOn: boolean
    setChestOn: React.Dispatch<React.SetStateAction<boolean>>
    backOn: boolean
    setBackOn: React.Dispatch<React.SetStateAction<boolean>>
    legsOn: boolean
    setLegsOn: React.Dispatch<React.SetStateAction<boolean>>
    shouldersOn: boolean
    setShouldersOn: React.Dispatch<React.SetStateAction<boolean>>
    bicepsOn: boolean
    setBicepsOn: React.Dispatch<React.SetStateAction<boolean>>
    tricepsOn: boolean
    setTricepsOn: React.Dispatch<React.SetStateAction<boolean>>
    complexOn: boolean
    setComplexOn: React.Dispatch<React.SetStateAction<boolean>>
    calvesOn: boolean
    setCalvesOn: React.Dispatch<React.SetStateAction<boolean>>
}

type MuscleGroupButtonProps = {
    isActive: boolean
    toggle: () => void
    label: string
}

const MuscleGroupButton = ({
    isActive,
    toggle,
    label,
}: MuscleGroupButtonProps) => (
    <Button
        className="text-xs"
        variant={isActive ? 'default' : 'outline'}
        onClick={toggle}
    >
        {label}
    </Button>
)

export const MuscleGroupsStateCard = ({
    chestOn,
    setChestOn,
    backOn,
    setBackOn,
    legsOn,
    setLegsOn,
    shouldersOn,
    setShouldersOn,
    bicepsOn,
    setBicepsOn,
    tricepsOn,
    setTricepsOn,
    complexOn,
    setComplexOn,
    calvesOn,
    setCalvesOn,
}: MuscleGroupsStateSelectProps) => {
    return (
        <Card className="grid grid-cols-4 gap-1 p-2 sm:grid-cols-5">
            <MuscleGroupButton
                isActive={chestOn}
                toggle={() => setChestOn((prev) => !prev)}
                label="CHEST"
            />
            <MuscleGroupButton
                isActive={backOn}
                toggle={() => setBackOn((prev) => !prev)}
                label="BACK"
            />
            <MuscleGroupButton
                isActive={shouldersOn}
                toggle={() => setShouldersOn((prev) => !prev)}
                label="SHOULDERS"
            />
            <MuscleGroupButton
                isActive={legsOn}
                toggle={() => setLegsOn((prev) => !prev)}
                label="LEGS"
            />
            <MuscleGroupButton
                isActive={calvesOn}
                toggle={() => setCalvesOn((prev) => !prev)}
                label="CALVES"
            />
            <MuscleGroupButton
                isActive={bicepsOn}
                toggle={() => setBicepsOn((prev) => !prev)}
                label="BICEPS"
            />
            <MuscleGroupButton
                isActive={tricepsOn}
                toggle={() => setTricepsOn((prev) => !prev)}
                label="TRICEPS"
            />
            <MuscleGroupButton
                isActive={complexOn}
                toggle={() => setComplexOn((prev) => !prev)}
                label="COMPLEX"
            />
        </Card>
    )
}
