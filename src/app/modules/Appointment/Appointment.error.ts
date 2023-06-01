import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'A';

export class AppointmentNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Agendamento não existe',
        prefix,
      },
      data,
    );
  }
}

export class AppointmentAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Agendamento já existe',
        prefix,
      },
      data,
    );
  }
}

export class AppointmentBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o agendamento',
        prefix,
      },
      data,
    );
  }
}
