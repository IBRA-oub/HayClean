import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { CreateAdministrationDto } from './dto/create-administration.dto';


@Controller('administration')
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}

  @Post()
  create(@Body() createAdministrationDto: CreateAdministrationDto) {
    return this.administrationService.create(createAdministrationDto);
  }

  @Get()
  findAll() {
    return this.administrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrationService.remove(+id);
  }
}
