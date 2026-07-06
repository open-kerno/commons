import { isUndefined } from 'es-toolkit/predicate';

export interface EncodeJSONParams<T> {
  jsonString: string;
  fallback?: T;
}

export const encodeJSON = <T>({ jsonString, fallback }: EncodeJSONParams<T>): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    if (isUndefined(fallback)) {
      throw new Error(`JSON_DECODING_ERROR: ${error}`);
    }
    return fallback;
  }
};
