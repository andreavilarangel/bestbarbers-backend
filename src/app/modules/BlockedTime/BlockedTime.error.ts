import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'B';

export class BlockedTimeNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Horário bloqueado não existe',
        prefix,
      },
      data,
    );
  }
}

export class BlockedTimeAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Horário bloqueado já existe',
        prefix,
      },
      data,
    );
  }
}

export class BlockedTimeBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o horário bloqueado',
        prefix,
      },
      data,
    );
  }
}
