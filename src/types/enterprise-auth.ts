export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'TRIAL_USER';
export type SubscriptionTier = 'Trial' | 'Basic' | 'Pro' | 'Agency';

export interface EnterpriseUserSession {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  subscription: {
    tier: SubscriptionTier;
    status: 'active' | 'expired' | 'canceled';
    trialEndsAt?: string;
    creditsRemaining: number;
  };
  twoFactorEnabled: boolean;
  avatarUrl: string;
  loginMethod?: string;
  lastLoginIp: string;
  lastLoginLocation: string;
}

export interface SecurityDevice {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuditLogEntry {
  id: string;
  eventType: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'ACCOUNT_LOCKED' | 'PASSWORD_RESET' | 'MFA_ENABLED' | 'SUSPICIOUS_IP';
  description: string;
  ipAddress: string;
  timestamp: string;
  metadata?: any;
}
