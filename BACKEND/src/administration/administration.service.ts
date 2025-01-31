import { Injectable } from '@nestjs/common';
import { CreateAdministrationDto } from './dto/create-administration.dto';
import { UpdateAdministrationDto } from './dto/update-administration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Administration } from './entities/administration.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdministrationService {
  constructor(
    @InjectModel(Administration.name) private adminstrationModel : Model<Administration>
  ){}
  async create(createAdministrationDto: CreateAdministrationDto) {
    try {
      const res = await this.adminstrationModel.create(createAdministrationDto)
      const user  = await res.save()
      return {message:'Admin created succcessfully',user}
    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all administration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administration`;
  }

  update(id: number, updateAdministrationDto: UpdateAdministrationDto) {
    return `This action updates a #${id} administration`;
  }

  remove(id: number) {
    return `This action removes a #${id} administration`;
  }
}
