import { Injectable } from "@nestjs/common";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    return await this.prisma.exercise.create({
      data: {
        ref: {
          connect: {
            id: createExerciseDto.refId,
          },
        },
        trainingGroups: {
          connect: {
            id: createExerciseDto.trainingGroupId,
          },
        },
        index: createExerciseDto.index,
        reps: createExerciseDto.reps,
        sets: createExerciseDto.sets,
        load: createExerciseDto.load,
      },
    });
  }

  async findAll() {
    return await this.prisma.exercise.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
