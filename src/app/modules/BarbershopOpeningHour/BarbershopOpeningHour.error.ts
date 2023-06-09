import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'B';

export class BarbershopOpeningHourNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Horário de abertura não existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopOpeningHourAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Horário de abertura já existe',
        prefix,
      },
      data,
    );
  }
}

export class BarbershopOpeningHourBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message:
          message || 'Não foi possível atualizar o horário de abertura',
        prefix,
      },
      data,
    );
  }
}
