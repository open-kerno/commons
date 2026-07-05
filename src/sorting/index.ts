import { isNil } from 'es-toolkit';

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

type SortableValue = string | number | boolean | Date | null | undefined;

export interface SortCriterion<T> {
  callback: (item: T) => SortableValue;
  sortOrder?: SortOrder;
}

export const sortByCriteria = <T>(items: T[], criteria: Array<SortCriterion<T>>): T[] => {
  const sortedItems = [...items];

  sortedItems.sort((a: T, b: T) => {
    for (const { callback, sortOrder = SortOrder.Asc } of criteria) {
      const valueA = callback(a);
      const valueB = callback(b);

      if (valueA === valueB) continue;
      if (isNil(valueA)) return sortOrder === SortOrder.Asc ? 1 : -1;
      if (isNil(valueB)) return sortOrder === SortOrder.Asc ? -1 : 1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const compareResult = valueA.localeCompare(valueB);
        if (compareResult !== 0) return sortOrder === SortOrder.Asc ? compareResult : -compareResult;
        continue;
      }

      const isAGreaterThanB = valueA > valueB;
      if (sortOrder === SortOrder.Asc) return isAGreaterThanB ? 1 : -1;
      return isAGreaterThanB ? -1 : 1;
    }

    return 0;
  });

  return sortedItems;
};
