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

// ponytail: ready=false persists after failed init; background SDK recovery not propagated — add FeatureProvider.isReady() if needed
export const featureManagement = async (provider: FeatureProvider): Promise<FeatureManagementService> => {
  let ready = false;

  try {
    await provider.initialize();
    ready = true;
  } catch (err) {
    log.error('INITIALIZATION_FAILED', err as Error);
  }

  return {
    getConfig: <T>(key: string, context?: FeatureContext, fallback?: T): T | undefined => {
      if (!ready) return fallback;
      try {
        return provider.getConfig(key, context, fallback as T);
      } catch (err) {
        log.error('CONFIG_RETRIEVAL_FAILED', err as Error, { key });
        return fallback;
      }
    },
    isEnabled: (flag, context) => {
      if (!ready) return false;
      try {
        return provider.isEnabled(flag, context);
      } catch (err) {
        log.error('FLAG_EVALUATION_FAILED', err as Error, { flag });
        return false;
      }
    },
    shutdown: () => provider.shutdown(),
  };
};
