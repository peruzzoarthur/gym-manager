export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum Phase {
    CIS = 'CIS',
    ONE = 'ONE',
    TWO = 'TWO',
}

export enum Tempo {
    ONE2ONE = 'ONE2ONE',
    ONE2TWO = 'ONE2TWO',
    ONE2THREE = 'ONE2THREE',
    ONE2FOUR = 'ONE2FOUR',
}

export enum Group {
    CHEST = 'CHEST',
    BACK = 'BACK',
    TRICEPS = 'TRICEPS',
    BICEPS = 'BICEPS',
    LEGS = 'LEGS',
    CALVES = 'CALVES',
    COMPLEX = 'COMPLEX',
    SHOULDERS = 'SHOULDERS',
}

export type User = {
    id: string
    firstName?: string | null
    lastName?: string | null
    email: string
    password: string
    dob?: Date | null
    createdAt: Date
    updatedAt: Date
    role: Role
    hashedRt?: string | null
    profileImage?: string | null
    trainings: Training[]
    activeTraining?: Training | null
    activeTrainingId?: string | null
}

export type Training = {
    id: string
    trainingGroups: TrainingGroup[]
    users: User[]
    activatedAtUser: User[]
    tempo: Tempo
    daysInWeek: number
    done: boolean
    createdAt: Date
    updatedAt: Date
    rounds: number
    reps: number
    sets: number
    rest: number
    createdBy: User
    createdByUserId: string
    objective?: string
    name?: string
}

export type TrainingGroup = {
    id: string
    key: string
    exercises: Exercise[]
    done: boolean
    doneAt?: string
    groups: Group[]
    training: Training
    trainingId: string
    phase: Phase
    number: number
}

export type Exercise = {
    id: string
    ref: ExerciseReference
    refId: string
    load?: number | null
    reps?: number | null
    sets?: number | null
    trainingGroups: TrainingGroup[]
    index?: number | null
}

export type ExerciseReference = {
    id: string
    name: string
    exercises: Exercise[]
    groups: Group[]
}

export type ErrorResponse = {
    message: string
}
