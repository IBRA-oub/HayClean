import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Citizen, CitizenSchema } from './entities/citizen.entity';

@Module({
  imports:[MongooseModule.forFeature([{name : Citizen.name , schema : CitizenSchema}])],
  controllers: [CitizenController],
  providers: [CitizenService],
})
export class CitizenModule {}
