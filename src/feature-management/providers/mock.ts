import { AreEnabledParams, FeatureProvider, GetConfigParams, IsEnabledParams } from '../types';

export interface MockProviderConfig {
  configs?: Record<string, any>;
  flags?: Record<string, boolean>;
}

export const mockProvider = (config: MockProviderConfig = {}): FeatureProvider => {
  return {
    getConfig: <T>({ key, fallback }: GetConfigParams<T>): T => {
      return (config.configs?.[key] as T) ?? fallback;
    },
    initialize: () => {
      return Promise.resolve();
    },
    isEnabled: ({ flag }: IsEnabledParams) => {
      return config.flags?.[flag] ?? false;
    },
    areEnabled: ({ flags }: AreEnabledParams): boolean[] => {
      return flags.map((flag) => config.flags?.[flag] ?? false);
    },
    shutdown: () => {
      return Promise.resolve();
    },
  };
};
