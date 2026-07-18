import { featureManagement, FeatureProvider, mockProvider } from '../../src/feature-management';

describe('featureManagement', () => {
  it('evaluates flags via mock provider', async () => {
    const svc = await featureManagement(mockProvider({ flags: { 'my-flag': true } }));
    expect(svc.isEnabled('my-flag')).toBe(true);
    expect(svc.isEnabled('other-flag')).toBe(false);
  });

  it('retrieves config via mock provider', async () => {
    const svc = await featureManagement(mockProvider({ configs: { 'my-config': { foo: 'bar' } } }));
    expect(svc.getConfig('my-config')).toEqual({ foo: 'bar' });
    expect(svc.getConfig('missing', undefined, 42)).toBe(42);
  });

  it('returns defaults when provider init fails', async () => {
    const failing: FeatureProvider = {
      getConfig: <T>(_key: string, _ctx: any, fallback: T) => fallback,
      initialize: () => Promise.reject(new Error('boom')),
      isEnabled: () => true,
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(failing);
    expect(svc.isEnabled('any-flag')).toBe(false);
    expect(svc.getConfig('any-key', undefined, 'default')).toBe('default');
  });

  it('returns defaults when provider throws during evaluation', async () => {
    const throwing: FeatureProvider = {
      getConfig: () => {
        throw new Error('boom');
      },
      initialize: () => Promise.resolve(),
      isEnabled: () => {
        throw new Error('boom');
      },
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(throwing);
    expect(svc.isEnabled('any-flag')).toBe(false);
    expect(svc.getConfig('any-key', undefined, 'default')).toBe('default');
  });

  it('shuts down cleanly', async () => {
    let destroyed = false;
    const provider: FeatureProvider = {
      getConfig: <T>(_key: string, _ctx: any, fallback: T) => fallback,
      initialize: () => Promise.resolve(),
      isEnabled: () => false,
      shutdown: () => {
        destroyed = true;
        return Promise.resolve();
      },
    };
    const svc = await featureManagement(provider);
    await svc.shutdown();
    expect(destroyed).toBe(true);
  });
});

describe('mockProvider', () => {
  it('defaults to false and undefined when config is empty', () => {
    const p = mockProvider();
    expect(p.isEnabled('flag')).toBe(false);
    expect(p.getConfig('key', undefined, 'fallback')).toBe('fallback');
  });

  it('overrides flags and configs', () => {
    const p = mockProvider({ flags: { f: true }, configs: { k: { v: 1 } } });
    expect(p.isEnabled('f')).toBe(true);
    expect(p.getConfig('k', undefined, null)).toEqual({ v: 1 });
  });
});
