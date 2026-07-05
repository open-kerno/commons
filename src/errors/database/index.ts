import { HttpStatusCode } from '../../http';
import { ServerError } from '../http';

export class DatabaseConnectionError<T = unknown> extends ServerError<T> {
  constructor(message: string, errors?: T) {
    super(message, HttpStatusCode.INTERNAL_ERROR, errors);
  }
}
