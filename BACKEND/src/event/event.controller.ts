import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Req() req, @Body() createEventDto: CreateEventDto, @UploadedFile() file: Express.Multer.File) {
    return this.eventService.create(createEventDto, req.user, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.eventService.findAll(req.user);
  }

  @Get('pendingParticipant')
  @UseGuards(JwtAuthGuard)
  pendingParticipant(@Req() req) {
    return this.eventService.pendingParticipant(req.user);
  }

  @Get('ParticipantCitizen')
  @UseGuards(JwtAuthGuard)
  ParticipantCitizen(@Req() req) {
    return this.eventService.ParticipantCitizen(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto,@UploadedFile() file: Express.Multer.File) {
    return this.eventService.update(id, updateEventDto,file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Patch('participation/:id')
  @UseGuards(JwtAuthGuard)
  participation(@Req() req, @Param('id') id: string) {
    return this.eventService.participation(req.user, id);
  }
  @Patch('cancelParticipation/:id')
  @UseGuards(JwtAuthGuard)
  cancelParticipation(@Req() req, @Param('id') id: string) {
    return this.eventService.cancelParticipation(req.user, id);
  }

  @Patch('accepteParticipant/:id')
  accepteParticipant(@Param('id') id: string, @Body() body: { email: string }) {
    return this.eventService.accepteParticipant(id, body.email);
  }

  @Patch('rajecteParticipant/:id')
  rajecteParticipant(@Param('id') id: string, @Body() body: { email: string }) {
    return this.eventService.rajecteParticipant(id, body.email);
  }


}
