import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
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

    const highestIndexCombinedExercise =
      await this.prisma.combinedExercise.findFirst({
        where: {
          trainingGroups: {
            some: {
              id: createExerciseDto.trainingGroupId,
            },
          },
        },
        orderBy: { index: "desc" },
      });

    let newIndex = 1;

    if (highestIndexExercise && highestIndexCombinedExercise) {
      newIndex =
        Math.max(
          highestIndexExercise.index,
          highestIndexCombinedExercise.index
        ) + 1;
    } else if (highestIndexExercise) {
      newIndex = highestIndexExercise.index + 1;
    } else if (highestIndexCombinedExercise) {
      newIndex = highestIndexCombinedExercise.index + 1;
    }

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

    const ids = filteredByKey.flatMap((tg) => tg.id);

    const results = [];
    for (const id of ids) {
      const exercise = await this.create({
        load: createExerciseDto.load,
        refId: createExerciseDto.refId,
        sets: createExerciseDto.sets,
        reps: createExerciseDto.reps,
        trainingGroupId: id,
        index: undefined,
      });
      results.push(exercise);
    }

    return results[0];
  }

  async findAll() {
    return await this.prisma.exercise.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return await this.prisma.exercise.update({
      where: { id: id },
      data: updateExerciseDto,
    });
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
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: id },
      select: {
        id: true,
        combinedExercises: true,
      },
    });
    if (!exercise) {
      throw new HttpException("Exercise not found", HttpStatus.NOT_FOUND);
    }

    const combinedExercises = exercise.combinedExercises;
    if (combinedExercises.length >= 1) {
      for (let i = 0; i < combinedExercises.length; i++) {
        await this.prisma.combinedExercise.delete({
          where: {
            id: combinedExercises[i].id,
          },
        });
      }
    }

    return await this.prisma.exercise.delete({ where: { id: id } });
  }
}
