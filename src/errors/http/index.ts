import { HttpStatusCode } from '../../http';

export class ServerError<T = unknown> extends Error {
  status: HttpStatusCode;
  errors?: T;

  constructor(message: string, statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_ERROR, errors?: T) {
    super(message);
    this.status = statusCode;
    this.errors = errors;
  }
}

export class BadRequestError<T = unknown> extends ServerError<T> {
  constructor(message: string, errors?: T) {
    super(message, HttpStatusCode.BAD_REQUEST, errors);
  }
}

export class InternalServerError<T = unknown> extends ServerError<T> {
  constructor(message: string, errors?: T) {
    super(message, HttpStatusCode.INTERNAL_ERROR, errors);
  }
}
