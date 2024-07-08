import { Group } from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateExerciseReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  creatorId: string;

  @IsArray()
  @IsEnum(Group, { each: true })
  groups: Group[];
}
