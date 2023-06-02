import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'A';

export class AddressNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Endereço não existe',
        prefix,
      },
      data,
    );
  }
}

export class AddressAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Endereço já existe',
        prefix,
      },
      data,
    );
  }
}

export class AddressBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o endereço',
        prefix,
      },
      data,
    );
  }
}
