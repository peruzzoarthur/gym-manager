import { Module } from "@nestjs/common";
import { TrainingsController } from "./trainings.controller";
import { TrainingsService } from "./trainings.service";
import { PrismaModule } from "prisma/prisma.module";
import { TrainingGroupsService } from "src/training-groups/training-groups.service";

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService, TrainingGroupsService],
  imports: [PrismaModule],
})
export class TrainingsModule {}
