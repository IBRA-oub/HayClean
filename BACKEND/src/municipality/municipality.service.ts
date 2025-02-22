import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MinioService } from 'src/services/minio';

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectModel(Municipality.name) private municipalityModel: Model<Municipality>,
    private readonly minioService: MinioService
  ) { }
  async create(createMunicipalityDto: CreateMunicipalityDto , file?: Express.Multer.File){
   try {
         let imageUrl;
         if (file) {
           imageUrl = await this.minioService.uploadImage({
             buffer: file.buffer,
             originalname: file.originalname,
             mimetype: file.mimetype,
           });
         }
   
         // hash password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(createMunicipalityDto.password, salt)
   
         const user = await this.municipalityModel.create({ ...createMunicipalityDto, password: hashPassword, image: imageUrl })
     
         // token
         const payload = {
           id: user._id,
           email: user.email,
           name: user.name,
           city: user.city,
           phoneNumber: user.phoneNumber,
         }
   
         const accessToken = jwt.sign(
           payload,
           process.env.ACCESS_TOKEN_SECRET,
           {
             expiresIn: '3h'
           }
         )
   
         return { message: 'Municipality created successfully', status: 200, user, accessToken };
   
       } catch (error) {
          if (error.code === 11000) {
           throw new HttpException(
             { message: 'Email already exists', status: HttpStatus.BAD_REQUEST },
             HttpStatus.BAD_REQUEST,
           );
         }

         throw new HttpException(
           { message: 'Failed to create Municipality', status: HttpStatus.INTERNAL_SERVER_ERROR },
           HttpStatus.INTERNAL_SERVER_ERROR,
         );
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
