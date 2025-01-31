import { Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectModel(Municipality.name) private municipalityModel: Model<Municipality>
  ) { }
  async create(createMunicipalityDto: CreateMunicipalityDto){
    try {
      const res = await this.municipalityModel.create(createMunicipalityDto)
      const user = await res.save()
      return { message: 'Municipality created successfully', user };
    } catch (error) {
      return error
    }

  }

  findAll() {
    return `This action returns all municipality`;
  }

  findOne(id: number) {
    return `This action returns a #${id} municipality`;
  }

  update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    return `This action updates a #${id} municipality`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipality`;
  }
}
