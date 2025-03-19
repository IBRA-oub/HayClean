import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException({ message: 'No token provided', status: 401 }, 401);
    }

    try {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new HttpException({ message: 'Invalid token', status: 401,error }, 401);
    }
  }
}
