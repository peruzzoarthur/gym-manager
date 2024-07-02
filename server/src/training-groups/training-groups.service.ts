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

  findOne(id: number) {
    return `This action returns a #${id} trainingGroup`;
  }

  update(id: number, updateTrainingGroupDto: UpdateTrainingGroupDto) {
    return `This action updates a #${id} trainingGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingGroup`;
  }
}
