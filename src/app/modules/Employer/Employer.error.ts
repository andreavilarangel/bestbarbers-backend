import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'E';

export class EmployerNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Colaborador não existe',
        prefix,
      },
      data,
    );
  }
}

export class EmployerAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Colaborador já existe',
        prefix,
      },
      data,
    );
  }
}

export class EmployerBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o colaborador',
        prefix,
      },
      data,
    );
  }
}
