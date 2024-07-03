import { Injectable } from "@nestjs/common";
import { CreateTrainingGroupDto } from "./dto/create-training-group.dto";
import { UpdateTrainingGroupDto } from "./dto/update-training-group.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TrainingGroupsService {
  constructor(private prisma: PrismaService) {}
  async create(createTrainingGroupDto: CreateTrainingGroupDto) {
    return await this.prisma.trainingGroup.create({
      data: {
        key: createTrainingGroupDto.key,
        phase: createTrainingGroupDto.phase,
        number: createTrainingGroupDto.number,
        training: {
          connect: {
            id: createTrainingGroupDto.trainingId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.trainingGroup.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.trainingGroup.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        key: true,
        done: true,
        groups: true,
        phase: true,
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
    });
  }

  update(id: number, updateTrainingGroupDto: UpdateTrainingGroupDto) {
    return `This action updates a #${id} trainingGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingGroup`;
  }
}
