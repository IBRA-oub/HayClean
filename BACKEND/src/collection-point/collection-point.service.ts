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
    @InjectModel(CollectionPoint.name) private collectionPointModel: Model<CollectionPoint>
  ) { }
  async create(createCollectionPointDto: CreateCollectionPointDto, user: municipalityProp) {
    try {
      const newCollePoint = await this.collectionPointModel.create({ ...createCollectionPointDto, city: user.city })

      return { message: 'collection point create successfuly', status: 200, newCollePoint }
    } catch (error) {
      return error
    }
  }

  async findAll(user: municipalityProp) {
    const allCollPoint = await this.collectionPointModel.find({ city: user.city })
    if (allCollPoint.length < 0) {
      return { message: 'no collection point available' }
    }

    return allCollPoint;
  }

  async findOne(id: string) {
    const collPoint = await this.collectionPointModel.findById(id)
    if (!collPoint) {
      return { message: 'collection point not found' }
    }

    return collPoint
  }

  async update(id: string, updateCollectionPointDto: UpdateCollectionPointDto) {
    const updateCollPoint = await this.collectionPointModel.findByIdAndUpdate(id, {...updateCollectionPointDto }, { new: true })
    if (!updateCollPoint) {
      return { message: 'can\'update', status: 400 }
    }
    return { message: 'update successfuly', status: 200, updateCollPoint }
  }

  async remove(id: string) {
    const deleteCollPoint = await this.collectionPointModel.findByIdAndDelete(id)
    if (deleteCollPoint) {
      return { message: 'collection point deleted successfuly', status: 200 }
    }
  }
}
