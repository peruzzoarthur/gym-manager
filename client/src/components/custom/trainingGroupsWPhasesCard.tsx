import { twMerge } from 'tailwind-merge'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { Training, TrainingGroup } from '@/types/gym.types'

type TrainingGroupKeysCard = {
    selectedTrainingGroup: string | null
    setSelectedTrainingGroup: (
        value: React.SetStateAction<string | null>
    ) => void
    trainingById: Training
    showAllTrainingGroups: boolean
    setShowAllTrainingGroups: (value: React.SetStateAction<boolean>) => void
    trainingGroupsByKey: TrainingGroup[]
}

export const TrainingGroupsWPhasesCard = ({
    setShowAllTrainingGroups,
    trainingGroupsByKey,
    showAllTrainingGroups,
    selectedTrainingGroup,
    trainingById,
    setSelectedTrainingGroup,
}: TrainingGroupKeysCard) => {
    return (
        <Card
            className={twMerge(
                'flex justify-center items-center gap-4 p-2',
                selectedTrainingGroup ? '' : 'col-span-2'
            )}
        >
            <div className="grid grid-cols-3 space-y-0.5">
                {trainingGroupsByKey.map((tg) => {
                    if (tg.id === selectedTrainingGroup) {
                        return (
                            <Badge
                                className="justify-center ml-1 cursor-pointer "
                                variant="default"
                                onClick={() => setSelectedTrainingGroup(tg.id)}
                                key={tg.id}
                            >
                                {tg.phase}
                            </Badge>
                        )
                    } else {
                        if (tg.done) {
                            return (
                                <Badge
                                    className="justify-center ml-1 cursor-pointer "
                                    variant="secondary"
                                    onClick={() =>
                                        setSelectedTrainingGroup(tg.id)
                                    }
                                    key={tg.id}
                                >
                                    {tg.phase}
                                </Badge>
                            )
                        }
                        if (!tg.done) {
                            return (
                                <Badge
                                    className="justify-center ml-1 cursor-pointer "
                                    variant="outline"
                                    onClick={() =>
                                        setSelectedTrainingGroup(tg.id)
                                    }
                                    key={tg.id}
                                >
                                    {tg.phase}
                                </Badge>
                            )
                        }
                    }
                })}
            </div>
            <div className="flex flex-col items-center pt-4 space-y-4 ">
                <div className="flex items-center space-x-2">
                    {showAllTrainingGroups ? (
                        <Label>Show all</Label>
                    ) : (
                        <Label>Unfinished</Label>
                    )}
                    <Switch
                        checked={showAllTrainingGroups}
                        onCheckedChange={() =>
                            setShowAllTrainingGroups((prevState) => !prevState)
                        }
                    />
                </div>
                {trainingById && (
                    <>
                        <Badge variant="secondary">{`Rest[${trainingById?.rest}]`}</Badge>
                        <Badge variant="secondary">{`Tempo[${trainingById?.tempo}]`}</Badge>
                    </>
                )}
            </div>
        </Card>
    )
}
