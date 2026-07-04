export const createMapFromArray = <T, K>(items: T[], getKey: (item: T) => K): Map<K, T> => {
  const map: Map<K, T> = new Map();

  items.forEach((item: T) => map.set(getKey(item), item));

  return map;
};

export const createSetFromArray = <T, V>(items: T[], getValue: (item: T) => V): Set<V> => {
  return new Set(items.map(getValue));
};
