import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';
import { MinioService } from 'src/services/minio';

@Module({
  imports: [
    MongooseModule.forFeature([{name : News.name , schema : NewsSchema }])
  ],
  controllers: [NewsController],
  providers: [NewsService , MinioService],
})
export class NewsModule { }
