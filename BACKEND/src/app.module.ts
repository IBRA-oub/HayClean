import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CitizenModule } from './citizen/citizen.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { AdministrationModule } from './administration/administration.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportModule } from './report/report.module';
import { EventModule } from './event/event.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env' , isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule, CitizenModule, MunicipalityModule, AdministrationModule, ReportModule, EventModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
