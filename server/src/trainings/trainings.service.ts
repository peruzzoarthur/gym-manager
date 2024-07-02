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
        user: {
          connect: {
            id: createTrainingDto.userId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.training.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
