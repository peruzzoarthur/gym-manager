import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TrainingGroupsModule } from './training-groups/training-groups.module';
import { ExerciseReferencesModule } from './exercise-references/exercise-references.module';
import { ExercisesModule } from './exercises/exercises.module';
import { TrainingsModule } from './trainings/trainings.module';
import { CombinedExercisesModule } from './combined-exercises/combined-exercises.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
      }),
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),

    UsersModule,
    AuthModule,
    TrainingGroupsModule,
    ExerciseReferencesModule,
    TrainingsModule,
    ExercisesModule,
    CombinedExercisesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
