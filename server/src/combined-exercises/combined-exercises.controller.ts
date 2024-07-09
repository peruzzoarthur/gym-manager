import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CombinedExercisesService } from "./combined-exercises.service";
import { CreateCombinedExerciseDto } from "./dto/create-combined-exercise.dto";
import { UpdateCombinedExerciseDto } from "./dto/update-combined-exercise.dto";

@Controller("combined-exercises")
export class CombinedExercisesController {
  constructor(
    private readonly combinedExercisesService: CombinedExercisesService
  ) {}

  @Post()
  create(@Body() createCombinedExerciseDto: CreateCombinedExerciseDto) {
    return this.combinedExercisesService.create(createCombinedExerciseDto);
  }

  @Post("/create-to-all-with-same-key/")
  createToAllWithSameKey(
    @Body() createCombinedExerciseDto: CreateCombinedExerciseDto
  ) {
    return this.combinedExercisesService.createToAllWithSameKey(
      createCombinedExerciseDto
    );
  }

  @Get()
  findAll() {
    return this.combinedExercisesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.combinedExercisesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCombinedExerciseDto: UpdateCombinedExerciseDto
  ) {
    return this.combinedExercisesService.update(+id, updateCombinedExerciseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.combinedExercisesService.remove(+id);
  }
}
