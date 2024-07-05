import { Test, TestingModule } from '@nestjs/testing';
import { CombinedExercisesService } from './combined-exercises.service';

describe('CombinedExercisesService', () => {
  let service: CombinedExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinedExercisesService],
    }).compile();

    service = module.get<CombinedExercisesService>(CombinedExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
