import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CitizenModule } from './citizen/citizen.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { AdministrationModule } from './administration/administration.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env' , isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule, CitizenModule, MunicipalityModule, AdministrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
