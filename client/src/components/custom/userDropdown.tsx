import mari from '../../styles/jpg/mari.jpg'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/themeProvider'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/axiosInstance'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from '@tanstack/react-router'

import { useGetUserById } from '@/hooks/useGetUser'

export const UserDropdown = () => {
    const navigate = useNavigate()
    const { user } = useGetUserById()
    const authentication = useAuth()

    const logoutHandler = async () => {
        const data: AxiosResponse<boolean> =
            await axiosInstance.get('auth/logout/')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        authentication.signOut()
        await navigate({ to: '/login' })
        return data
    }
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 overflow-hidden rounded-full"
                >
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <img
                            src={mari}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <DropdownMenuLabel>Set theme</DropdownMenuLabel>
                    {theme === 'dark' && (
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={true}
                                onCheckedChange={() => setTheme('light')}
                                id="set-theme-light"
                            />
                            {/* <Label htmlFor="set-theme-light">Set theme</Label> */}
                        </div>
                    )}
                    {theme === 'light' && (
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={false}
                                onCheckedChange={() => setTheme('dark')}
                                id="set-theme-dark"
                            />
                        </div>
                    )}
                    {theme === 'system' && (
                        <div className="flex flex-col justify-center space-x-2 align-middle">
                            <DropdownMenuSeparator />

                            <Label
                                className="text-2xl rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-40"
                                onClick={() => setTheme('light')}
                            >
                                🌞
                            </Label>
                            <DropdownMenuSeparator />

                            <Label
                                className="text-2xl rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-40"
                                onClick={() => setTheme('dark')}
                            >
                                🌚
                            </Label>
                        </div>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
