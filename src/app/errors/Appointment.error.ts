import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception';

const prefix = 'A';

export class AppointmentNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Appointment não existe',
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
        message: 'Appointment ja existe',
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
        message: message || 'não foi possível atualizar o appointment',
        prefix,
      },
      data,
    );
  }
}
