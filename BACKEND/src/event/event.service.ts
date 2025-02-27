import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { citizenProp, municipalityProp } from 'src/types/loginType';
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
      return { message: 'event update successufuly', status: 200, updatEvent }
    } catch (error) {
      return error

    }
  }

  async remove(id: string) {
    try {
      const deletEvent = await this.eventModel.findByIdAndDelete(id)
      return { message: 'event deleted successufuly', status: 200, deletEvent }
    } catch (error) {
      return error
    }
  }

  async participant(user: citizenProp, eventId: string) {
    try {
      const event = await this.eventModel.findOne({
        _id: eventId,
        "participants.email": user.email, 
      });
  
      if (event) {
        return { message: "Participant already registered", status: 400 };
      }

      const participant = await this.eventModel.findByIdAndUpdate(eventId,
        {
          $push:
          {
            participants:
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              city: user.email,
              status: "pending"

            }
          }
        },
        { new: true }
      )
      return { message: ' participant successufuly', status: 200, participant }
    } catch (error) {
      return error
    }
  }

  async pendingParticipant(user: municipalityProp) {
    try {
      const events = await this.eventModel.find({
        city: user.city, 
        "participants.status": "pending",
      });

      const filteredEvents = events.map(event => ({
        ...event.toObject(),
        participants: event.participants.filter(participant => participant.status === "pending")
      }));
  
      return filteredEvents;
    } catch (error) {
      return { message: "Error fetching events", status: 500, error: error.message };
    }
  }
  
}
