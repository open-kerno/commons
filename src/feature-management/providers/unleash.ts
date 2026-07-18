import { Context, Unleash } from 'unleash-client';

import { FeatureContext, FeatureProvider } from '../types';

export interface UnleashProviderConfig {
  appName: string;
  environment?: string;
  refreshInterval?: number;
  token: string;
  url: string;
}

const mapContext = (ctx?: FeatureContext): Context => ({
  environment: ctx?.environment,
  properties: ctx?.properties,
  remoteAddress: ctx?.ip,
  sessionId: ctx?.sessionId,
  userId: ctx?.userId,
});

export const unleashProvider = (config: UnleashProviderConfig): FeatureProvider => {
  let client: Unleash | null = null;

  return {
    getConfig: <T>(key: string, ctx: FeatureContext | undefined, fallback: T): T => {
      if (!client) return fallback;
      const variant = client.getVariant(key, mapContext(ctx));
      if (variant?.enabled && variant.payload) {
        const { type, value } = variant.payload;
        try {
          if (type === 'json') return JSON.parse(value) as T;
          if (type === 'string') return value as unknown as T;
          if (type === 'number') return Number(value) as unknown as T;
        } catch {
          // fall through to return fallback
        }
      }
      return fallback;
    },
    initialize: () =>
      new Promise<void>((resolve, reject) => {
        client = new Unleash({
          appName: config.appName,
          customHeaders: { Authorization: config.token },
          environment: config.environment ?? 'development',
          refreshInterval: config.refreshInterval ?? 15,
          url: config.url,
        });
        const timer = setTimeout(() => reject(new Error('Unleash init timeout')), 30_000);
        client.once('ready', () => {
          clearTimeout(timer);
          resolve();
        });
        client.once('error', (err: Error) => {
          clearTimeout(timer);
          reject(err);
        });
      }),
    isEnabled: (flag, ctx) => client?.isEnabled(flag, mapContext(ctx)) ?? false,
    shutdown: () => {
      client?.destroy();
      return Promise.resolve();
    },
  };
};
