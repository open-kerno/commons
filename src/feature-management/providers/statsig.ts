import Statsig, { StatsigUser } from 'statsig-node';

import { FeatureContext, FeatureProvider, GetConfigParams, IsEnabledParams } from '../types';

export interface StatsigProviderConfig {
  environment?: string;
  serverSecret: string;
}

const mapContextToStatsigUser = (ctx?: FeatureContext): StatsigUser => ({
  custom: ctx?.properties,
  customIDs: ctx?.sessionId ? { sessionId: ctx.sessionId } : undefined,
  ip: ctx?.ip,
  userID: ctx?.userId,
});

export const statsigProvider = (config: StatsigProviderConfig): FeatureProvider => {
  return {
    getConfig: <T>({ key, context, fallback }: GetConfigParams<T>): T => {
      try {
        return (Statsig.getConfigSync(mapContextToStatsigUser(context), key).value as T) ?? fallback;
      } catch {
        return fallback;
      }
    },
    initialize: async () => {
      await Statsig.initialize(config.serverSecret, {
        environment: { tier: config.environment ?? 'development' },
      });
    },
    isEnabled: ({ flag, context }: IsEnabledParams) => {
      try {
        return Statsig.checkGateSync(mapContextToStatsigUser(context), flag);
      } catch {
        return false;
      }
    },
    shutdown: () => {
      Statsig.shutdown();
      return Promise.resolve();
    },
  };
};
