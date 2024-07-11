import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTrainingGroupDto } from "./dto/create-training-group.dto";
import { UpdateTrainingGroupDto } from "./dto/update-training-group.dto";
import { PrismaService } from "src/prisma.service";
import { FindByTrainingWithKeyDto } from "./dto/find-by-training-with-key";

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
    const trainingGroup = await this.prisma.trainingGroup.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        key: true,
        done: true,
        doneAt: true,
        active: true,
        activeAt: true,
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
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    if (!trainingGroup) {
      throw new HttpException("Training group not found", HttpStatus.NOT_FOUND);
    }
    return trainingGroup;
  }

  async findByTrainingWithKey(
    findByTrainingWithKeyDto: FindByTrainingWithKeyDto
  ) {
    return await this.prisma.trainingGroup.findMany({
      where: {
        trainingId: findByTrainingWithKeyDto.trainingId,
        key: findByTrainingWithKeyDto.key,
      },
      select: {
        id: true,
        key: true,
        done: true,
        doneAt: true,
        active: true,
        activeAt: true,
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

  async setDone(id: string) {
    return await this.prisma.trainingGroup.update({
      where: { id: id },
      data: { active: false, done: true, doneAt: new Date(Date.now()) },
    });
  }

  async updateDoneDate(id: string, date: Date) {
    const tg = await this.prisma.trainingGroup.findUnique({
      where: { id: id },
    });
    if (!tg) {
      throw new HttpException("Training group not found", HttpStatus.NOT_FOUND);
    }
    if (tg.done) {
      return await this.prisma.trainingGroup.update({
        where: { id: tg.id },
        data: { doneAt: date, activeAt: date },
      });
    }
  }

  async setActive(id: string) {
    const trainingGroup = await this.prisma.trainingGroup.findUnique({
      where: { id: id },
    });

    if (!trainingGroup) {
      throw new HttpException("Training group not found", HttpStatus.NOT_FOUND);
    }
    const trainingGroups = await this.prisma.trainingGroup.findMany({
      where: { trainingId: trainingGroup.trainingId },
    });

    const unfinishedTg = trainingGroups.filter((tg) => tg.done !== true);

    const activeTg = unfinishedTg.find((tg) => tg.active === true);

    if (activeTg) {
      throw new HttpException(
        "Finish active training in order to start a new one",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.prisma.trainingGroup.update({
        where: { id: id },
        data: { active: true, activeAt: new Date(Date.now()) },
      });
    }
  }

  async remove(id: string) {
    return await this.prisma.trainingGroup.delete({ where: { id: id } });
  }
}
