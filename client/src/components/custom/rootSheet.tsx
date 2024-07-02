import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@tanstack/react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip'
import { Home, Settings, User } from 'lucide-react'
import { useGetRole } from '@/hooks/useGetRole'

export function RootSheet() {
    const { role } = useGetRole()
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <div className="flex">
                        <aside className="fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-muted/40 w-14 sm:w-16">
                            <nav className="flex flex-col items-center gap-4 px-2 py-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                to="/"
                                                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground "
                                            >
                                                <Home className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Home
                                                </span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Home
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                to="/profile"
                                                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 [&.active]:bg-accent text-accent-foreground hover:text-foreground "
                                            >
                                                <User className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Profile
                                                </span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Profile
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </nav>
                            <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-4">
                                <TooltipProvider>
                                    {role === 'ADMIN' && <></>}

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                to="/"
                                                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground "
                                            >
                                                <Settings className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Settings
                                                </span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Settings
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </nav>
                        </aside>
                    </div>

                    {/* </div> */}
                </SheetTrigger>
                {/* <div className="w-full mt-5">
                    <Outlet />
                </div> */}
                <SheetContent side="left" className="max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="/"
                            className="flex items-center gap-4 px-2.5 [&.active]:bg-accent rounded-sm p-2  text-foreground"
                        >
                            <Home className="w-5 h-5" />
                            Home
                        </Link>
                        <Link
                            to="/profile"
                            className="flex items-center gap-4 px-2.5 [&.active]:bg-accent rounded-sm p-2  text-foreground"
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </Link>

                        {role === 'ADMIN' && (
                            <>
                                <hr />
                                <p>Admin</p>
                            </>
                        )}
                        <hr />
                        <Link
                            to="/"
                            className="flex items-center gap-4 px-2.5 [&.active]:bg-accent rounded-sm p-2  text-foreground"
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
