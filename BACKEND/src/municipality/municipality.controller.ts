import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { props } from 'src/types/loginType';
import { VerificationMunicipalityService } from './aop/verification.service';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Controller('municipality')
export class MunicipalityController {
  constructor(
    private readonly municipalityService: MunicipalityService,
    private readonly verificationService: VerificationMunicipalityService,

  ) { }

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createMunicipalityDto: CreateMunicipalityDto, @UploadedFile() file: Express.Multer.File) {
    return this.municipalityService.create(createMunicipalityDto, file);
  }

  @Post('login')
  login(@Body() loginData: props) {
    return this.municipalityService.login(loginData)
  }

  @Post('verifyEmail')
  verifyEmail(@Headers('authorization') authHeader: string, @Body('code') code: string) {
    return this.verificationService.verifyEmailMunicipality(authHeader, code)
  }

  @Get()
  findAll() {
    return this.municipalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipalityService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipalityService.remove(+id);
  }
}
