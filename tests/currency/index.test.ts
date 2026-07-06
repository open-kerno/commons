import { Money, money } from '../../src/currency';
import { moneyInputExample } from '../examples/currency.example';

describe.each([
  {
    description: 'should round to 2 decimals for USD',
    input: moneyInputExample({ value: 1.999, currencyCode: 'USD' }),
    expected: 2.0,
  },
  {
    description: 'should round to 0 decimals for JPY',
    input: moneyInputExample({ value: 99.7, currencyCode: 'JPY' }),
    expected: 100,
  },
  {
    description: 'should round to 3 decimals for BHD',
    input: moneyInputExample({ value: 1.2345, currencyCode: 'BHD' }),
    expected: 1.235,
  },
  {
    description: 'should use USD decimals when currency code is unknown',
    input: moneyInputExample({ value: 1.5, currencyCode: 'XXX' }),
    expected: 1.5,
  },
  {
    description: 'should default to USD when no currency code is provided',
    input: moneyInputExample({ value: 10 }),
    expected: 10,
  },
])('given Money construction', ({ description, input, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should return code and 2 decimals for EUR',
    input: moneyInputExample({ value: 1, currencyCode: 'EUR' }),
    expected: { code: 'EUR', decimals: 2 },
  },
  {
    description: 'should return code and 0 decimals for JPY',
    input: moneyInputExample({ value: 1, currencyCode: 'JPY' }),
    expected: { code: 'JPY', decimals: 0 },
  },
  {
    description: 'should return code and 3 decimals for KWD',
    input: moneyInputExample({ value: 1, currencyCode: 'KWD' }),
    expected: { code: 'KWD', decimals: 3 },
  },
  {
    description: 'should default to USD when no currency code is provided',
    input: moneyInputExample({ value: 1 }),
    expected: { code: 'USD', decimals: 2 },
  },
])('given Money.getCurrency', ({ description, input, expected }) => {
  it(description, () => {
    expect(new Money(input.value, input.currencyCode).getCurrency()).toEqual(expected);
  });
});

describe.each([
  {
    description: 'should add two amounts and round to currency scale',
    input: moneyInputExample({ value: 1, currencyCode: 'USD' }),
    operand: 2,
    expected: 3.0,
  },
  {
    description: 'should resolve floating-point edge case 0.1 + 0.2',
    input: moneyInputExample({ value: 0.1, currencyCode: 'USD' }),
    operand: 0.2,
    expected: 0.3,
  },
  {
    description: 'should accept a Money instance as operand',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: money(5, 'USD'),
    expected: 15.0,
  },
])('given Money.add', ({ description, input, operand, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).add(operand).getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should subtract and round to currency scale',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: 3.5,
    expected: 6.5,
  },
  {
    description: 'should resolve floating-point edge case 0.3 - 0.1',
    input: moneyInputExample({ value: 0.3, currencyCode: 'USD' }),
    operand: 0.1,
    expected: 0.2,
  },
  {
    description: 'should accept a Money instance as operand',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: money(3, 'USD'),
    expected: 7.0,
  },
])('given Money.subtract', ({ description, input, operand, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).subtract(operand).getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should multiply and round to currency scale',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: 1.1,
    expected: 11.0,
  },
  {
    description: 'should handle precision when both operands have decimals (1.23 × 1.25 = 1.54)',
    input: moneyInputExample({ value: 1.23, currencyCode: 'USD' }),
    operand: 1.25,
    expected: 1.54,
  },
  {
    description: 'should accept a Money instance as operand',
    input: moneyInputExample({ value: 4, currencyCode: 'USD' }),
    operand: money(2.5, 'USD'),
    expected: 10.0,
  },
])('given Money.multiply', ({ description, input, operand, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).multiply(operand).getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should divide and round to currency scale (10 / 3 = 3.33)',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: 3,
    expected: 3.33,
  },
  {
    description: 'should divide cleanly when there is no remainder',
    input: moneyInputExample({ value: 9, currencyCode: 'USD' }),
    operand: 3,
    expected: 3.0,
  },
  {
    description: 'should accept a Money instance as operand',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operand: money(4, 'USD'),
    expected: 2.5,
  },
])('given Money.divide', ({ description, input, operand, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).divide(operand).getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should clamp a negative value to zero',
    input: moneyInputExample({ value: -5, currencyCode: 'USD' }),
    expected: 0,
  },
  {
    description: 'should clamp NaN to zero',
    input: moneyInputExample({ value: NaN, currencyCode: 'USD' }),
    expected: 0,
  },
  {
    description: 'should leave a positive value unchanged',
    input: moneyInputExample({ value: 5, currencyCode: 'USD' }),
    expected: 5,
  },
  {
    description: 'should clamp to zero after a subtraction that goes negative',
    input: moneyInputExample({ value: -10, currencyCode: 'USD' }),
    expected: 0,
  },
])('given Money.nonNegative', ({ description, input, expected }) => {
  it(description, () => {
    expect(money(input.value, input.currencyCode).nonNegative().getValue()).toBe(expected);
  });
});

describe.each([
  {
    description: 'should support a multi-step chain: (100 + 50) × 1.1 / 2 = 82.5',
    input: moneyInputExample({ value: 100, currencyCode: 'USD' }),
    operation: (m: Money) => m.add(50).multiply(1.1).divide(2),
    expected: 82.5,
  },
  {
    description: 'should chain additions: 10 + 5 + 0.5 = 15.5',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operation: (m: Money) => m.add(5).add(0.5),
    expected: 15.5,
  },
  {
    description: 'should chain add and multiply: (100 + 50) × 2 = 300',
    input: moneyInputExample({ value: 100, currencyCode: 'USD' }),
    operation: (m: Money) => m.add(50).multiply(2),
    expected: 300.0,
  },
  {
    description: 'should chain subtract and nonNegative: 10 - 20 → clamped to 0',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operation: (m: Money) => m.subtract(20).nonNegative(),
    expected: 0,
  },
  {
    description: 'should not mutate the original instance — add returns a new Money',
    input: moneyInputExample({ value: 10, currencyCode: 'USD' }),
    operation: (m: Money) => {
      m.add(5);
      return m;
    },
    expected: 10,
  },
])('given Money fluent chaining', ({ description, input, operation, expected }) => {
  it(description, () => {
    expect(operation(money(input.value, input.currencyCode)).getValue()).toBe(expected);
  });
});
