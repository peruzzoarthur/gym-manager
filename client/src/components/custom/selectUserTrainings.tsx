import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Training, User as UserType } from '@/types/gym.types'

type SelectUserTrainingsProps = {
    user: UserType
    setSelectedTraining: React.Dispatch<React.SetStateAction<string | null>>
    userTrainings: Training[]
    activeTraining: Training | undefined
    selectedTrainingGroup: string | null
    setSelectedTrainingGroup: React.Dispatch<
        React.SetStateAction<string | null>
    >
}

export const SelectUserTrainings = ({
    user,
    setSelectedTraining,
    userTrainings,
    activeTraining,
    selectedTrainingGroup,
    setSelectedTrainingGroup,
}: SelectUserTrainingsProps) => {
    return (
        <Select
            onValueChange={(value) => {
                setSelectedTraining(value)
                if (selectedTrainingGroup) {
                    setSelectedTrainingGroup(null)
                }
            }}
            defaultValue={
                user.activeTraining ? user.activeTraining.id : undefined
            }
        >
            <SelectTrigger className="w-auto text-xs ">
                <SelectValue
                    placeholder={
                        activeTraining
                            ? `${activeTraining.name}`
                            : 'Select training'
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="text-xs">Training</SelectLabel>
                    {userTrainings.map((t) => (
                        <SelectItem className="text-xs" value={t.id} key={t.id}>
                            {t.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
