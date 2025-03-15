import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrainingGroupDto {
  @IsString()
  key: string;

  @IsUUID()
  trainingId: string;

  @IsInt()
  number: number;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
