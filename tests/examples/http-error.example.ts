import { faker } from '@faker-js/faker';

import { BadRequestError, InternalServerError, ServerError } from '../../src/errors/http';
import { HttpStatusCode } from '../../src/http';

export const serverErrorExample = ({
  message = faker.lorem.sentence(),
  statusCode = HttpStatusCode.INTERNAL_ERROR,
  errors = undefined as unknown,
} = {}): ServerError => new ServerError(message, statusCode, errors);

export const badRequestErrorExample = ({
  message = faker.lorem.sentence(),
  errors = undefined as unknown,
} = {}): BadRequestError => new BadRequestError(message, errors);

export const internalServerErrorExample = ({
  message = faker.lorem.sentence(),
  errors = undefined as unknown,
} = {}): InternalServerError => new InternalServerError(message, errors);
