import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MinioService } from 'src/services/minio';
import { props } from 'src/types/loginType';
import { VerificationMunicipalityService } from './aop/verification.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MunicipalityService {

  constructor(
    @InjectModel(Municipality.name) private municipalityModel: Model<Municipality>,
    private readonly minioService: MinioService,
    private readonly verificationService: VerificationMunicipalityService,
  ) { }

  async create(createMunicipalityDto: CreateMunicipalityDto, file?: Express.Multer.File) {
    let imageUrl = file ? await this.uploadImage(file) : null;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createMunicipalityDto.password, salt);

    const user = await this.municipalityModel.create({
      ...createMunicipalityDto,
      password: hashPassword,
      image: imageUrl,
      isVerified: false,
    });

    // mail verification 
    await this.verificationService.sendVerificationEmailMunicipality(user);

    const accessToken = this.generateToken(user);

    return { message: 'Municipality created successfully', status: 200, user, accessToken };
  }

  async login(loginData: props) {
    const { email, password } = loginData;

    const user = await this.municipalityModel.findOne({ email });
    if (!user) return { message: 'Invalid credentials', status: 404 };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { message: 'Invalid credentials', status: 401 };

    // verify mail
    if (user.verificationCode == null) {
      await this.verificationService.sendVerificationEmailMunicipality(user);
    }

    // token
    const accessToken = this.generateToken(user);

    return { message: 'Login successfully', status: 200, user, accessToken };
  }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  private generateToken(user: Municipality) {
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      city: user.city,
      phoneNumber: user.phoneNumber,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
  }


  findAll() {
    return `This action returns all municipality`;
  }

  findOne(id: number) {
    return `This action returns a #${id} municipality`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipality`;
  }
}
