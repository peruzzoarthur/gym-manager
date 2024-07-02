import { Module } from "@nestjs/common";
import { TrainingsController } from "./trainings.controller";
import { TrainingsService } from "./trainings.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService],
  imports: [PrismaModule],
})
export class TrainingsModule {}
