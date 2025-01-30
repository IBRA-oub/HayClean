import { Module } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { AdministrationController } from './administration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Administration, AdministrationSchema } from './entities/administration.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Administration.name , schema:AdministrationSchema}])],
  controllers: [AdministrationController],
  providers: [AdministrationService],
})
export class AdministrationModule {}
