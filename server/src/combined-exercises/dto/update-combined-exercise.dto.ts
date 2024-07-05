import { PartialType } from '@nestjs/swagger';
import { CreateCombinedExerciseDto } from './create-combined-exercise.dto';

export class UpdateCombinedExerciseDto extends PartialType(CreateCombinedExerciseDto) {}
