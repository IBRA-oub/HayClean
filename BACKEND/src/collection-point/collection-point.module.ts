import { Module } from '@nestjs/common';
import { CollectionPointService } from './collection-point.service';
import { CollectionPointController } from './collection-point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionPoint, CollectionPointSchema } from './entities/collection-point.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name :CollectionPoint.name , schema : CollectionPointSchema }])
  ],
  controllers: [CollectionPointController],
  providers: [CollectionPointService],
})
export class CollectionPointModule {}
