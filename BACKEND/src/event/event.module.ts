import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { MinioService } from 'src/services/minio';

@Module({
  imports: [
    MongooseModule.forFeature([{name : Event.name , schema : EventSchema}])
  ],
  controllers: [EventController],
  providers: [EventService,MinioService],
})
export class EventModule { }
