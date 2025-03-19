import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Citizen } from '../entities/citizen.entity';
import { EmailVerification } from '../../helpers/mailVerification';

@Injectable()
export class VerificationCitizenService {
  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>,
    private readonly emailVerification: EmailVerification
  ) { }

  async sendVerificationEmailCitizen(user: Citizen) {
    console.log(user.verificationCode)
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.verificationCode = verificationCode;
    await user.save();
    await this.emailVerification.sendVerificationEmail(user.email, verificationCode);
  }

  async verifyEmailCitizen(accessToken: string, code: string) {

    const jwtToken = accessToken.split(' ')[1];
    const decodedToken = jwt.decode(jwtToken) as jwt.JwtPayload;
    const email = decodedToken?.email;
    const user = await this.citizenModel.findOne({ email });

    if (!user) {
      throw new HttpException({ message: 'User not found', status: 404 }, 404);
    }

    if (user.verificationCode !== code) {
      throw new HttpException({ message: 'Invalid verification code', status: 400 }, 400);
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    return { message: 'Email verified successfully', status: 200 };
  }
}
