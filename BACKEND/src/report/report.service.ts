import { CreateReportDto } from './dto/create-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './entities/report.entity';
import { MinioService } from '../services/minio';
import { citizenProp } from '../types/loginType';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<Report>,
    private readonly minioService: MinioService,
  ) { }
  async create(createReportDto: CreateReportDto, user: citizenProp, file?: Express.Multer.File) {
    let imageUrl = file ? await this.uploadImage(file) : null;
    if (!imageUrl) {
      throw new BadRequestException(`Le champ image est requis.`);
    }
    const requiredFields = ['size', 'type', 'longitude', 'latitude'];
    for (const field of requiredFields) {
      const value = createReportDto[field];
      if (
        value === undefined ||
        value === null ||
        value === "null" ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        throw new BadRequestException(`Le champ ${field} est requis.`);
      }
    }
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
      return { message: 'Report completed successfully', status: 200, response }
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
