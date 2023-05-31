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
        message: 'User não existe',
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
        message: 'User ja existe',
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
        message: message || 'não foi possível atualizar o user',
        prefix,
      },
      data,
    );
  }
}
