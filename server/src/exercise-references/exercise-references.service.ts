import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExerciseReferenceDto } from "./dto/create-exercise-reference.dto";
import { UpdateExerciseReferenceDto } from "./dto/update-exercise-reference.dto";
import { PrismaService } from "src/prisma.service";
import { Group } from "@prisma/client";

@Injectable()
export class ExerciseReferencesService {
  constructor(private prisma: PrismaService) {}
  async create(createExerciseReferenceDto: CreateExerciseReferenceDto) {
    if (createExerciseReferenceDto.groups.length === 0) {
      throw new HttpException(
        "Select at least a muscle group to create exercise reference",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.exerciseReference.create({
      data: {
        name: createExerciseReferenceDto.name,
        groups: createExerciseReferenceDto.groups,
        createdBy: {
          connect: {
            id: createExerciseReferenceDto.creatorId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.exerciseReference.findMany({
      select: {
        id: true,
        name: true,
        createdBy: true,
        createdAt: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseReference`;
  }

  update(id: number, updateExerciseReferenceDto: UpdateExerciseReferenceDto) {
    return `This action updates a #${id} exerciseReference`;
  }

  async remove(id: string) {
    return await this.prisma.exerciseReference.delete({ where: { id: id } });
  }
}
