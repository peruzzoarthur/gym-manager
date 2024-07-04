import { Injectable } from "@nestjs/common";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { PrismaService } from "src/prisma.service";
import { TrainingGroupsService } from "src/training-groups/training-groups.service";
import { Phase } from "@prisma/client";

@Injectable()
export class TrainingsService {
  constructor(
    private prisma: PrismaService,
    private trainingGroupsService: TrainingGroupsService
  ) {}
  async create(createTrainingDto: CreateTrainingDto) {
    const training = await this.prisma.training.create({
      data: {
        daysInWeek: createTrainingDto.daysInWeek,
        reps: createTrainingDto.reps,
        sets: createTrainingDto.sets,
        tempo: createTrainingDto.tempo,
        rest: createTrainingDto.rest,
        name: createTrainingDto.name,
        users: {
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

    const keys = ["A", "B", "C", "D", "E", "F"];

    for (let i = 0; i < training.daysInWeek; i++) {
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: "CIS",
        number: 1,
      });
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: Phase.ONE,
        number: 1,
      });
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: Phase.ONE,
        number: 2,
      });
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: Phase.TWO,
        number: 1,
      });
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: Phase.TWO,
        number: 2,
      });
      await this.trainingGroupsService.create({
        key: keys[i],
        trainingId: training.id,
        phase: Phase.TWO,
        number: 3,
      });
    }
  }

  async findAll() {
    return await this.prisma.training.findMany({
      select: {
        id: true,
        tempo: true,
        daysInWeek: true,
        done: true,
        createdAt: true,
        updatedAt: true,
        reps: true,
        sets: true,
        rest: true,
        createdBy: true,
        name: true,
        users: true,
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
        tempo: true,
        daysInWeek: true,
        done: true,
        createdAt: true,
        updatedAt: true,
        reps: true,
        sets: true,
        rest: true,
        trainingGroups: {
          orderBy: { key: "asc" },
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

  async findByUserId(userId: string) {
    return await this.prisma.training.findMany({
      where: {
        users: {
          every: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        activatedAtUser: true,
        daysInWeek: true,
        done: true,
        reps: true,
        rest: true,
        tempo: true,
        createdAt: true,
        trainingGroups: true,
        sets: true,
        name: true,
      },
    });
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: string) {
    return `This action removes a #${id} training`;
  }
}
