import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MinioService } from 'src/services/minio';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CitizenService {
  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>,
    private readonly minioService: MinioService
  ) { }

  async create(createCitizenDto: CreateCitizenDto, file?: Express.Multer.File) {
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
      const hashPassword = await bcrypt.hash(createCitizenDto.password, salt)

      const user = await this.citizenModel.create({ ...createCitizenDto, password: hashPassword, image: imageUrl })

      // token
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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

      return { message: 'Citizen created successfully', status: 200, user, accessToken };

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
