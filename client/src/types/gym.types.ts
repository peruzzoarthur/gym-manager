export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
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
  trainingsCreated: Training[]
}

export type Training = {
  id: string
  name?: string | null
  trainingGroups: TrainingGroup[]
  user: User
  activatedAtUser: User[]
  daysInWeek: number
  done: boolean
  createdAt: Date
  updatedAt: Date
  objective?: string | null
  createdBy: User
  createdByUserId: string
}

export type TrainingGroup = {
  id: string
  key: string
  exercises: Exercise[]
  combinedExercises: CombinedExercise[]
  done: boolean
  doneAt?: string | null
  groups: Group[]
  training: Training
  trainingId: string
  number: number
  active: boolean
  activeAt?: Date | null
}

export type Exercise = {
  id: string
  ref: ExerciseReference
  refId: string
  load?: number | null
  reps?: number | null
  sets?: number | null
  tempo?: string | null
  trainingGroups: TrainingGroup[]
  index?: number | null
  combinedExercises: CombinedExercise[]
}

export type CombinedExercise = {
  id: string
  exercises: Exercise[]
  index?: number | null
  trainingGroups: TrainingGroup[]
}

export type ExerciseReference = {
  id: string
  name: string
  exercises: Exercise[]
  groups: Group[]
  createdAt: Date
  updatedAt: Date
  createdBy: User
  createdByUserId: string
}

export type ErrorResponse = {
  message: string
}
