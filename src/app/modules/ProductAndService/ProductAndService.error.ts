import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'P';

export class ProductAndServiceNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Produto e serviço não existem',
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
        message: 'Produto e serviço já existem',
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
        message: message || 'Não foi possível atualizar o produto e serviço',
        prefix,
      },
      data,
    );
  }
}
