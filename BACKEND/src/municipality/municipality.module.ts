import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Municipality, MunicipalitySchema } from './entities/municipality.entity';

@Module({
  imports:[MongooseModule.forFeature([{name : Municipality.name , schema : MunicipalitySchema}])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
})
export class MunicipalityModule {}
