import { Module } from "@nestjs/common";
import { TrainingsController } from "./trainings.controller";
import { TrainingsService } from "./trainings.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { TrainingGroupsService } from "src/training-groups/training-groups.service";
import { ExercisesService } from "src/exercises/exercises.service";

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService, TrainingGroupsService, ExercisesService],
  imports: [PrismaModule],
})
export class TrainingsModule {}
