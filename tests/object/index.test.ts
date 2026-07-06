import { encodeJSON } from '../../src/object';

it.each([
  {
    description: 'should throw error for invalid JSON string without defaultValue',
    jsonString: '{"name": "John", "age":}',
  },
  {
    description: 'should throw error for empty JSON string without defaultValue',
    jsonString: '',
  },
  {
    description: 'should throw error for whitespace-only string without defaultValue',
    jsonString: '   ',
  },
  {
    description: 'should throw error for JSON with trailing comma without defaultValue',
    jsonString: '{"key": "value",}',
  },
  {
    description: 'should throw error for single-quoted JSON without defaultValue',
    jsonString: "{'key': 'value'}",
  },
])('$description', ({ jsonString }) => {
  expect(() => encodeJSON({ jsonString, fallback: undefined })).toThrow(/^JSON_DECODING_ERROR/);
});

it.each([
  {
    description: 'should return default value for invalid JSON string when defaultValue is provided',
    jsonString: '{"name": "John", "age":}',
    defaultValue: { name: 'Default', age: 25 },
    expected: { name: 'Default', age: 25 },
  },
  {
    description: 'should return parsed value and ignore defaultValue when JSON string is valid',
    jsonString: '{"name": "John", "age": 10}',
    defaultValue: { name: 'Default', age: 25 },
    expected: { name: 'John', age: 10 },
  },
  {
    description: 'should return default value when JSON string is empty and defaultValue is provided',
    jsonString: '',
    defaultValue: { key: 'value' },
    expected: { key: 'value' },
  },
  {
    description: 'should return defaultValue for malformed JSON string with defaultValue',
    jsonString: '{invalid}',
    defaultValue: { name: 'Fallback' },
    expected: { name: 'Fallback' },
  },
  {
    description: 'should return defaultValue for whitespace-only string when defaultValue is provided',
    jsonString: '   ',
    defaultValue: { key: 'default' },
    expected: { key: 'default' },
  },
  {
    description: 'should return falsy defaultValue (null) for invalid JSON',
    jsonString: '{bad}',
    defaultValue: null,
    expected: null,
  },
  {
    description: 'should return falsy defaultValue (0) for invalid JSON',
    jsonString: '{bad}',
    defaultValue: 0,
    expected: 0,
  },
  {
    description: 'should return falsy defaultValue (false) for invalid JSON',
    jsonString: '{bad}',
    defaultValue: false,
    expected: false,
  },
  {
    description: 'should return array as defaultValue for invalid JSON',
    jsonString: '{bad}',
    defaultValue: [1, 2, 3],
    expected: [1, 2, 3],
  },
])('$description', ({ jsonString, defaultValue, expected }) => {
  const result = encodeJSON({ jsonString, fallback: defaultValue });

  expect(result).toEqual(expected);
});

it.each([
  {
    description: 'should parse a valid JSON array',
    jsonString: '[1, 2, 3]',
    expected: [1, 2, 3],
  },
  {
    description: 'should parse a valid JSON boolean true',
    jsonString: 'true',
    expected: true,
  },
  {
    description: 'should parse a valid JSON boolean false',
    jsonString: 'false',
    expected: false,
  },
  {
    description: 'should parse a valid JSON number',
    jsonString: '42',
    expected: 42,
  },
  {
    description: 'should parse a valid JSON negative number',
    jsonString: '-7',
    expected: -7,
  },
  {
    description: 'should parse a valid JSON float number',
    jsonString: '3.14',
    expected: 3.14,
  },
  {
    description: 'should parse a valid JSON null',
    jsonString: 'null',
    expected: null,
  },
  {
    description: 'should parse a valid JSON string literal',
    jsonString: '"hello world"',
    expected: 'hello world',
  },
  {
    description: 'should parse an empty JSON object',
    jsonString: '{}',
    expected: {},
  },
  {
    description: 'should parse an empty JSON array',
    jsonString: '[]',
    expected: [],
  },
  {
    description: 'should parse a valid nested JSON object',
    jsonString: '{"user": {"name": "John", "address": {"city": "NY"}}}',
    expected: { user: { name: 'John', address: { city: 'NY' } } },
  },
  {
    description: 'should parse a valid JSON string with leading and trailing whitespace',
    jsonString: '  {"key": "value"}  ',
    expected: { key: 'value' },
  },
  {
    description: 'should parse a valid JSON object with unicode characters',
    jsonString: '{"greeting": "héllo wörld"}',
    expected: { greeting: 'héllo wörld' },
  },
])('$description', ({ jsonString, expected }) => {
  const result = encodeJSON({ jsonString });

  expect(result).toEqual(expected);
});
