import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import { ExercisesService } from "./exercises.service";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";

@Controller("exercises")
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Post("/create-to-all-with-same-key/")
  createToAllWithSameKey(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createToAllWithSameKey(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Patch("/set-load/:id")
  setLoad(
    @Param("id") id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exercisesService.setLoadToExercise(id, updateExerciseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.exercisesService.remove(id);
  }
}
