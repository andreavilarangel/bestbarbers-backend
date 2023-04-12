import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorType = {
  message: string;
  prefix: string;
  statusCode: number;
};

export class HttpErrorException extends HttpException {
  constructor(
    { message, prefix, statusCode }: any,
    data?: Record<string, unknown>,
  ) {
    super(
      {
        message,
        error: `${prefix + statusCode} - ${message}`,
        code: prefix + statusCode,
        statusCode,
        data,
      },
      statusCode,
    );
  }
}

export class NotFoundException extends HttpException {
  constructor(
    { message, prefix }: Omit<ErrorType, 'statusCode'>,
    data?: Record<string, unknown>,
  ) {
    const code = prefix + HttpStatus.NOT_FOUND;
    super(
      {
        message,
        code,
        error: `${code} - ${message}`,
        statusCode: HttpStatus.NOT_FOUND,
        data,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
export class AlreadyExistException extends HttpException {
  constructor(
    { message, prefix }: Omit<ErrorType, 'statusCode'>,
    data?: Record<string, unknown>,
  ) {
    const code = prefix + HttpStatus.CONFLICT;
    super(
      {
        message,
        code,
        error: `${code} - ${message}`,
        statusCode: HttpStatus.CONFLICT,
        data,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class ForbiddenException extends HttpException {
  constructor(
    { message, prefix }: Omit<ErrorType, 'statusCode'>,
    data?: Record<string, unknown>,
  ) {
    const code = prefix + HttpStatus.FORBIDDEN;
    super(
      {
        message,
        code,
        error: `${code} - ${message}`,
        statusCode: HttpStatus.FORBIDDEN,
        data,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class BadException extends HttpException {
  constructor(
    { message, prefix }: Omit<ErrorType, 'statusCode'>,
    data?: Record<string, unknown>,
  ) {
    const code = prefix + HttpStatus.BAD_REQUEST;
    super(
      {
        message,
        code,
        error: `${code} - ${message}`,
        statusCode: HttpStatus.BAD_REQUEST,
        data,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
