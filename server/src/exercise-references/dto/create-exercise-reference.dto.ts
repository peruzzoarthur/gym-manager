import { Group } from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateExerciseReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(Group, { each: true })
  groups: Group[];
}
