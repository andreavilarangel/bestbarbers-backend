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
        message: 'BarbershopOpeningHour não existe',
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
        message: 'BarbershopOpeningHour ja existe',
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
          message || 'não foi possível atualizar o barbershopopeninghour',
        prefix,
      },
      data,
    );
  }
}
