import { IsString, IsUUID } from "class-validator";

export class CreateTrainingGroupDto {
  @IsString()
  key: string;

  @IsUUID()
  trainingId: string;
}
