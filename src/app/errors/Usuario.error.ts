import { HttpStatus } from '@nestjs/common';
import { HttpErrorException, NotFoundException } from './error.exception';

const prefix = 'U';

export class UsuarioNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Usuario não existe',
        prefix,
      },
      data,
    );
  }
}

export class UsuarioAlreadyExistException extends HttpErrorException {
  constructor(data?: any) {
    super(
      {
        message: 'Usuario já existe',
        prefix,
        statusCode: HttpStatus.CONFLICT,
      },
      data,
    );
  }
}
