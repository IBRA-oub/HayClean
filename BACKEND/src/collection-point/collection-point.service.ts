import { Injectable } from '@nestjs/common';
import { CreateCollectionPointDto } from './dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection-point.dto';
import { municipalityProp } from 'src/types/loginType';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionPoint } from './entities/collection-point.entity';
import { Model } from 'mongoose';

@Injectable()
export class CollectionPointService {
  constructor(
    @InjectModel(CollectionPoint.name) private collectionPointModel : Model<CollectionPoint>
  ){}
  async create(createCollectionPointDto: CreateCollectionPointDto,user : municipalityProp) {
    try {
      const newCollePoint = await this.collectionPointModel.create({...createCollectionPointDto , city : user.city})

      return{ message : 'collection point create successfuly' , status: 200 , newCollePoint}
    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all collectionPoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionPoint`;
  }

  update(id: number, updateCollectionPointDto: UpdateCollectionPointDto) {
    return `This action updates a #${id} collectionPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionPoint`;
  }
}
