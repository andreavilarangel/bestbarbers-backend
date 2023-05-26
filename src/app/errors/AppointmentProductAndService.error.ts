import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception';

const prefix = 'A';

export class AppointmentProductAndServiceNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'AppointmentProductAndService não existe',
        prefix,
      },
      data,
    );
  }
}

export class AppointmentProductAndServiceAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'AppointmentProductAndService ja existe',
        prefix,
      },
      data,
    );
  }
}

export class AppointmentProductAndServiceBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message:
          message ||
          'não foi possível atualizar o appointmentproductandservice',
        prefix,
      },
      data,
    );
  }
}
