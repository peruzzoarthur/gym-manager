import { Injectable } from "@nestjs/common";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TrainingsService {
  constructor(private prisma: PrismaService) {}
  async create(createTrainingDto: CreateTrainingDto) {
    return await this.prisma.training.create({
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
            phase: true,
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
            phase: true,
            number: true,
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
