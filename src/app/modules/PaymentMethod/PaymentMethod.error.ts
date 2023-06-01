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
        message: 'Método de pagamento não existe',
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
        message: 'Método de pagamento já existe',
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
        message: message || 'Não foi possível atualizar o método de pagamento',
        prefix,
      },
      data,
    );
  }
}
