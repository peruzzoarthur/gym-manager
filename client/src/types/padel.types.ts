export type User = {
    firstName: string
    lastName: string
    email: string
    id: string
    dob: string
    playerId: string
    profileImage: string
}

export type Invitation = {
    id: string
    eventId?: string | null
    matchId: string | null
    inviterId: string
    invitedId: string
    inviteType: InviteType
}

export enum InviteType {
    FRIENDS = 'FRIENDS',
    EVENT = 'EVENT',
    DOUBLES = 'DOUBLES',
    MATCH = 'MATCH',
}

export type Player = {
    firstName: string
    lastName: string
    categoryId: string
    position: Position
    id: string
    category: Category
    doubles: Double[]
    matches: Match[]
}

export type Double = {
    players: Player[]
    id: string
    category?: Category
    categoryId: string
    doubleId: string
    double?: Double
    matches: Match[]
    matchesWins: Match[]
    games: Game[]
    gamesWins: Game[]
    eventDouble: EventDouble[]
    firstPlaceInCategory: CategoryGroup[]
    secondPlaceInCategory: CategoryGroup[]
}

export type EventDouble = {
    categoryId: string
    doubleId: string
    eventId: string
    double?: Double
    category?: Category
    event?: PadelEvent
    doublesGroupId: string
}

export type EventRequest = {
    categoryId: string
    doubleId: string
    eventId: string
    double?: Double
    category?: Category
    event?: PadelEvent
}

export type Place = {
    id: string
    name: string
    address: string
    courts: Court[]
}

export type Court = {
    name: string
    id: string
}

export type Category = {
    id: string
    type: CatType
    level: number
    doubles?: Double[]
    eventDoubles?: Double[]
    totalMatches?: number
    matches?: Match[]
    players?: Player[]
}

export type PadelEvent = {
    id: string
    eventType: EventType
    name: string
    places: Place[]
    eventDoubles?: EventDouble[]
    eventRequests?: EventRequest[]
    categories: Category[]
    eventMatches: EventMatch[]
    startDate: string
    finishDate: string
    timeOfFirstMatch: number
    timeOfLastMatch: number
    matchDurationInMinutes: number
    matchDates: MatchDate[]
    totalMatches?: number
    availableMatchDates?: number
    suitable?: boolean
    courts: Court[]
    isActive: boolean
    isFinished: boolean
    categoriesGroups: CategoryGroup[]
    isGroupMatchesFinished: boolean
    matchType: MatchType
}

export type EventMatch = {
    number: number
    id: string
    type: EventMatchType
    eventId: string
    matchId: string
    categoryGroupId?: string | null
    doublesGroupId?: string | null
    event: Event
    match: Match
    matchesWinnersRef: Match[]
    categoryGroup?: CategoryGroup | null
    doublesGroup?: DoublesGroup | null
}

export type DoublesGroup = {
    id: string
    key: string
    doubles: number[]
    categoryGroupId?: string | null
    firstPlaceDoublesId?: string | null
    secondPlaceDoublesId?: string | null
    categoryGroup?: CategoryGroup | null
    firstPlace?: Double | null
    secondPlace?: Double | null
    groupMatches: EventMatch[]
}

export type CategoryGroup = {
    id: string
    categoryId: string
    event: PadelEvent | null
    eventId: string | null
    category: Category
    groups: DoublesGroup[]
    finalMatches: EventMatch[]
    firstPlace?: Double
    firstPlaceId?: string
    secondPlace?: Double
    secondPlaceId?: string
}

export enum EventMatchType {
    GROUP = 'GROUP',
    ROUND_OF_16 = 'ROUND_OF_16',
    ROUND_OF_8 = 'ROUND_OF_8',
    ROUND_OF_4 = 'ROUND_OF_4',
    FINAL = 'FINAL',
    UNCLASSIFIED = 'UNCLASSIFIED',
}

export enum EventType {
    ALLxALL = 'ALLxALL',
    GROUPS = 'GROUPS',
}

export enum MatchType {
    BO3 = 'BO3',
    BO2_SUPERTIE = 'BO2_SUPERTIE',
    SUPERSET = 'SUPERSET',
}

export type Match = {
    id: string
    number: number
    doubles: Double[]
    category: Category
    categoryId: string
    event: PadelEvent
    eventId: string
    doublesId: string
    isFinished: boolean
    sets: Set[]
    winner: Double
    winnerDoublesId: string | null
    matchDate?: MatchDate
    eventMatch?: EventMatch
}

export type MatchDate = {
    id: string | null
    start: string
    finish: string
    matchId: string
    match: Match | null
    court: Court
}

export type Set = {
    id: string
    type: string
    setWinner: Double
    isFinished: boolean
    result: string
    games: Game[]
}

export type Game = {
    winner: Double
    winnerId: string
}
export enum CatType {
    ALL = 'ALL',
    F = 'F',
    M = 'M',
}

export enum Position {
    REVES = 'REVES',
    DRIVE = 'DRIVE',
}

export type ErrorResponse = {
    message: string
}
