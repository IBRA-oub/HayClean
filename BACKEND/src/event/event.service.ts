import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { municipalityProp } from 'src/types/loginType';
import { MinioService } from 'src/services/minio';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private readonly minioService: MinioService,
  ) { }

  async create(createEventDto: CreateEventDto, user: municipalityProp, file?: Express.Multer.File) {
    let imageUrl = file ? await this.uploadImage(file) : null;

    const eventData = {
      image: imageUrl,
      city: user.city,
      ...createEventDto,

    }

    const newEvent = await this.eventModel.create(eventData)

    return { message: 'Event created successfuly', status: 200, newEvent }

  }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  async findAll(user: municipalityProp) {
    try {
      const city = user.city;
      const allEvent = await this.eventModel.find({ city })
      if (allEvent.length < 0) {
        return { message: 'no Event available' }
      }

      return allEvent

    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.eventModel.findById(id)
      return event
    } catch (error) {
      return error
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const updatEvent = await this.eventModel.findByIdAndUpdate(id, { ...updateEventDto }, { new: true })
      return updatEvent
    } catch (error) {
      return error

    }
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
