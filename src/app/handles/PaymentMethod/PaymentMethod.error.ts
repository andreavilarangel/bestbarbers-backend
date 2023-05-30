import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'P';

export class PaymentMethodNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'PaymentMethod não existe',
        prefix,
      },
      data,
    );
  }
}

export class PaymentMethodAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'PaymentMethod ja existe',
        prefix,
      },
      data,
    );
  }
}

export class PaymentMethodBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o paymentmethod',
        prefix,
      },
      data,
    );
  }
}
