import { Test, TestingModule } from '@nestjs/testing';
import { CollectionPointService } from './collection-point.service';

describe('CollectionPointService', () => {
  let service: CollectionPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionPointService],
    }).compile();

    service = module.get<CollectionPointService>(CollectionPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
