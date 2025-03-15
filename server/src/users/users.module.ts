import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { TrainingsService } from "src/trainings/trainings.service";
import { TrainingGroupsService } from "src/training-groups/training-groups.service";
import { ExercisesService } from "src/exercises/exercises.service";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    TrainingsService,
    TrainingGroupsService,
    ExercisesService,
  ],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
