import { Injectable } from "@nestjs/common";
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

    const promises = ids.map(async (id) => {
      const exercise = await this.create({
        load: createExerciseDto.load,
        refId: createExerciseDto.refId,
        sets: createExerciseDto.sets,
        reps: createExerciseDto.reps,
        trainingGroupId: id,
        index: undefined,
      });
      return exercise;
    });

    const results = await Promise.all(promises);
    return results[0];
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
