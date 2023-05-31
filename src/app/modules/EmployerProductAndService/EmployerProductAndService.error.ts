import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from 'src/shared/errors/error.exception';

const prefix = 'E';

export class EmployerProductAndServiceNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'EmployerProductAndService não existe',
        prefix,
      },
      data,
    );
  }
}

export class EmployerProductAndServiceAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'EmployerProductAndService ja existe',
        prefix,
      },
      data,
    );
  }
}

export class EmployerProductAndServiceBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message:
          message || 'não foi possível atualizar o employerproductandservice',
        prefix,
      },
      data,
    );
  }
}
