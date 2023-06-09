import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from '../../../shared/errors/error.exception';

const prefix = 'U';

export class AuthPasswordWrongException extends HttpErrorException {
  constructor(data?: any) {
    super(
      {
        message: 'Senha incorreta',
        prefix,
        statusCode: HttpStatus.FORBIDDEN,
      },
      data,
    );
  }
}
