import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TrainingGroupsService } from "./training-groups.service";
import { CreateTrainingGroupDto } from "./dto/create-training-group.dto";
import { UpdateTrainingGroupDto } from "./dto/update-training-group.dto";
import { FindByTrainingWithKeyDto } from "./dto/find-by-training-with-key";

@Controller("training-groups")
export class TrainingGroupsController {
  constructor(private readonly trainingGroupsService: TrainingGroupsService) {}

  @Post()
  create(@Body() createTrainingGroupDto: CreateTrainingGroupDto) {
    return this.trainingGroupsService.create(createTrainingGroupDto);
  }

  @Post("tg-key-by-training-id")
  findByTrainingWithKey(
    @Body() findByTrainingWithKeyDto: FindByTrainingWithKeyDto
  ) {
    return this.trainingGroupsService.findByTrainingWithKey(
      findByTrainingWithKeyDto
    );
  }
  @Get()
  findAll() {
    return this.trainingGroupsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.trainingGroupsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTrainingGroupDto: UpdateTrainingGroupDto
  ) {
    return this.trainingGroupsService.update(+id, updateTrainingGroupDto);
  }

  @Patch("set-done/:id")
  setDone(@Param("id") id: string) {
    return this.trainingGroupsService.setDone(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.trainingGroupsService.remove(+id);
  }
}
