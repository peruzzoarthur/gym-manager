import { Module } from '@nestjs/common';
import { CombinedExercisesService } from './combined-exercises.service';
import { CombinedExercisesController } from './combined-exercises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExercisesService } from 'src/exercises/exercises.service';

@Module({
  controllers: [CombinedExercisesController],
  providers: [CombinedExercisesService, ExercisesService],
  imports: [PrismaModule],
})
export class CombinedExercisesModule { }
