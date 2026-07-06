import { BadRequestError } from '../../errors/http';

export interface Allocable {
  value: number;
}

export type Prorated<T> = T & {
  proratedValue: number;
  percentage: number;
};

export interface ProrateOptions<T extends Allocable> {
  items: T[];
  amountToDistribute: number;
  throwOnError?: boolean;
}

export const prorate = <T extends Allocable>({
  items,
  amountToDistribute,
  throwOnError = false,
}: ProrateOptions<T>): Prorated<T>[] => {
  if (items.length === 0) {
    return [];
  }

  const totalBaseValue = items.reduce((sum, item) => sum + item.value, 0);

  if (totalBaseValue <= 0) {
    if (throwOnError) {
      throw new Error('The total value of the items must be greater than 0; cannot calculate proration.');
    }
    return [];
  }

  if (items.some((item) => item.value < 0)) {
    if (throwOnError) {
      throw new Error('Negative values are not allowed in the items to be prorated.');
    }
    return [];
  }

  let remainingPercentage = 1;
  let remainingAmount = amountToDistribute;

  return items.map((item, index) => {
    const isLastItem = index === items.length - 1;

    const percentage = isLastItem ? remainingPercentage : item.value / totalBaseValue;
    const proratedValue = isLastItem ? remainingAmount : percentage * amountToDistribute;

    remainingPercentage -= percentage;
    remainingAmount -= proratedValue;

    return { ...item, percentage, proratedValue };
  });
};

export interface Weighted {
  weight: number;
}

export type PennyAllocated<T> = T & {
  proratedValue: number;
  percentage: number;
};

export interface AllocatePenniesOptions<T extends Weighted> {
  amountToDistribute: number;
  items: T[];
  precision?: number;
  throwOnError?: boolean;
}

export const proratePennies = <T extends Weighted>({
  amountToDistribute,
  items,
  precision = 12,
  throwOnError = false,
}: AllocatePenniesOptions<T>): PennyAllocated<T>[] => {
  if (items.length === 0) {
    if (throwOnError) {
      throw new BadRequestError('At least one allocation target is required.');
    }
    return [];
  }

  if (items.some((item) => item.weight < 0)) {
    if (throwOnError) {
      throw new BadRequestError('Allocation weights must not be negative.');
    }
    return [];
  }

  const totalBaseValue = items.reduce((sum, item) => sum + item.weight, 0);

  if (totalBaseValue <= 0) {
    if (throwOnError) {
      throw new BadRequestError('The total weight of the allocation targets must be greater than 0.');
    }
    return [];
  }

  const factor = 10 ** precision;
  const totalUnits = Math.round(amountToDistribute * factor);
  const lastIndex = items.length - 1;

  const units: number[] = [];
  const percentages: number[] = [];
  const roundingErrors: number[] = [];
  let runningSum = 0;
  let remainingPercentage = 1;

  items.forEach((item, index) => {
    if (index === lastIndex) return;

    const percentage = item.weight / totalBaseValue;
    const exactShare = (totalUnits * item.weight) / totalBaseValue;
    const roundedShare = Math.round(exactShare);

    percentages.push(percentage);
    remainingPercentage -= percentage;

    units.push(roundedShare);
    roundingErrors.push(roundedShare - exactShare);
    runningSum += roundedShare;
  });

  percentages.push(remainingPercentage);
  units.push(totalUnits - runningSum);
  roundingErrors.push(0);

  if (units[lastIndex] < 0) {
    let deficit = -units[lastIndex];
    units[lastIndex] = 0;

    const donors = roundingErrors
      .map((error, index) => ({ index, error }))
      .filter(({ index }) => index !== lastIndex)
      .sort((a, b) => b.error - a.error);

    for (const { index } of donors) {
      if (deficit === 0) break;
      units[index] -= 1;
      deficit -= 1;
    }
  }

  return items.map((item, index) => ({
    ...item,
    proratedValue: units[index] / factor,
    percentage: percentages[index],
  }));
};
