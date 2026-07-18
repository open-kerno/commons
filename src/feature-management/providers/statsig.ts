import Statsig, { StatsigUser } from 'statsig-node';

import { FeatureContext, FeatureProvider } from '../types';

export interface StatsigProviderConfig {
  environment?: string;
  serverSecret: string;
}

const mapUser = (ctx?: FeatureContext): StatsigUser => ({
  custom: ctx?.properties,
  customIDs: ctx?.sessionId ? { sessionId: ctx.sessionId } : undefined,
  ip: ctx?.ip,
  userID: ctx?.userId,
});

export const statsigProvider = (config: StatsigProviderConfig): FeatureProvider => ({
  getConfig: <T>(key: string, ctx: FeatureContext | undefined, fallback: T): T => {
    try {
      return (Statsig.getConfigSync(mapUser(ctx), key).value as T) ?? fallback;
    } catch {
      return fallback;
    }
  },
  initialize: () =>
    Statsig.initialize(config.serverSecret, {
      environment: { tier: config.environment ?? 'development' },
    }).then(() => undefined),
  isEnabled: (flag, ctx) => {
    try {
      return Statsig.checkGateSync(mapUser(ctx), flag);
    } catch {
      return false;
    }
  },
  shutdown: () => {
    Statsig.shutdown();
    return Promise.resolve();
  },
});
