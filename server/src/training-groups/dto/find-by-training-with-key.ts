import { IsString, IsUUID } from 'class-validator';

export class FindByTrainingWithKeyDto {
  @IsString()
  key: string;

  @IsUUID()
  trainingId: string;
}
