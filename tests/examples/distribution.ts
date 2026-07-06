import { faker } from '@faker-js/faker';

import { Allocable, Weighted } from '../../src/math/distribution';

export const allocableItemExample = ({ id = 1, value = 10 } = {}): { id: number } & Allocable => ({
  id,
  value,
});

export const weightedItemExample = ({
  id = faker.number.int({ min: 1, max: 1_000 }),
  weight = faker.number.int({ min: 1, max: 100 }),
} = {}): { id: number } & Weighted => ({
  id,
  weight,
});
