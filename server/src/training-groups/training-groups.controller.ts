import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingGroupsService } from './training-groups.service';
import { CreateTrainingGroupDto } from './dto/create-training-group.dto';
import { UpdateTrainingGroupDto } from './dto/update-training-group.dto';

@Controller('training-groups')
export class TrainingGroupsController {
  constructor(private readonly trainingGroupsService: TrainingGroupsService) {}

  @Post()
  create(@Body() createTrainingGroupDto: CreateTrainingGroupDto) {
    return this.trainingGroupsService.create(createTrainingGroupDto);
  }

  @Get()
  findAll() {
    return this.trainingGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingGroupDto: UpdateTrainingGroupDto) {
    return this.trainingGroupsService.update(+id, updateTrainingGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingGroupsService.remove(+id);
  }
}
