import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'B';

export class BarbershopNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Barbearia não existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Barbearia já existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar a barbearia',
        prefix,
      },
      data,
    );
  }
}
