import { Module } from "@nestjs/common";
import { ExercisesService } from "./exercises.service";
import { ExercisesController } from "./exercises.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [PrismaModule],
  exports: [ExercisesService],
})
export class ExercisesModule {}
