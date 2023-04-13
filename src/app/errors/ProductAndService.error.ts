import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception';

const prefix = 'P';

export class ProductAndServiceNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'ProductAndService não existe',
        prefix,
      },
      data,
    );
  }
}

export class ProductAndServiceAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'ProductAndService ja existe',
        prefix,
      },
      data,
    );
  }
}

export class ProductAndServiceBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o productandservice',
        prefix,
      },
      data,
    );
  }
}
