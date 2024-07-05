import { IsArray, IsInt, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateCombinedExerciseDto {
  @IsOptional()
  @IsInt()
  index: number;

  @IsArray()
  @IsUUID(undefined, { each: true })
  refIds: string[];

  @IsInt()
  reps: number;
  @IsInt()
  sets: number;

  @IsOptional()
  @IsNumber()
  load: number;

  @IsUUID()
  trainingGroupId: string;
}
