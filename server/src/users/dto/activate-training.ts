import { IsNotEmpty, IsString } from "class-validator";

export class ActivateTrainingDto {
  @IsString()
  @IsNotEmpty()
  trainingId: string;
}
