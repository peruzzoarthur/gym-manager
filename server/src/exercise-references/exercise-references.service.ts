import { Injectable } from "@nestjs/common";
import { CreateExerciseReferenceDto } from "./dto/create-exercise-reference.dto";
import { UpdateExerciseReferenceDto } from "./dto/update-exercise-reference.dto";
import { PrismaService } from "src/prisma.service";
import { Group } from "@prisma/client";

@Injectable()
export class ExerciseReferencesService {
  constructor(private prisma: PrismaService) {}
  async create(createExerciseReferenceDto: CreateExerciseReferenceDto) {
    return await this.prisma.exerciseReference.create({
      data: {
        name: createExerciseReferenceDto.name,
        groups: createExerciseReferenceDto.groups,
      },
    });
  }

  async findAll() {
    return await this.prisma.exerciseReference.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseReference`;
  }

  update(id: number, updateExerciseReferenceDto: UpdateExerciseReferenceDto) {
    return `This action updates a #${id} exerciseReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseReference`;
  }
}
