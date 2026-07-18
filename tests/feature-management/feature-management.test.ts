import { featureManagement, FeatureProvider, mockProvider } from '../../src/feature-management';

describe('featureManagement', () => {
  it('evaluates flags via mock provider', async () => {
    const svc = await featureManagement(mockProvider({ flags: { 'my-flag': true } }));
    expect(svc.isEnabled({ flag: 'my-flag' })).toBe(true);
    expect(svc.isEnabled({ flag: 'other-flag' })).toBe(false);
  });

  it('retrieves config via mock provider', async () => {
    const svc = await featureManagement(mockProvider({ configs: { 'my-config': { foo: 'bar' } } }));
    expect(svc.getConfig({ key: 'my-config' })).toEqual({ foo: 'bar' });
    expect(svc.getConfig({ key: 'missing', fallback: 42 })).toBe(42);
  });

  it('returns defaults when provider init fails', async () => {
    const failing: FeatureProvider = {
      areEnabled: ({ flags }) => flags.map(() => false),
      getConfig: <T>({ fallback }: { key: string; fallback: T }) => fallback,
      initialize: () => Promise.reject(new Error('boom')),
      isEnabled: () => true,
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(failing);
    expect(svc.isEnabled({ flag: 'any-flag' })).toBe(false);
    expect(svc.getConfig({ key: 'any-key', fallback: 'default' })).toBe('default');
    expect(svc.areEnabled({ flags: ['a', 'b'] })).toEqual([false, false]);
  });

  it('returns defaults when provider throws during evaluation', async () => {
    const throwing: FeatureProvider = {
      areEnabled: () => {
        throw new Error('boom');
      },
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
    expect(svc.isEnabled({ flag: 'any-flag' })).toBe(false);
    expect(svc.getConfig({ key: 'any-key', fallback: 'default' })).toBe('default');
    expect(svc.areEnabled({ flags: ['a', 'b'] })).toEqual([false, false]);
  });

  it('shuts down cleanly', async () => {
    let destroyed = false;
    const provider: FeatureProvider = {
      areEnabled: ({ flags }) => flags.map(() => false),
      getConfig: <T>({ fallback }: { key: string; fallback: T }) => fallback,
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

describe('featureManagement.areEnabled', () => {
  it('returns boolean array matching flags order', async () => {
    const svc = await featureManagement(mockProvider({ flags: { 'flag-a': true, 'flag-b': false, 'flag-c': true } }));
    expect(svc.areEnabled({ flags: ['flag-a', 'flag-b', 'flag-c'] })).toEqual([true, false, true]);
  });

  it('returns all false when provider init fails', async () => {
    const failing: FeatureProvider = {
      areEnabled: ({ flags }) => flags.map(() => true),
      getConfig: <T>({ fallback }: { key: string; fallback: T }) => fallback,
      initialize: () => Promise.reject(new Error('boom')),
      isEnabled: () => true,
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(failing);
    expect(svc.areEnabled({ flags: ['a', 'b', 'c'] })).toEqual([false, false, false]);
  });

  it('returns false per flag when provider throws during evaluation', async () => {
    const throwing: FeatureProvider = {
      areEnabled: () => {
        throw new Error('boom');
      },
      getConfig: <T>({ fallback }: { key: string; fallback: T }) => fallback,
      initialize: () => Promise.resolve(),
      isEnabled: () => {
        throw new Error('boom');
      },
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(throwing);
    expect(svc.areEnabled({ flags: ['x', 'y'] })).toEqual([false, false]);
  });

  it('returns empty array for empty flags list', async () => {
    const svc = await featureManagement(mockProvider());
    expect(svc.areEnabled({ flags: [] })).toEqual([]);
  });

  it('passes context to each flag evaluation', async () => {
    let capturedContext: { flags: string[]; userId?: string } | undefined;
    const provider: FeatureProvider = {
      getConfig: <T>({ fallback }: { key: string; fallback: T }) => fallback,
      initialize: () => Promise.resolve(),
      isEnabled: ({ flag, context }) => {
        void flag;
        void context;
        return true;
      },
      areEnabled: ({ flags, context }) => {
        capturedContext = { flags, userId: context?.userId };
        return flags.map(() => true);
      },
      shutdown: () => Promise.resolve(),
    };
    const svc = await featureManagement(provider);
    svc.areEnabled({ flags: ['a', 'b'], context: { userId: 'u-1' } });
    expect(capturedContext).toEqual({ flags: ['a', 'b'], userId: 'u-1' });
  });
});

describe('mockProvider', () => {
  it('defaults to false and undefined when config is empty', () => {
    const p = mockProvider();
    expect(p.isEnabled({ flag: 'flag' })).toBe(false);
    expect(p.getConfig({ key: 'key', fallback: 'fallback' })).toBe('fallback');
  });

  it('overrides flags and configs', () => {
    const p = mockProvider({ flags: { f: true }, configs: { k: { v: 1 } } });
    expect(p.isEnabled({ flag: 'f' })).toBe(true);
    expect(p.getConfig({ key: 'k', fallback: null })).toEqual({ v: 1 });
  });
});
