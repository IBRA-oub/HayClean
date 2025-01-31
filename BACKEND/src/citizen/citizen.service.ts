import { Injectable } from '@nestjs/common';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CitizenService {
  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>
  ) { }
  async create(createCitizenDto: CreateCitizenDto){
    try {

      const res = await this.citizenModel.create(createCitizenDto)
      const user = await res.save()
      return { message: 'Citizen created successfully', user };
    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all citizen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} citizen`;
  }

  update(id: number, updateCitizenDto: UpdateCitizenDto) {
    return `This action updates a #${id} citizen`;
  }

  remove(id: number) {
    return `This action removes a #${id} citizen`;
  }
}
