import { FeatureContext, FeatureProvider } from '../types';

export interface MockProviderConfig {
  configs?: Record<string, any>;
  flags?: Record<string, boolean>;
}

export const mockProvider = (config: MockProviderConfig = {}): FeatureProvider => ({
  getConfig: <T>(key: string, context: FeatureContext | undefined, fallback: T): T =>
    (config.configs?.[key] as T) ?? fallback,
  initialize: () => Promise.resolve(),
  isEnabled: (flag) => config.flags?.[flag] ?? false,
  shutdown: () => Promise.resolve(),
});
