// App Configuration
export const APP_CONFIG = {
    name: 'Radar',
    version: '1.0.0',
    description: 'Hyper-local anonymous bubbles',
} as const;

// Bubble Configuration
export const BUBBLE_CONFIG = {
    DEFAULT_RADIUS_METERS: 30, // ~100 feet
    MIN_RADIUS_METERS: 15,     // ~50 feet
    MAX_RADIUS_METERS: 50,     // ~165 feet
    POST_EXPIRY_HOURS: 24,
    MAX_POST_LENGTH: 280,
    MAX_COMMENT_LENGTH: 200,
} as const;

// Location Configuration
export const LOCATION_CONFIG = {
    UPDATE_INTERVAL_MS: 5000,
    FASTEST_INTERVAL_MS: 2000,
    DISTANCE_FILTER_METERS: 5,
    MAX_VELOCITY_MS: 40, // Anti-spoofing: max ~144 km/h
} as const;

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.radar.app',
    TIMEOUT_MS: 10000,
    WS_URL: process.env.EXPO_PUBLIC_WS_URL || 'wss://ws.radar.app',
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
    MIN_TRUST_SCORE: 20,
    TOKEN_REFRESH_THRESHOLD_SECONDS: 300, // 5 minutes before expiry
} as const;
