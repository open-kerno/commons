import logger from '../logger';
import {
  AreEnabledParams,
  FeatureManagementService,
  FeatureProvider,
  GetServiceConfigParams,
  IsEnabledParams,
} from './types';

export type { MockProviderConfig } from './providers/mock';
export { mockProvider } from './providers/mock';
export type { StatsigProviderConfig } from './providers/statsig';
export { statsigProvider } from './providers/statsig';
export type { UnleashProviderConfig } from './providers/unleash';
export { unleashProvider } from './providers/unleash';
export type {
  AreEnabledParams,
  FeatureContext,
  FeatureManagementService,
  FeatureProvider,
  GetConfigParams,
  GetServiceConfigParams,
  IsEnabledParams,
} from './types';

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
    getConfig: <T>({ key, context, fallback }: GetServiceConfigParams<T>): T | undefined => {
      if (!ready) return fallback;
      try {
        return provider.getConfig({ key, context, fallback: fallback as T });
      } catch (error) {
        log.error('CONFIG_RETRIEVAL_FAILED', error, { key });
        return fallback;
      }
    },
    isEnabled: ({ flag, context }: IsEnabledParams) => {
      if (!ready) return false;
      try {
        return provider.isEnabled({ flag, context });
      } catch (error) {
        log.error('FLAG_EVALUATION_FAILED', error, { flag });
        return false;
      }
    },
    areEnabled: ({ flags, context }: AreEnabledParams): boolean[] => {
      if (!ready) return flags.map(() => false);
      try {
        return provider.areEnabled({ flags, context });
      } catch (error) {
        log.error('FLAGS_EVALUATION_FAILED', error, { flags });
        return flags.map(() => false);
      }
    },
    shutdown: () => provider.shutdown(),
  };
};
