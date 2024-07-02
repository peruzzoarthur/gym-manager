import { Module } from "@nestjs/common";
import { ExerciseReferencesService } from "./exercise-references.service";
import { ExerciseReferencesController } from "./exercise-references.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  controllers: [ExerciseReferencesController],
  providers: [ExerciseReferencesService],
  imports: [PrismaModule],
})
export class ExerciseReferencesModule {}
