import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from 'src/shared/errors/error.exception';

const prefix = 'P';

export class ProductNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Product não existe',
        prefix,
      },
      data,
    );
  }
}

export class ProductAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Product ja existe',
        prefix,
      },
      data,
    );
  }
}

export class ProductBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o product',
        prefix,
      },
      data,
    );
  }
}
