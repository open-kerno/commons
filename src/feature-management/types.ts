export interface FeatureContext {
  environment?: string;
  ip?: string;
  properties?: Record<string, string>;
  sessionId?: string;
  userId?: string;
}

export interface FeatureManagementService {
  getConfig<T>(key: string, context?: FeatureContext, fallback?: T): T | undefined;
  isEnabled(flag: string, context?: FeatureContext): boolean;
  shutdown(): Promise<void>;
}

export interface FeatureProvider {
  getConfig<T>(key: string, context: FeatureContext | undefined, fallback: T): T;
  initialize(): Promise<void>;
  isEnabled(flag: string, context?: FeatureContext): boolean;
  shutdown(): Promise<void>;
}
