import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { getModelToken } from '@nestjs/mongoose';
import { MinioService } from '../services/minio';
import { Report } from './entities/report.entity';
import { BadRequestException } from '@nestjs/common';

describe('ReportService', () => {
    let service: ReportService;
    let reportModel: any;
    let minioService: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReportService,
                {
                    provide: getModelToken(Report.name),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: MinioService,
                    useValue: {
                        uploadImage: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ReportService>(ReportService);
        reportModel = module.get(getModelToken(Report.name));
        minioService = module.get<MinioService>(MinioService);
    });

    describe('create', () => {
        it('should create a report successfully', async () => {
            const dto = {
                size: 'bag',
                type: ['plastic'],
                longitude: '10.2233',
                latitude: '20.232323',
                image: '',
                accessibility: ['not for genral clean up']
            };
            const user = { city: 'Casablanca', firstName: 'test', lastName: 'test', email: 'test@example.com' };
            const file: Express.Multer.File = {
                fieldname: 'file',
                originalname: 'test.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: Buffer.from(''),
                size: 0,
                stream: null as any,
                destination: '',
                filename: '',
                path: '',
            };
            const imageUrl = 'http://example.com/image.png';
            minioService.uploadImage.mockResolvedValue(imageUrl);
            reportModel.create.mockResolvedValue({ ...dto, image: imageUrl, user });

            const result = await service.create(dto, user, file);
            expect(result).toHaveProperty('message', 'Report created successfully');
        });

        it('should throw error if image is missing', async () => {
            const dto = {
                size: '',
                type: [],
                longitude: '0',
                latitude: '0',
                image: '',
                accessibility: []
            };
            const user = { city: '', firstName: '', lastName: '', email: '' };
            await expect(service.create(dto, user, undefined)).rejects.toThrow(BadRequestException);
        });

    });

    describe('findAllPendingReport', () => {
        it('should return pending reports', async () => {
            const user = { city: 'Casablanca', firstName: 'test', lastName: 'test', email: 'test@example.com' };
            const reports = [{ status: 'pending', user }];
            reportModel.find.mockResolvedValue(reports);

            const result = await service.findAllPendingReport(user);
            expect(result).toEqual(reports);
        });
    });

    describe('findOne', () => {
        it('should return a report by ID', async () => {
            const report = { id: '123', status: 'pending' };
            reportModel.findById.mockResolvedValue(report);
            const result = await service.findOne('123');
            expect(result).toEqual(report);
        });
    });

    describe('confermReport', () => {
        it('should confirm a report', async () => {
            const updatedReport = { id: '123', status: 'completed' };
            reportModel.findByIdAndUpdate.mockResolvedValue(updatedReport);
            const result = await service.confermReport('123');
            expect(result).toHaveProperty('message', 'Report completed successfully');
        });
    });

    describe('toggleSad', () => {
        it('should toggle sad reaction', async () => {
            const report = { id: '123', sad: [], save: jest.fn() };
            reportModel.findById.mockResolvedValue(report);
            const user = { city: 'Casablanca', firstName: 'test', lastName: 'test', email: 'test@example.com' };
            await service.toggleSad(user, '123');
            expect(report.sad).toContain(user.email);
        });
    });

    describe('remove', () => {
        it('should return remove message', async () => {
            const result = service.remove(1);
            expect(result).toBe('This action removes a #1 report');
        });
    });
});
