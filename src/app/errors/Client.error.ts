
import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception'

const prefix = 'C'

export class ClientNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'Client não existe',
        prefix,
      },
      data,
    )
  }
}

export class ClientAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'Client ja existe',
        prefix,
      },
      data,
    )
  }
}

export class ClientBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o client',
        prefix,
      },
      data,
    )
  }
}  
