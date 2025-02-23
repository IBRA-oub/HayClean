import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error.code === 11000) {
          return throwError(() => new HttpException(
            { message: 'Email already exists', status: HttpStatus.BAD_REQUEST },
            HttpStatus.BAD_REQUEST
          ));
        }

        return throwError(() => new HttpException(
          { message: 'Internal Server Error', status: HttpStatus.INTERNAL_SERVER_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR
        ));
      })
    );
  }
}
