import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception';

const prefix = 'B';

export class BarbershopClientNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'BarbershopClient não existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopClientAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'BarbershopClient ja existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopClientBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o barbershopclient',
        prefix,
      },
      data,
    );
  }
}
