export interface FeatureContext {
  environment?: string;
  ip?: string;
  properties?: Record<string, string>;
  sessionId?: string;
  userId?: string;
}

export interface GetServiceConfigParams<T> {
  context?: FeatureContext;
  fallback?: T;
  key: string;
}

export interface IsEnabledParams {
  context?: FeatureContext;
  flag: string;
}

export interface FeatureManagementService {
  getConfig<T>(params: GetServiceConfigParams<T>): T | undefined;
  isEnabled(params: IsEnabledParams): boolean;
  shutdown(): Promise<void>;
}

export interface GetConfigParams<T> {
  key: string;
  fallback: T;
  context?: FeatureContext;
}

export interface FeatureProvider {
  getConfig<T>(params: GetConfigParams<T>): T;
  initialize(): Promise<void>;
  isEnabled(params: IsEnabledParams): boolean;
  shutdown(): Promise<void>;
}
