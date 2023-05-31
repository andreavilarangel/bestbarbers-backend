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
        message: 'Barbershop não existe',
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
        message: 'Barbershop ja existe',
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
        message: message || 'não foi possível atualizar o barbershop',
        prefix,
      },
      data,
    );
  }
}
