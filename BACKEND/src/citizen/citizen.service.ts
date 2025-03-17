import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MinioService } from 'src/services/minio';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { props } from 'src/types/loginType';
import { VerificationCitizenService } from './aop/verificationCitizen.service';

@Injectable()
export class CitizenService {
  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>,
    private readonly minioService: MinioService,
    private readonly verificationService: VerificationCitizenService,
  ) { }

  async create(createCitizenDto: CreateCitizenDto, file?: Express.Multer.File) {
    let imageUrl = file ? await this.uploadImage(file) : null;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createCitizenDto.password, salt)

    const user = await this.citizenModel.create({ ...createCitizenDto, password: hashPassword, image: imageUrl, isVerified: false })

    // token
    const accessToken = this.generateToken(user);

    // mail virification 
    await this.verificationService.sendVerificationEmailCitizen(user);

    return { message: 'Citizen created successfully', status: 200, user, accessToken };

  }

  async login(loginData: props) {
    const { email, password } = loginData

    if (!email || !password) {
      return { message: 'credentials missing', status: '404' }
    }

    const user = await this.citizenModel.findOne({ email });
    if (!user) {
      return { message: 'Invalid credentials', status: '404' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: 'Invalid credentials', status: '401' };
    }

    // verify mail
    
    if (user.verificationCode == null) {  
      await this.verificationService.sendVerificationEmailCitizen(user);
    }

    // token
    const accessToken = this.generateToken(user);

    return { message: 'login successfully', status: 200, user, accessToken };

  }

  private async uploadImage(file: Express.Multer.File) {
    return await this.minioService.uploadImage({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  private generateToken(user: Citizen) {
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      phoneNumber: user.phoneNumber,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
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
