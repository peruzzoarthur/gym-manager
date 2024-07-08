import { Link } from '@tanstack/react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip'
import { Calendar, Dumbbell, Home, User } from 'lucide-react'
import { useGetUserById } from '@/hooks/useGetUser'
import { UserDropdown } from './userDropdown'
import { useGetRole } from '@/hooks/useGetRole'

export function RootNav() {
    const { role } = useGetRole()
    const { user } = useGetUserById()
    return (
        <aside className="fixed top-0 left-0 z-50 w-full h-20 bg-muted/80 backdrop-blur-md">
            <nav className="flex items-center justify-between h-full px-4 py-4 border-b">
                <div className="flex items-center justify-center flex-grow gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/"
                                    className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground"
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {user && (
                                    <Link
                                        to={'/users/$id'}
                                        params={{ id: user.id }}
                                        className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="sr-only">Profile</span>
                                    </Link>
                                )}
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Profile
                            </TooltipContent>
                        </Tooltip>
                        {role === 'ADMIN' && (
                            <>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            to={'/exercises'}
                                            className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground"
                                        >
                                            <Dumbbell className="w-5 h-5" />
                                            <span className="sr-only">
                                                Exercises
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Exercises
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            to={'/trainings'}
                                            className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground"
                                        >
                                            <Calendar className="w-5 h-5" />
                                            <span className="sr-only">
                                                Trainings
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Trainings
                                    </TooltipContent>
                                </Tooltip>
                            </>
                        )}
                    </TooltipProvider>
                </div>
                <div className="flex-shrink-0">
                    <UserDropdown />
                </div>
            </nav>
        </aside>
    )
}
