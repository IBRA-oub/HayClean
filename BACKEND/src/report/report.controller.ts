import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Req() req, @Body() createReportDto: CreateReportDto, @UploadedFile() file: Express.Multer.File) {
    return this.reportService.create(createReportDto, req.user, file);
  }

  @Get('pendingReport')
  @UseGuards(JwtAuthGuard)
  findAllPending(@Req() req) {
    return this.reportService.findAllPendingReport(req.user);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.reportService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Post('toggleSad/:id')
  @UseGuards(JwtAuthGuard)
  toggleSad(@Req() req,@Param('id') id: string) {
    return this.reportService.toggleSad(req.user , id);
  }

  @Patch('completed/:id')
  update(@Param('id') id: string) {
    return this.reportService.confermReport(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
