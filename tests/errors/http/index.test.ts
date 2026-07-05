import { BadRequestError, InternalServerError, ServerError } from '../../../src/errors/http';
import { HttpStatusCode } from '../../../src/http';

describe.each([
  {
    description: 'should set message and default status INTERNAL_ERROR when no statusCode is provided',
    message: 'Something went wrong',
    statusCode: undefined,
    errors: undefined,
    expected: {
      message: 'Something went wrong',
      status: HttpStatusCode.INTERNAL_ERROR,
      errors: undefined,
    },
  },
  {
    description: 'should set message and custom statusCode when provided',
    message: 'Not found',
    statusCode: HttpStatusCode.NOT_FOUND,
    errors: undefined,
    expected: {
      message: 'Not found',
      status: HttpStatusCode.NOT_FOUND,
      errors: undefined,
    },
  },
  {
    description: 'should set errors payload when provided',
    message: 'Validation failed',
    statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
    errors: [{ field: 'email', reason: 'invalid' }],
    expected: {
      message: 'Validation failed',
      status: HttpStatusCode.UNPROCESSABLE_ENTITY,
      errors: [{ field: 'email', reason: 'invalid' }],
    },
  },
  {
    description: 'should be an instance of Error',
    message: 'error',
    statusCode: HttpStatusCode.BAD_GATEWAY,
    errors: undefined,
    expected: {
      message: 'error',
      status: HttpStatusCode.BAD_GATEWAY,
      errors: undefined,
    },
  },
])('given ServerError', ({ description, message, statusCode, errors, expected }) => {
  it(description, () => {
    const error = new ServerError(message, statusCode, errors);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toBe(expected.message);
    expect(error.status).toBe(expected.status);
    expect(error.errors).toEqual(expected.errors);
  });
});

describe.each([
  {
    description: 'should set status BAD_REQUEST and message when no errors are provided',
    message: 'Invalid input',
    errors: undefined,
    expected: {
      message: 'Invalid input',
      status: HttpStatusCode.BAD_REQUEST,
      errors: undefined,
    },
  },
  {
    description: 'should set status BAD_REQUEST and include errors payload when provided',
    message: 'Validation error',
    errors: { field: 'name', issue: 'required' },
    expected: {
      message: 'Validation error',
      status: HttpStatusCode.BAD_REQUEST,
      errors: { field: 'name', issue: 'required' },
    },
  },
  {
    description: 'should be an instance of ServerError and Error',
    message: 'Bad request',
    errors: undefined,
    expected: {
      message: 'Bad request',
      status: HttpStatusCode.BAD_REQUEST,
      errors: undefined,
    },
  },
])('given BadRequestError', ({ description, message, errors, expected }) => {
  it(description, () => {
    const error = new BadRequestError(message, errors);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ServerError);
    expect(error).toBeInstanceOf(BadRequestError);
    expect(error.message).toBe(expected.message);
    expect(error.status).toBe(expected.status);
    expect(error.errors).toEqual(expected.errors);
  });
});

describe.each([
  {
    description: 'should set status INTERNAL_ERROR and message when no errors are provided',
    message: 'Unexpected failure',
    errors: undefined,
    expected: {
      message: 'Unexpected failure',
      status: HttpStatusCode.INTERNAL_ERROR,
      errors: undefined,
    },
  },
  {
    description: 'should set status INTERNAL_ERROR and include errors payload when provided',
    message: 'Database crashed',
    errors: { code: 'DB_CONN_FAILED' },
    expected: {
      message: 'Database crashed',
      status: HttpStatusCode.INTERNAL_ERROR,
      errors: { code: 'DB_CONN_FAILED' },
    },
  },
  {
    description: 'should be an instance of ServerError and Error',
    message: 'Internal error',
    errors: undefined,
    expected: {
      message: 'Internal error',
      status: HttpStatusCode.INTERNAL_ERROR,
      errors: undefined,
    },
  },
])('given InternalServerError', ({ description, message, errors, expected }) => {
  it(description, () => {
    const error = new InternalServerError(message, errors);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ServerError);
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe(expected.message);
    expect(error.status).toBe(expected.status);
    expect(error.errors).toEqual(expected.errors);
  });
});
