import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from 'src/shared/errors/error.exception';

const prefix = 'S';

export class ServiceNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Service não existe',
        prefix,
      },
      data,
    );
  }
}

export class ServiceAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Service ja existe',
        prefix,
      },
      data,
    );
  }
}

export class ServiceBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o service',
        prefix,
      },
      data,
    );
  }
}
