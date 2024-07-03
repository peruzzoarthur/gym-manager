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
      select: {
        id: true,
        index: true,
        sets: true,
        reps: true,
        ref: true,
        load: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.exercise.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  async setLoadToExercise(id: string, updateExerciseDto: UpdateExerciseDto) {
    return await this.prisma.exercise.update({
      where: { id: id },
      data: {
        load: updateExerciseDto.load,
      },
      select: {
        id: true,
        index: true,
        sets: true,
        reps: true,
        ref: true,
        load: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.exercise.delete({ where: { id: id } });
  }
}
