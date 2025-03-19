import { Test, TestingModule } from '@nestjs/testing';
import { CitizenService } from './citizen.service';
import { getModelToken } from '@nestjs/mongoose';
import { MinioService } from '../services/minio';
import { VerificationCitizenService } from './aop/verificationCitizen.service';
import { Citizen } from './entities/citizen.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('CitizenService', () => {
  let service: CitizenService;
  let citizenModel: any;
  let verificationService: VerificationCitizenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitizenService,
        {
          provide: getModelToken(Citizen.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: MinioService,
          useValue: {
            uploadImage: jest.fn(),
          },
        },
        {
          provide: VerificationCitizenService,
          useValue: {
            sendVerificationEmailCitizen: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CitizenService>(CitizenService);
    citizenModel = module.get(getModelToken(Citizen.name));
    verificationService = module.get<VerificationCitizenService>(VerificationCitizenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a citizen successfully', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'TestPassword123',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Casablanca',
        phoneNumber: 123456789,
        image: '', 
      };

      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      citizenModel.create.mockResolvedValue({ ...dto, password: 'hashed_password', _id: 'mockId' });
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');
      jest.spyOn(verificationService, 'sendVerificationEmailCitizen').mockResolvedValue(undefined);

      const result = await service.create(dto);

      expect(result).toEqual({
        message: 'Citizen created successfully',
        status: 200,
        user: expect.objectContaining({
          email: dto.email,
          password: 'hashed_password',
        }),
        accessToken: 'mockToken',
      });
    });


    it('should return an error if email is already taken', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'TestPassword123',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Casablanca',
        phoneNumber: 123456789,
        image: '',
      };
  
      citizenModel.findOne.mockResolvedValue({ _id: 'mockId', email: dto.email });

      await expect(service.create(dto)).rejects.toThrow('Email is already in use');
    });


    it('should return an error if database fails to create the citizen', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'TestPassword123',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Casablanca',
        phoneNumber: 123456789,
        image: '',
      };
  
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      citizenModel.create.mockRejectedValue(new Error('Database error'));
  
      await expect(service.create(dto)).rejects.toThrow('Database error');
    });


  });

  describe('login', () => {
    it('should return an access token when login is successful', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = { _id: 'mockId', email: 'test@example.com', password: 'hashed_password' };
      citizenModel.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        message: 'login successfully',
        status: 200,
        user,
        accessToken: 'mockToken',
      });
    });

    it('should return error when credentials are invalid', async () => {
      const loginDto = { email: 'wrong@example.com', password: 'wrongpassword' };
      citizenModel.findOne.mockResolvedValue(null);

      const result = await service.login(loginDto);
      expect(result).toEqual({ message: 'Invalid credentials', status: '404' });
    });
  });
});
