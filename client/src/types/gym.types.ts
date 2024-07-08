export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum Phase {
    CIS = 'CIS',
    ONE = 'ONE',
    TWO = 'TWO',
    UNCATEGORIZED = 'UNCATEGORIZED',
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

export interface User {
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
    trainingsCreated: Training[]
}

export interface Training {
    id: string
    name?: string | null
    trainingGroups: TrainingGroup[]
    user: User
    activatedAtUser: User[]
    tempo: Tempo
    daysInWeek: number
    done: boolean
    createdAt: Date
    updatedAt: Date
    reps: number
    sets: number
    rest: number
    objective?: string | null
    createdBy: User
    createdByUserId: string
}

export interface TrainingGroup {
    id: string
    key: string
    exercises: Exercise[]
    combinedExercises: CombinedExercise[]
    done: boolean
    doneAt?: Date | null
    groups: Group[]
    training: Training
    trainingId: string
    phase: Phase
    number: number
}

export interface Exercise {
    id: string
    ref: ExerciseReference
    refId: string
    load?: number | null
    reps?: number | null
    sets?: number | null
    trainingGroups: TrainingGroup[]
    index?: number | null
    combinedExercises: CombinedExercise[]
}

export interface CombinedExercise {
    id: string
    exercises: Exercise[]
    index?: number | null
    trainingGroups: TrainingGroup[]
}

export interface ExerciseReference {
    id: string
    name: string
    exercises: Exercise[]
    groups: Group[]
}

export type ErrorResponse = {
    message: string
}
