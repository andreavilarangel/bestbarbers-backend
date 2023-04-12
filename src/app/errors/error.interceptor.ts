import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  errorHandler(err) {
    console.log('ErrorsInterceptor -> ', err);

    /** @see https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror */
    if (err instanceof Prisma.PrismaClientValidationError) {
      return throwError(
        () =>
          new HttpException(
            {
              status: 422,
              erros: err
                .toString()
                .split(/\r?\n/)
                .map(
                  (s) =>
                    (s.includes('Argument take') && {
                      prop: s.split(' ')[1],
                      message: s.includes(':')
                        ? s.split(':')[1]
                        : s.split('for ')[1],
                    }) ||
                    (s.includes('Argument') && {
                      prop: s.split(' ')[1],
                      message: s.includes(':')
                        ? s.split(':')[1]
                        : s.split('for ')[1],
                    }) ||
                    (s.includes('Unknown arg') && s),
                )
                .filter((s) => s),
              message: err.toString(),
            },
            422,
          ),
      );
    }

    /** @see  https:www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror */
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return throwError(
        () =>
          new HttpException(
            {
              status: 422,
              ...err,
              message: err.toString(),
            },
            422,
          ),
      );
    }

    if (err.status && err.message) {
      return throwError(() => err);
    }

    return throwError(() => new BadGatewayException());
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.errorHandler));
  }
}
