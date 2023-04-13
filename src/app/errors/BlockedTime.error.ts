
import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception'

const prefix = 'B'

export class BlockedTimeNotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: 'BlockedTime não existe',
        prefix,
      },
      data,
    )
  }
}

export class BlockedTimeAlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: 'BlockedTime ja existe',
        prefix,
      },
      data,
    )
  }
}

export class BlockedTimeBadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o blockedtime',
        prefix,
      },
      data,
    )
  }
}  
