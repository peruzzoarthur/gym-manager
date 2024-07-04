import { Phase } from "@prisma/client";
import { IsEnum, IsInt, IsString, IsUUID } from "class-validator";

export class FindByTrainingWithKeyDto {
  @IsString()
  key: string;

  @IsUUID()
  trainingId: string;
}
