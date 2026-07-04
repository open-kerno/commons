import { Pool, PoolClient } from 'pg';

import wrapper from '../../../../src/infrastructure/database/postgres';
import { postgresConfigExample } from '../../../examples/postgres.example';

const mockQuery = jest.fn();
const mockRelease = jest.fn();
const mockConnect = jest.fn();
const mockEnd = jest.fn();

const mockClient: Partial<PoolClient> = { query: mockQuery, release: mockRelease };
const mockPoolInstance = { connect: mockConnect, end: mockEnd };

jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation(() => mockPoolInstance),
}));

jest.mock('../../../../src/logger', () => jest.fn(() => ({ info: jest.fn(), error: jest.fn(), debug: jest.fn() })));

describe.each([
  {
    description: 'should create a pool with values from environment variables',
    config: postgresConfigExample(),
  },
  {
    description: 'should create a pool with defaults when env vars are not set',
    config: null,
  },
])('given newPool via wrapper', ({ description, config }) => {
  const configName = 'postgres';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockEnd.mockResolvedValue(undefined);
    process.env = {};
    if (config) {
      process.env['POSTGRES_HOST'] = config.host;
      process.env['POSTGRES_PORT'] = String(config.port);
      process.env['POSTGRES_DBNAME'] = config.dbname;
      process.env['POSTGRES_USER'] = config.user;
      process.env['POSTGRES_PASSWORD'] = config.password;
      process.env['POSTGRES_MIN'] = String(config.min);
      process.env['POSTGRES_MAX'] = String(config.max);
      process.env['POSTGRES_IDLE_TIMEOUT'] = String(config.idle_timeout);
      process.env['POSTGRES_CONNECTION_TIMEOUT'] = String(config.connection_timeout);
      process.env['POSTGRES_STATEMENT_TIMEOUT'] = String(config.statement_timeout);
    }
  });

  it(description, () => {
    wrapper(configName);
    expect(Pool).toHaveBeenCalledWith(
      expect.objectContaining({
        host: config?.host ?? 'localhost',
        port: config?.port ?? 25432,
        database: config?.dbname ?? '',
        user: config?.user ?? '',
      }),
    );
  });
});

describe.each([{ description: 'should return a connected session' }])('given newSession', ({ description }) => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockEnd.mockResolvedValue(undefined);
  });

  it(description, async () => {
    const db = wrapper('postgres');
    const session = await db.newSession();
    expect(mockConnect).toHaveBeenCalled();
    expect(session).toBeDefined();
  });
});

describe.each([{ description: 'should release the session' }])('given closeSession', ({ description }) => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockEnd.mockResolvedValue(undefined);
  });

  it(description, async () => {
    const db = wrapper('postgres');
    const session = await db.newSession();
    db.closeSession(session);
    expect(mockRelease).toHaveBeenCalledWith(true);
  });
});

describe.each([
  {
    description: 'should execute operation and return result on success',
    operation: jest.fn().mockResolvedValue('result'),
    expected: 'result',
    shouldThrow: false,
  },
  {
    description: 'should release session and rethrow on operation failure',
    operation: jest.fn().mockRejectedValue(new Error('op failed')),
    expected: new Error('op failed'),
    shouldThrow: true,
  },
])('given onSession', ({ description, operation, expected, shouldThrow }) => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockEnd.mockResolvedValue(undefined);
  });

  it(description, async () => {
    const db = wrapper('postgres');
    if (shouldThrow) {
      await expect(db.onSession(operation)).rejects.toThrow(expected as Error);
    } else {
      const result = await db.onSession(operation);
      expect(result).toEqual(expected);
    }
    expect(mockRelease).toHaveBeenCalledWith(true);
  });
});

describe.each([
  {
    description: 'should commit transaction and return result on success',
    operation: jest.fn().mockResolvedValue('tx-result'),
    expected: 'tx-result',
    shouldThrow: false,
  },
  {
    description: 'should rollback transaction and rethrow on failure',
    operation: jest.fn().mockRejectedValue(new Error('tx failed')),
    expected: new Error('tx failed'),
    shouldThrow: true,
  },
])('given onTransaction', ({ description, operation, expected, shouldThrow }) => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockQuery.mockResolvedValue(undefined);
    mockEnd.mockResolvedValue(undefined);
  });

  it(description, async () => {
    const db = wrapper('postgres');
    if (shouldThrow) {
      await expect(db.onTransaction(operation)).rejects.toThrow(expected as Error);
      expect(mockQuery).toHaveBeenCalledWith('ROLLBACK');
    } else {
      const result = await db.onTransaction(operation);
      expect(result).toEqual(expected);
      expect(mockQuery).toHaveBeenCalledWith('BEGIN');
      expect(mockQuery).toHaveBeenCalledWith('COMMIT');
    }
    expect(mockRelease).toHaveBeenCalledWith(true);
  });
});

describe.each([{ description: 'should close the pool' }])('given closePool', ({ description }) => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(mockClient);
    mockEnd.mockResolvedValue(undefined);
  });

  it(description, async () => {
    const db = wrapper('postgres');
    await db.closePool();
    expect(mockEnd).toHaveBeenCalled();
  });
});
