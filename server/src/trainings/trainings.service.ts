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
        rounds: createTrainingDto.rounds,
        sets: createTrainingDto.sets,
        tempo: createTrainingDto.tempo,
        rest: createTrainingDto.rest,
        user: {
          connect: {
            id: createTrainingDto.userId,
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
        rounds: true,
        reps: true,
        sets: true,
        rest: true,
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
        rounds: true,
        reps: true,
        sets: true,
        rest: true,
        trainingGroups: {
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
        user: {
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
        rounds: true,
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

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
