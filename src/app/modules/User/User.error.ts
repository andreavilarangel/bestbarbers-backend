import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from '../../../shared/errors/error.exception';

const prefix = 'U';

export class UserNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Usuário não existe',
        prefix,
      },
      data,
    );
  }
}

export class UserAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Usuário já existe',
        prefix,
      },
      data,
    );
  }
}

export class UserBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'Não foi possível atualizar o Usuário',
        prefix,
      },
      data,
    );
  }
}
