import { faker } from '@faker-js/faker';

export interface PostgresConfig {
  host: string;
  port: number;
  dbname: string;
  user: string;
  password: string;
  min: number;
  max: number;
  idle_timeout: number;
  connection_timeout: number;
  statement_timeout: number;
}

export const postgresConfigExample = ({
  host = faker.internet.ip(),
  port = faker.number.int({ min: 1024, max: 65535 }),
  dbname = faker.word.noun(),
  user = faker.internet.username(),
  password = faker.internet.password(),
  min = faker.number.int({ min: 1, max: 10 }),
  max = faker.number.int({ min: 50, max: 200 }),
  idle_timeout = faker.number.int({ min: 10000, max: 60000 }),
  connection_timeout = faker.number.int({ min: 1000, max: 10000 }),
  statement_timeout = faker.number.int({ min: 10000, max: 60000 }),
} = {}): PostgresConfig => ({
  host,
  port,
  dbname,
  user,
  password,
  min,
  max,
  idle_timeout,
  connection_timeout,
  statement_timeout,
});
