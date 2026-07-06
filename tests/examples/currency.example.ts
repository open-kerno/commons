import { faker } from '@faker-js/faker';

export const moneyInputExample = ({
  value = faker.number.float({ min: 0.01, max: 9999.99, fractionDigits: 2 }),
  currencyCode = 'USD',
} = {}): { value: number; currencyCode: string } => ({ value, currencyCode });
