import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Municipality, MunicipalitySchema } from './entities/municipality.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { MinioService } from 'src/services/minio';
import { EmailVerification } from 'src/helpers/mailVerification';
import { VerificationMunicipalityService } from './aop/verification.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name , schema: UserSchema}]),
    MongooseModule.forFeature([{name : Municipality.name , schema : MunicipalitySchema}])
  ],
  controllers: [MunicipalityController],
  providers: [MunicipalityService , MinioService,EmailVerification,VerificationMunicipalityService],
})
export class MunicipalityModule {}
