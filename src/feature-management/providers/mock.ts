import { FeatureContext, FeatureProvider } from '../types';

export interface MockProviderConfig {
  configs?: Record<string, any>;
  flags?: Record<string, boolean>;
}

export const mockProvider = (config: MockProviderConfig = {}): FeatureProvider => {
  return {
    getConfig: <T>(key: string, _context: FeatureContext | undefined, fallback: T): T => {
      return (config.configs?.[key] as T) ?? fallback;
    },
    initialize: () => {
      return Promise.resolve();
    },
    isEnabled: (flagName: string) => {
      return config.flags?.[flagName] ?? false;
    },
    shutdown: () => {
      return Promise.resolve();
    },
  };
};
