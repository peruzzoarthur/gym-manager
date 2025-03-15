import { Module } from '@nestjs/common';
import { ExerciseReferencesService } from './exercise-references.service';
import { ExerciseReferencesController } from './exercise-references.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExerciseReferencesController],
  providers: [ExerciseReferencesService, JwtService],
  imports: [PrismaModule],
})
export class ExerciseReferencesModule { }
