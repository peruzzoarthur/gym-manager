import { Module } from "@nestjs/common";
import { ExerciseReferencesService } from "./exercise-references.service";
import { ExerciseReferencesController } from "./exercise-references.controller";
import { PrismaModule } from "prisma/prisma.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ExerciseReferencesController],
  providers: [ExerciseReferencesService, JwtService],
  imports: [PrismaModule],
})
export class ExerciseReferencesModule {}
