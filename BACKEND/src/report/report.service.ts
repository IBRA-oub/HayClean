import { HttpException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Citizen } from 'src/citizen/entities/citizen.entity';
import { Model } from 'mongoose';
import { Report } from './entities/report.entity';
import { MinioService } from 'src/services/minio';
import { citizenProp } from 'src/types/loginType';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<Citizen>,
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>,
    private readonly minioService: MinioService,
  ) { }
    async create(createReportDto: CreateReportDto, user : citizenProp, file?: Express.Multer.File) {
      let imageUrl = file ? await this.uploadImage(file) : null;

      const reportData = {
        image: imageUrl,
        ...createReportDto,
        user
      };
      const newReport =  await this.reportModel.create(reportData);

      return { message: 'Report created successfully', status: 200, newReport };
    }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
