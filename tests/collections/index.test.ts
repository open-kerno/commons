import { createMapFromArray, createSetFromArray } from '../../src/collections';

describe.each([
  {
    description: 'should create a map from a non-empty array using a primitive key',
    items: [
      { id: 1, name: 'apple' },
      { id: 2, name: 'banana' },
    ],
    getKey: (item: { id: number; name: string }) => item.id,
    expected: new Map([
      [1, { id: 1, name: 'apple' }],
      [2, { id: 2, name: 'banana' }],
    ]),
  },
  {
    description: 'should create an empty map when given an empty array',
    items: [],
    getKey: (item: never) => item,
    expected: new Map(),
  },
  {
    description: 'should use the last item when duplicate keys exist',
    items: [
      { id: 1, name: 'apple' },
      { id: 1, name: 'orange' },
    ],
    getKey: (item: { id: number; name: string }) => item.id,
    expected: new Map([[1, { id: 1, name: 'orange' }]]),
  },
  {
    description: 'should create a map using a string key',
    items: [
      { code: 'a', value: 10 },
      { code: 'b', value: 20 },
    ],
    getKey: (item: { code: string; value: number }) => item.code,
    expected: new Map([
      ['a', { code: 'a', value: 10 }],
      ['b', { code: 'b', value: 20 }],
    ]),
  },
  {
    description: 'should create a map from a single-item array',
    items: [{ id: 42, name: 'solo' }],
    getKey: (item: { id: number; name: string }) => item.id,
    expected: new Map([[42, { id: 42, name: 'solo' }]]),
  },
  {
    description: 'should preserve the full object as the map value',
    items: [{ id: 1, name: 'alpha', active: true }],
    getKey: (item: { id: number; name: string; active: boolean }) => item.id,
    expected: new Map([[1, { id: 1, name: 'alpha', active: true }]]),
  },
])('given a createMapFromArray function', ({ description, items, getKey, expected }) => {
  it(description, () => {
    const result = createMapFromArray(items as never[], getKey as never);
    expect(result).toEqual(expected);
  });
});

describe.each([
  {
    description: 'should create a set of primitive values from a non-empty array',
    items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    getValue: (item: { id: number }) => item.id,
    expected: new Set([1, 2, 3]),
  },
  {
    description: 'should create an empty set when given an empty array',
    items: [],
    getValue: (item: never) => item,
    expected: new Set(),
  },
  {
    description: 'should deduplicate values when multiple items produce the same value',
    items: [{ id: 1 }, { id: 1 }, { id: 2 }],
    getValue: (item: { id: number }) => item.id,
    expected: new Set([1, 2]),
  },
  {
    description: 'should create a set of string values',
    items: [{ code: 'a' }, { code: 'b' }, { code: 'c' }],
    getValue: (item: { code: string }) => item.code,
    expected: new Set(['a', 'b', 'c']),
  },
  {
    description: 'should create a set from a single-item array',
    items: [{ id: 42 }],
    getValue: (item: { id: number }) => item.id,
    expected: new Set([42]),
  },
  {
    description: 'should create a set with all duplicate values collapsed into one',
    items: [{ id: 7 }, { id: 7 }, { id: 7 }],
    getValue: (item: { id: number }) => item.id,
    expected: new Set([7]),
  },
])('given a createSetFromArray function', ({ description, items, getValue, expected }) => {
  it(description, () => {
    const result = createSetFromArray(items as never[], getValue as never);
    expect(result).toEqual(expected);
  });
});
