import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'C';

export class ClientNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Cliente não existe',
        prefix,
      },
      data,
    );
  }
}

export class ClientAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Cliente já existe',
        prefix,
      },
      data,
    );
  }
}

export class ClientBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o cliente',
        prefix,
      },
      data,
    );
  }
}
