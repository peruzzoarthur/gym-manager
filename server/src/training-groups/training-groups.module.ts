import { Module } from "@nestjs/common";
import { TrainingGroupsService } from "./training-groups.service";
import { TrainingGroupsController } from "./training-groups.controller";
import { PrismaModule } from "prisma/prisma.module";
import { ExercisesService } from "src/exercises/exercises.service";
import { UsersService } from "src/users/users.service";
import { TrainingsService } from "src/trainings/trainings.service";

@Module({
  controllers: [TrainingGroupsController],
  providers: [
    TrainingGroupsService,
    ExercisesService,
    UsersService,
    TrainingsService,
  ],
  imports: [PrismaModule],
  exports: [TrainingGroupsService],
})
export class TrainingGroupsModule {}
