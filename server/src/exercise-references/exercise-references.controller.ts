import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseReferencesService } from './exercise-references.service';
import { CreateExerciseReferenceDto } from './dto/create-exercise-reference.dto';
import { UpdateExerciseReferenceDto } from './dto/update-exercise-reference.dto';

@Controller('exercise-references')
export class ExerciseReferencesController {
  constructor(private readonly exerciseReferencesService: ExerciseReferencesService) {}

  @Post()
  create(@Body() createExerciseReferenceDto: CreateExerciseReferenceDto) {
    return this.exerciseReferencesService.create(createExerciseReferenceDto);
  }

  @Get()
  findAll() {
    return this.exerciseReferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseReferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseReferenceDto: UpdateExerciseReferenceDto) {
    return this.exerciseReferencesService.update(+id, updateExerciseReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseReferencesService.remove(+id);
  }
}
