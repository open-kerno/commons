import { encodeJSON } from 'src/object';
import { Context, Unleash } from 'unleash-client';

import logger from '../../logger';
import { AreEnabledParams, FeatureContext, FeatureProvider, GetConfigParams, IsEnabledParams } from '../types';

const log = logger('unleash-provider');

export interface UnleashProviderConfig {
  appName: string;
  environment?: string;
  refreshInterval?: number;
  token: string;
  url: string;
}

const mapFeatureContextToUnleashContext = (ctx?: FeatureContext): Context => ({
  environment: ctx?.environment,
  properties: ctx?.properties,
  remoteAddress: ctx?.ip,
  sessionId: ctx?.sessionId,
  userId: ctx?.userId,
});

export const unleashProvider = (config: UnleashProviderConfig): FeatureProvider => {
  let client: Unleash | null = null;

  return {
    getConfig: <T>({ key, context, fallback }: GetConfigParams<T>): T => {
      if (!client) return fallback;

      const variant = client.getVariant(key, mapFeatureContextToUnleashContext(context));

      if (variant?.enabled && variant.payload) {
        const { type, value } = variant.payload;
        try {
          if (type === 'json') return encodeJSON<T>({ jsonString: value, fallback }) as T;
          if (type === 'string') return String(value) as T;
          if (type === 'number') return Number(value) as T;
        } catch (error) {
          log.error('Failed to parse Unleash variant payload', error, { key });
        }
      }

      return fallback;
    },
    initialize: () => {
      return new Promise<void>((resolve, reject) => {
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
      });
    },
    isEnabled: ({ flag, context }: IsEnabledParams) => {
      return client?.isEnabled(flag, mapFeatureContextToUnleashContext(context)) ?? false;
    },
    areEnabled: ({ flags, context }: AreEnabledParams): boolean[] => {
      return flags.map((flag) => client?.isEnabled(flag, mapFeatureContextToUnleashContext(context)) ?? false);
    },
    shutdown: () => {
      client?.destroy();
      return Promise.resolve();
    },
  };
};
