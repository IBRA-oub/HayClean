import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import { Model } from 'mongoose';
import { MinioService } from 'src/services/minio';
import { municipalityProp } from 'src/types/loginType';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    private minioService: MinioService
  ) { }
  async create(createNewsDto: CreateNewsDto, user: municipalityProp, file?: Express.Multer.File) {
    try {
      let imageUrl = file ? await this.uploadImage(file) : null;

      const newsData = {
        image: imageUrl,
        city: user.city,
        ...createNewsDto,

      }

      const newNews = await this.newsModel.create(newsData);

      return { message: 'News created successfuly', status: 200, newNews }

    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }
}
