import { Card, CardContent, CardFooter } from '../ui/card'
import { Training } from '@/types/gym.types'
import { Progress } from '../ui/progress'

type TrainingGroupsProgressProps = {
    trainingById: Training
}
export const TrainingGroupsProgress = ({
    trainingById,
}: TrainingGroupsProgressProps) => {
    const totalTrainingsGroupsDone = trainingById?.trainingGroups.filter(
        (tg) => tg.done === true
    ).length
    const totalTrainingGroups = trainingById?.trainingGroups.length

    return (
        <>
            {totalTrainingsGroupsDone && totalTrainingGroups ? (
                <Card className="flex flex-col p-1">
                    <CardContent>
                        <h3 className="flex items-center justify-center text-sm text-muted-foreground">
                            {`${trainingById.trainingGroups.length - trainingById.trainingGroups.filter((tg) => tg.done === true).length} left`}
                        </h3>
                    </CardContent>
                    <CardFooter>
                        <Progress
                            value={
                                (totalTrainingsGroupsDone * 100) /
                                totalTrainingGroups
                            }
                            aria-label="training_progress"
                        />
                    </CardFooter>
                </Card>
            ) : null}
        </>
    )
}
