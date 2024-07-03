import { Phase } from "@prisma/client";
import { IsEnum, IsInt, IsString, IsUUID } from "class-validator";

export class CreateTrainingGroupDto {
  @IsString()
  key: string;

  @IsUUID()
  trainingId: string;

  @IsEnum(Phase)
  phase: Phase;

  @IsInt()
  number: number;
}
