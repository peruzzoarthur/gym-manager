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

export const MuscleGroupsStateCard = ({
    backOn,
    chestOn,
    legsOn,
    setBackOn,
    setChestOn,
    setLegsOn,
    setShouldersOn,
    shouldersOn,
    bicepsOn,
    setBicepsOn,
    complexOn,
    setComplexOn,
    tricepsOn,
    setTricepsOn,
    calvesOn,
    setCalvesOn,
}: MuscleGroupsStateSelectProps) => {
    return (
        <Card className="grid grid-cols-3 gap-1 p-2 sm:grid-cols-4">
            {chestOn ? (
                <Button
                    variant="default"
                    onClick={() => setChestOn((prevState) => !prevState)}
                >
                    CHEST
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setChestOn((prevState) => !prevState)}
                >
                    CHEST
                </Button>
            )}
            {backOn ? (
                <Button
                    variant="default"
                    onClick={() => setBackOn((prevState) => !prevState)}
                >
                    BACK
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setBackOn((prevState) => !prevState)}
                >
                    BACK
                </Button>
            )}
            {shouldersOn ? (
                <Button
                    variant="default"
                    onClick={() => setShouldersOn((prevState) => !prevState)}
                >
                    SHOULDERS
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setShouldersOn((prevState) => !prevState)}
                >
                    SHOULDERS
                </Button>
            )}
            {legsOn ? (
                <Button
                    variant="default"
                    onClick={() => setLegsOn((prevState) => !prevState)}
                >
                    LEGS
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setLegsOn((prevState) => !prevState)}
                >
                    LEGS
                </Button>
            )}
            {calvesOn ? (
                <Button
                    variant="default"
                    onClick={() => setCalvesOn((prevState) => !prevState)}
                >
                    CALVES
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setCalvesOn((prevState) => !prevState)}
                >
                    CALVES
                </Button>
            )}
            {bicepsOn ? (
                <Button
                    variant="default"
                    onClick={() => setBicepsOn((prevState) => !prevState)}
                >
                    BICEPS
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setBicepsOn((prevState) => !prevState)}
                >
                    BICEPS
                </Button>
            )}
            {tricepsOn ? (
                <Button
                    variant="default"
                    onClick={() => setTricepsOn((prevState) => !prevState)}
                >
                    TRICEPS
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setTricepsOn((prevState) => !prevState)}
                >
                    TRICEPS
                </Button>
            )}
            {complexOn ? (
                <Button
                    variant="default"
                    onClick={() => setComplexOn((prevState) => !prevState)}
                >
                    COMPLEX
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => setComplexOn((prevState) => !prevState)}
                >
                    COMPLEX
                </Button>
            )}
        </Card>
    )
}
