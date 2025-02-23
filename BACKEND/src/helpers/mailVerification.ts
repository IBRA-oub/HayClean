import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerification {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_MAIL_APP_EMAIL,
        pass: process.env.GOOGLE_MAIL_APP_PASSWORD
      },
    });
  }

  async sendVerificationEmail(email: string, code: string) {
    const mailOptions = {
      from: process.env.GOOGLE_MAIL_APP_EMAIL,
      to: email,
      subject: 'Votre code de vérification',
      text: `Votre code de vérification est : ${code}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
