import { Test, TestingModule } from '@nestjs/testing';
import { CollectionPointService } from './collection-point.service';
import { getModelToken } from '@nestjs/mongoose';
import { CollectionPoint } from './entities/collection-point.entity';
import { Model } from 'mongoose';
import { CreateCollectionPointDto } from './dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection-point.dto';

describe('CollectionPointService', () => {
  let service: CollectionPointService;
  let model: Model<CollectionPoint>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionPointService,
        {
          provide: getModelToken(CollectionPoint.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CollectionPointService>(CollectionPointService);
    model = module.get<Model<CollectionPoint>>(getModelToken(CollectionPoint.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a collection point successfully', async () => {
        const createDto: CreateCollectionPointDto = {
            longitude: '45.1234',
            latitude: '34.5678',
          };
          const user = {
            name: 'User Name',  
            email: 'user@example.com',  
            city: 'Test City', 
          };

      const mockCollectionPoint = {
        ...createDto,
        city: user.city,
      };

      jest.spyOn(model, 'create').mockResolvedValue(mockCollectionPoint as any);

      const result = await service.create(createDto, user);
      expect(result).toEqual({
        message: 'collection point create successfuly',
        status: 200,
        newCollePoint: mockCollectionPoint,
      });
    });

    it('should throw an error if creation fails', async () => {
        const createDto: CreateCollectionPointDto = {
            longitude: '45.1234',
            latitude: '34.5678',
          };
          const user = {
            name: 'User Name',  
            email: 'user@example.com',  
            city: 'Test City', 
          };

      jest.spyOn(model, 'create').mockRejectedValue(new Error('Error'));

      const result = await service.create(createDto, user);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('findAll', () => {
    it('should return all collection points for a city', async () => {
        const mockCollectionPoints = [{
            longitude: '45.1234',
            latitude: '34.5678',
          }];
          const user = {
            name: 'User Name',  
            email: 'user@example.com',  
            city: 'Test City', 
          };
      
      jest.spyOn(model, 'find').mockResolvedValue(mockCollectionPoints as any);

      const result = await service.findAll(user);
      expect(result).toEqual(mockCollectionPoints);
    });

    it('should return a message if no collection points found', async () => {
        const user = {
            name: 'User Name',  
            email: 'user@example.com',  
            city: 'Test City', 
          };
      
      jest.spyOn(model, 'find').mockResolvedValue([]);

      const result = await service.findAll(user);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single collection point', async () => {
      const id = '1';
      const mockCollectionPoint= {
        longitude: '45.1234',
        latitude: '34.5678',
      };

      jest.spyOn(model, 'findById').mockResolvedValue(mockCollectionPoint as any);

      const result = await service.findOne(id);
      expect(result).toEqual(mockCollectionPoint);
    });

    it('should return a message if collection point not found', async () => {
      const id = '1';

      jest.spyOn(model, 'findById').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toEqual({ message: 'collection point not found' });
    });
  });

  describe('update', () => {
    it('should update a collection point successfully', async () => {
      const id = '1';
      const updateDto: UpdateCollectionPointDto = {
        longitude: '45.1234',
        latitude: '34.5678',
      };
      const mockUpdatedCollectionPoint = { ...updateDto, id };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockUpdatedCollectionPoint as any);

      const result = await service.update(id, updateDto);
      expect(result).toEqual({
        message: 'update successfuly',
        status: 200,
        updateCollPoint: mockUpdatedCollectionPoint,
      });
    });

    it('should return an error message if update fails', async () => {
      const id = '1';
      const updateDto: UpdateCollectionPointDto = {
        longitude: '45.1234',
        latitude: '34.5678',
      };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);

      const result = await service.update(id, updateDto);
      expect(result).toEqual({ message: "can'update", status: 400 });
    });
  });

  describe('remove', () => {
    it('should delete a collection point successfully', async () => {
      const id = '1';

      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue({} as any);

      const result = await service.remove(id);
      expect(result).toEqual({
        message: 'collection point deleted successfuly',
        status: 200,
      });
    });

    it('should return an error if deletion fails', async () => {
      const id = '1';

      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);

      const result = await service.remove(id);
      expect(result).toBeUndefined();
    });
  });
});
