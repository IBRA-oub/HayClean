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
    @InjectModel(Report.name) private reportModel: Model<Report>,
    private readonly minioService: MinioService,
  ) { }
  async create(createReportDto: CreateReportDto, user: citizenProp, file?: Express.Multer.File) {
    let imageUrl = file ? await this.uploadImage(file) : null;

    const reportData = {
      image: imageUrl,
      ...createReportDto,
      user
    };
    const newReport = await this.reportModel.create(reportData);

    return { message: 'Report created successfully', status: 200, newReport };
  }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  async findAllPendingReport(user: citizenProp) {
    try {

      const city = user.city
      const response = await this.reportModel.find({ "user.city": city, status: 'pending' })
      if (response.length > 0) {
        return response
      } else {
        return { message: "no report is available" }
      }

    } catch (error) {
      return error
    }
  }
  async findAll(user: citizenProp) {
    try {

      const city = user.city
      const response = await this.reportModel.find({ "user.city": city })
      if (response.length > 0) {
        return response
      } else {
        return { message: "no report is available" }
      }

    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.reportModel.findById(id)
      return response
    } catch (error) {
      return error
    }
  }

  async confermReport(id: string) {
    try {
      const response = await this.reportModel.findByIdAndUpdate(id, { status: "completed" }, { new: true })
      return response
    } catch (error) {
      return error
    }
  }

  async toggleSad(user: citizenProp, reportId: string) {
    const email = user.email
    const report = await this.reportModel.findById(reportId)
   
    if (!report) {
      throw new Error("report not found")
    }
    const emailIndex = report.sad.indexOf(email);

    if (emailIndex !== -1) {
      report.sad.splice(emailIndex, 1);
    } else {
      report.sad.push(email);
    }

    await report.save();

    return report;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
