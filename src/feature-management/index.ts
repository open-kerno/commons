import logger from '../logger';
import { FeatureContext, FeatureManagementService, FeatureProvider } from './types';

export type { MockProviderConfig } from './providers/mock';
export { mockProvider } from './providers/mock';
export type { StatsigProviderConfig } from './providers/statsig';
export { statsigProvider } from './providers/statsig';
export type { UnleashProviderConfig } from './providers/unleash';
export { unleashProvider } from './providers/unleash';
export type { FeatureContext, FeatureManagementService, FeatureProvider } from './types';

const log = logger('feature-management');

export const featureManagement = async (provider: FeatureProvider): Promise<FeatureManagementService> => {
  let ready = false;

  try {
    await provider.initialize();
    ready = true;
  } catch (error) {
    log.error('INITIALIZATION_FAILED', error);
  }

  return {
    getConfig: <T>(key: string, context?: FeatureContext, fallback?: T): T | undefined => {
      if (!ready) return fallback;
      try {
        return provider.getConfig(key, context, fallback as T);
      } catch (error) {
        log.error('CONFIG_RETRIEVAL_FAILED', error, { key });
        return fallback;
      }
    },
    isEnabled: (flagName: string, context?: FeatureContext) => {
      if (!ready) return false;
      try {
        return provider.isEnabled(flagName, context);
      } catch (error) {
        log.error('FLAG_EVALUATION_FAILED', error, { flagName });
        return false;
      }
    },
    shutdown: () => provider.shutdown(),
  };
};
