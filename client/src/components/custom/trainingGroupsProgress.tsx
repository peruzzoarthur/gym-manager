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
        <Card className="flex flex-col p-1">
            <CardContent>
                <h3 className=" text-md text-muted-foreground">
                    {`${trainingById.trainingGroups.length - trainingById.trainingGroups.filter((tg) => tg.done === true).length} left`}
                </h3>
            </CardContent>
            <CardFooter>
                {totalTrainingsGroupsDone && totalTrainingGroups ? (
                    <Progress
                        value={
                            (totalTrainingsGroupsDone * 100) /
                            totalTrainingGroups
                        }
                        aria-label="training_progress"
                    />
                ) : null}
            </CardFooter>
        </Card>
    )
}
