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
        message: 'Employer não existe',
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
        message: 'Employer ja existe',
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
        message: message || 'não foi possível atualizar o employer',
        prefix,
      },
      data,
    );
  }
}
