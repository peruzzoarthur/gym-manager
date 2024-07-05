import { Test, TestingModule } from '@nestjs/testing';
import { CombinedExercisesController } from './combined-exercises.controller';
import { CombinedExercisesService } from './combined-exercises.service';

describe('CombinedExercisesController', () => {
  let controller: CombinedExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinedExercisesController],
      providers: [CombinedExercisesService],
    }).compile();

    controller = module.get<CombinedExercisesController>(CombinedExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
