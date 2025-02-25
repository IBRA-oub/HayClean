import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { props } from 'src/types/loginType';
import { VerificationCitizenService } from './aop/verificationCitizen.service';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Controller('citizen')
export class CitizenController {
  constructor(
    private readonly citizenService: CitizenService,
    private readonly verificationService: VerificationCitizenService,
  ) { }

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createCitizenDto: CreateCitizenDto, @UploadedFile() file: Express.Multer.File) {
    return this.citizenService.create(createCitizenDto, file);
  }

  @Post('login')
  login(@Body() loginData: props) {
    return this.citizenService.login(loginData)
  }

  @Post('verifyEmail')
  verifyEmail(@Headers('authorization') authHeader: string, @Body('code') code: string) {
    return this.verificationService.verifyEmailCitizen(authHeader, code)
  }

  @Get()
  findAll() {
    return this.citizenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citizenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitizenDto: UpdateCitizenDto) {
    return this.citizenService.update(+id, updateCitizenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citizenService.remove(+id);
  }
}
