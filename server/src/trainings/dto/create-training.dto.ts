import { Tempo } from "@prisma/client";
import { IsEnum, IsInt, IsUUID } from "class-validator";

export class CreateTrainingDto {
  @IsInt()
  daysInWeek: number;

  @IsEnum(Tempo)
  tempo: Tempo;

  @IsInt()
  reps: number;
  @IsInt()
  sets: number;
  @IsInt()
  rounds: number;
  @IsInt()
  rest: number;

  @IsUUID()
  userId: string;
}
