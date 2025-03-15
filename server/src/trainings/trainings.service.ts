import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingGroupsService } from 'src/training-groups/training-groups.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingsService {
  constructor(
    private prisma: PrismaService,
    private trainingGroupsService: TrainingGroupsService,
  ) { }
  async createForUser(createTrainingDto: CreateTrainingDto) {
    const training = await this.prisma.training.create({
      data: {
        daysInWeek: createTrainingDto.daysInWeek,
        name: createTrainingDto.name,
        user: {
          connect: {
            id: createTrainingDto.userId,
          },
        },
        createdBy: {
          connect: {
            id: createTrainingDto.creatorId,
          },
        },
      },
    });

    const keys = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i = 0; i < training.daysInWeek; i++) {
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        number: i + 1,
      });
    }
    return training;
  }

  async findAll() {
    return await this.prisma.training.findMany({
      select: {
        id: true,
        daysInWeek: true,
        done: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        name: true,
        user: true,
        trainingGroups: {
          select: {
            id: true,
            key: true,
            done: true,
            groups: true,
            exercises: {
              select: {
                index: true,
                sets: true,
                reps: true,
                ref: true,
                load: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.training.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        user: true,
        name: true,
        daysInWeek: true,
        done: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
        trainingGroups: {
          orderBy: { key: 'asc' },
          select: {
            id: true,
            key: true,
            done: true,
            doneAt: true,
            groups: true,
            active: true,
            activeAt: true,
            exercises: {
              select: {
                id: true,
                index: true,
                sets: true,
                reps: true,
                ref: true,
                load: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.training.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        daysInWeek: true,
        done: true,
        createdAt: true,
        trainingGroups: true,
        name: true,
      },
    });
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  async remove(id: string) {
    const training = await this.prisma.training.findUnique({
      where: { id: id },
      select: {
        id: true,
        trainingGroups: true,
      },
    });

    if (!training) {
      throw new HttpException('Training not found', HttpStatus.NOT_FOUND);
    }

    const usersWithActiveTraining = await this.prisma.user.findMany({
      where: {
        activeTrainingId: id,
      },
    });

    if (usersWithActiveTraining.length > 0) {
      throw new HttpException(
        'One or more users have this training activated',
        HttpStatus.CONFLICT,
      );
    }

    const trainingGroups = training.trainingGroups;
    if (trainingGroups) {
      const promises = trainingGroups.map(async (tg) => {
        const deletedTg = await this.trainingGroupsService.remove(tg.id);

        return deletedTg;
      });
      await Promise.all(promises);
    }

    const deletedTraining = await this.prisma.training.delete({
      where: { id: id },
    });

    return deletedTraining;
  }
}
