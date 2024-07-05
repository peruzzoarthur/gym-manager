import { IsInt, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateExerciseDto {
  @IsOptional()
  @IsInt()
  index: number;

  @IsInt()
  reps: number;
  @IsInt()
  sets: number;

  @IsOptional()
  @IsNumber()
  load: number;

  @IsUUID()
  refId: string;

  @IsUUID()
  trainingGroupId: string;
}
