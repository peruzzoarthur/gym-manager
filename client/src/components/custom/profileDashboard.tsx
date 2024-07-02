import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Link } from '@tanstack/react-router'
import { User } from '@/types/padel.types'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { ProfileHeaderCard } from './profileHeaderCard'

type ProfileDashboardProps = {
    user: User
    refetchUser: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<User | null, Error>>
}

export function ProfileDashboard({ user, refetchUser }: ProfileDashboardProps) {
    return (
        <div className="flex flex-col w-full min-h-screen ">
            <div className="flex flex-col gap-2 ">
                <header className="static top-0 flex flex-col items-start h-auto gap-4 px-4 py-4 bg-transparent border-0">
                    <Breadcrumb className="flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <ProfileHeaderCard user={user} refetchUser={refetchUser} />
                </header>

                <main className="grid items-start flex-1 grid-cols-1 gap-4 p-4 py-10 sm:px-6 sm:py-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            {/* <ProfileActivityCard
                                allCategories={allCategories}
                                allPlayers={allPlayers}
                            />
                            <ProfileMatchesInfoCard
                                totalMatchesWon={totalMatchesWon}
                                totalMatchesPlayed={totalMatchesPlayed}
                            />

                            <ProfileEventsAttendedCard
                                eventsAttended={eventsAttended}
                                firstPlaces={firsPlaceInCategories}
                                secondPlaces={secondPlaceInCategories}
                            /> */}
                        </div>
                        {/* {profileDoublesTableData && (
                            <ProfileDoublesTableCard
                                profileDoublesTableProps={
                                    profileDoublesTableData
                                }
                            />
                        )}
                        <ProfileMatchesTabs
                            matchesPeriod={matchesPeriod}
                            setMatchesPeriod={setMatchesPeriod}
                            showPendingMatches={showPendingMatches}
                            setShowPendingMatches={setShowPendingMatches}
                            showFinishedMatches={showFinishedMatches}
                            setShowFinishedMatches={setShowFinishedMatches}
                        />
                        <ProfileMatchesTableCard
                            profileMatchesTableData={profileMatchesTableData}
                        /> */}
                    </div>
                    <div>
                        {/* <ProfileInvitesCard
                            playerInvitations={playerInvitations}
                        /> */}
                    </div>
                </main>
            </div>
        </div>
    )
}
