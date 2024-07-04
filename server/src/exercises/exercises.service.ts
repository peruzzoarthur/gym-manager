import { Injectable } from "@nestjs/common";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    // Find the highest current index in the training group
    const highestIndexExercise = await this.prisma.exercise.findFirst({
      where: {
        trainingGroups: {
          some: {
            id: createExerciseDto.trainingGroupId,
          },
        },
      },
      orderBy: { index: "desc" },
    });

    console.log(highestIndexExercise);
    // Set the new index
    const newIndex = highestIndexExercise ? highestIndexExercise.index + 1 : 1;

    // Create the new exercise with the new index

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
        index: newIndex,
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

  async createToAllWithSameKey(createExerciseDto: CreateExerciseDto) {
    const tg = await this.prisma.trainingGroup.findUniqueOrThrow({
      where: {
        id: createExerciseDto.trainingGroupId,
      },
    });
    const key = tg.key;
    const training = await this.prisma.training.findUniqueOrThrow({
      where: {
        id: tg.trainingId,
      },
      select: {
        trainingGroups: true,
      },
    });
    const filteredByKey = training.trainingGroups.filter(
      (tg) => tg.key === key && tg.done === false
    );
    console.log(filteredByKey);
    return tg;
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
