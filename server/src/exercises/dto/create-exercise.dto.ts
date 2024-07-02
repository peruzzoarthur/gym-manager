import { IsDecimal, IsInt, IsOptional, IsUUID } from "class-validator";

export class CreateExerciseDto {
  @IsOptional()
  @IsInt()
  index: number;

  @IsInt()
  reps: number;
  @IsInt()
  sets: number;

  @IsOptional()
  @IsDecimal()
  load: number;

  @IsUUID()
  refId: string;

  @IsUUID()
  trainingGroupId: string;
}
