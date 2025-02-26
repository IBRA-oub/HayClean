import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Citizen, CitizenSchema } from 'src/citizen/entities/citizen.entity';
import { Report, ReportSchema } from './entities/report.entity';
import { MinioService } from 'src/services/minio';

@Module({
  imports:[
    MongooseModule.forFeature([{name : Report.name , schema : ReportSchema}])
  ],
  controllers: [ReportController],
  providers: [ReportService,MinioService],
})
export class ReportModule {}
