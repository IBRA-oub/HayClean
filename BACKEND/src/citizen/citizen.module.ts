import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Citizen, CitizenSchema } from './entities/citizen.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { MinioService } from 'src/services/minio';
import { EmailVerification } from 'src/helpers/mailVerification';
import { VerificationCitizenService } from './aop/verificationCitizen.service';



@Module({
  imports: [

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Citizen.name, schema: CitizenSchema }]),

  ],
  controllers: [CitizenController],
  providers: [CitizenService, MinioService, EmailVerification,VerificationCitizenService],
})
export class CitizenModule { }
