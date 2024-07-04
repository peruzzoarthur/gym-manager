import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useGetUsers } from '@/hooks/useGetUsers'

type UserSelectProps = {
    onChange: (...event: unknown[]) => void
    value: string
}
export const UserSelect = ({ onChange, value }: UserSelectProps) => {
    const { users } = useGetUsers()
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {users &&
                        users.map((u) => (
                            <SelectItem value={u.id}>
                                {u.firstName} {u.lastName}
                            </SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
