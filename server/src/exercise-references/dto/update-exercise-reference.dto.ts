import { PartialType } from '@nestjs/swagger';
import { CreateExerciseReferenceDto } from './create-exercise-reference.dto';

export class UpdateExerciseReferenceDto extends PartialType(CreateExerciseReferenceDto) {}
