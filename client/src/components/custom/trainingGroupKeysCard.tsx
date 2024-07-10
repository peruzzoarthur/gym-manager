import { Training, User } from '@/types/gym.types'
import { AxiosResponse } from 'axios'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'

type TrainingGroupKeysCard = {
    trainingGroupsKeys: string[]
    selectedTrainingGroupsKey: string | null
    setSelectedTrainingGroupsKey: (
        value: React.SetStateAction<string | null>
    ) => void
    trainingById: Training
    setSelectedTrainingGroup: (
        value: React.SetStateAction<string | null>
    ) => void
    handleActiveTraining: (
        userId: string,
        trainingId: string,
        option: 'activate' | 'deactivate'
    ) => Promise<AxiosResponse<User, unknown> | undefined>
    user: User
    showExercisesCard: boolean
}

export const TrainingGroupKeysCard = ({
    trainingById,
    trainingGroupsKeys,
    selectedTrainingGroupsKey,
    setSelectedTrainingGroup,
    setSelectedTrainingGroupsKey,
    user,
    handleActiveTraining,
}: TrainingGroupKeysCard) => {
    const totalTrainingsGroupsDone = trainingById?.trainingGroups.filter(
        (tg) => tg.done === true
    ).length

    return (
        <Card
            className={twMerge(
                'flex items-center gap-1 p-2',
                totalTrainingsGroupsDone === 0 ? 'col-span-2' : ''
            )}
        >
            {trainingGroupsKeys.map((key) => {
                if (key === selectedTrainingGroupsKey) {
                    return (
                        <Badge
                            className="ml-1 cursor-pointer"
                            variant="default"
                            onClick={() => {
                                setSelectedTrainingGroupsKey(key)
                            }}
                            key={key}
                        >
                            {key}
                        </Badge>
                    )
                } else {
                    return (
                        <Badge
                            className="ml-1 cursor-pointer"
                            variant="outline"
                            onClick={() => {
                                setSelectedTrainingGroupsKey(key)
                                setSelectedTrainingGroup(null)
                            }}
                            key={key}
                        >
                            {key}
                        </Badge>
                    )
                }
            })}
            {user.activeTrainingId === trainingById.id ? (
                <CheckCircle2
                    className="ml-2 cursor-pointer"
                    onClick={async () =>
                        handleActiveTraining(
                            user.id,
                            trainingById.id,
                            'deactivate'
                        )
                    }
                />
            ) : (
                <Circle
                    className="ml-2 cursor-pointer"
                    onClick={async () =>
                        handleActiveTraining(
                            user.id,
                            trainingById.id,
                            'activate'
                        )
                    }
                />
            )}
        </Card>
    )
}
