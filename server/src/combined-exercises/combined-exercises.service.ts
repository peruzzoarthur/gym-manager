import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCombinedExerciseDto } from './dto/create-combined-exercise.dto';
import { UpdateCombinedExerciseDto } from './dto/update-combined-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CombinedExercisesService {
  constructor(private prisma: PrismaService) { }

  async create(createCombinedExerciseDto: CreateCombinedExerciseDto) {
    if (createCombinedExerciseDto.refIds.length < 2) {
      throw new HttpException(
        'Select at least two exercises to create a combined exercise',
        HttpStatus.BAD_REQUEST,
      );
    }
    const highestIndexExercise = await this.prisma.exercise.findFirst({
      where: {
        trainingGroups: {
          some: {
            id: createCombinedExerciseDto.trainingGroupId,
          },
        },
      },
      orderBy: { index: 'desc' },
    });

    const highestIndexCombinedExercise =
      await this.prisma.combinedExercise.findFirst({
        where: {
          trainingGroups: {
            some: {
              id: createCombinedExerciseDto.trainingGroupId,
            },
          },
        },
        orderBy: { index: 'desc' },
      });

    let newIndex = 1;

    if (highestIndexExercise && highestIndexCombinedExercise) {
      newIndex =
        Math.max(
          highestIndexExercise.index,
          highestIndexCombinedExercise.index,
        ) + 1;
    } else if (highestIndexExercise) {
      newIndex = highestIndexExercise.index + 1;
    } else if (highestIndexCombinedExercise) {
      newIndex = highestIndexCombinedExercise.index + 1;
    }

    const promises = createCombinedExerciseDto.refIds.map(async (id) => {
      const exercise = await this.prisma.exercise.create({
        data: {
          load: createCombinedExerciseDto.load,
          refId: id,
          sets: createCombinedExerciseDto.sets,
          reps: createCombinedExerciseDto.reps,
          trainingGroups: {
            connect: {
              id: createCombinedExerciseDto.trainingGroupId,
            },
          },
          index: newIndex,
        },
      });
      return exercise;
    });

    const results = await Promise.all(promises);

    const ids = results.flatMap((e) => e.id);

    return await this.prisma.combinedExercise.create({
      data: {
        index: newIndex,
        trainingGroups: {
          connect: {
            id: createCombinedExerciseDto.trainingGroupId,
          },
        },
        exercises: {
          connect: ids.map((id) => ({ id })),
        },
      },
    });
  }

  async createToAllWithSameKey(
    createCombinedExerciseDto: CreateCombinedExerciseDto,
  ) {
    if (createCombinedExerciseDto.refIds.length < 2) {
      throw new HttpException(
        'Select at least two exercises to create a combined exercise',
        HttpStatus.BAD_REQUEST,
      );
    }
    const highestIndexExercise = await this.prisma.exercise.findFirst({
      where: {
        trainingGroups: {
          some: {
            id: createCombinedExerciseDto.trainingGroupId,
          },
        },
      },
      orderBy: { index: 'desc' },
    });

    const highestIndexCombinedExercise =
      await this.prisma.combinedExercise.findFirst({
        where: {
          trainingGroups: {
            some: {
              id: createCombinedExerciseDto.trainingGroupId,
            },
          },
        },
        orderBy: { index: 'desc' },
      });

    let newIndex = 1;

    if (highestIndexExercise && highestIndexCombinedExercise) {
      newIndex =
        Math.max(
          highestIndexExercise.index,
          highestIndexCombinedExercise.index,
        ) + 1;
    } else if (highestIndexExercise) {
      newIndex = highestIndexExercise.index + 1;
    } else if (highestIndexCombinedExercise) {
      newIndex = highestIndexCombinedExercise.index + 1;
    }

    const tg = await this.prisma.trainingGroup.findUniqueOrThrow({
      where: {
        id: createCombinedExerciseDto.trainingGroupId,
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
      (tg) => tg.key === key && tg.done === false,
    );
    const ids = filteredByKey.flatMap((tg) => tg.id);

    for (let i = 0; i < ids.length; i++) {
      const promises = createCombinedExerciseDto.refIds.map(async (id) => {
        const exercise = await this.prisma.exercise.create({
          data: {
            load: createCombinedExerciseDto.load,
            refId: id,
            sets: createCombinedExerciseDto.sets,
            reps: createCombinedExerciseDto.reps,
            trainingGroups: {
              connect: {
                id: ids[i],
              },
            },
            index: newIndex,
          },
        });
        return exercise;
      });
      const results = await Promise.all(promises);

      const exercisesIds = results.flatMap((e) => e.id);

      await this.prisma.combinedExercise.create({
        data: {
          index: newIndex,
          trainingGroups: {
            connect: {
              id: createCombinedExerciseDto.trainingGroupId,
            },
          },
          exercises: {
            connect: exercisesIds.map((id) => ({ id })),
          },
        },
      });
    }

    return tg;
  }

  findAll() {
    return `This action returns all combinedExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combinedExercise`;
  }

  update(id: number, updateCombinedExerciseDto: UpdateCombinedExerciseDto) {
    return `This action updates a #${id} combinedExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} combinedExercise`;
  }
}
