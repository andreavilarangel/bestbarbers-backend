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
        message: 'Colaborador, produto e serviço não existem',
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
        message: 'Colaborador, produto e serviço já existem',
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
          message ||
          'Não foi possível atualizar o colaborador, o produto e o serviço',
        prefix,
      },
      data,
    );
  }
}
