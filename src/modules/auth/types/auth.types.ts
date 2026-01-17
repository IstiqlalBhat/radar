// Auth Types

export interface AnonymousUser {
    deviceHash: string;
    installId: string;
    sessionToken: string;
    refreshToken: string;
    trustScore: number;
    createdAt: Date;
    lastActive: Date;
}

export interface DeviceFingerprint {
    deviceId: string;
    platform: 'ios' | 'android';
    osVersion: string;
    appVersion: string;
    installId: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: Date;
}

export interface AuthState {
    user: AnonymousUser | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface RegisterDevicePayload {
    fingerprint: DeviceFingerprint;
    timestamp: number;
}

export interface RegisterDeviceResponse {
    user: AnonymousUser;
    tokens: AuthTokens;
}
