import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('citizen')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createCitizenDto: CreateCitizenDto, @UploadedFile() file: Express.Multer.File) {
    return this.citizenService.create(createCitizenDto, file);
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
