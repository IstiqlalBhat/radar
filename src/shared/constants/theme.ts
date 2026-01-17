import { Platform } from 'react-native';

// ============================================
// NEON NOIR CYBER-SOCIAL DESIGN SYSTEM
// ============================================

export const FONTS = {
    primary: Platform.select({ ios: 'System', android: 'Roboto' }),
    secondary: Platform.select({ ios: 'System', android: 'Roboto' }),
    bold: Platform.select({ ios: 'System', android: 'Roboto' }),
} as const;

// ============================================
// COLOR PALETTE - Neon Noir
// ============================================

export const COLORS = {
    // === BRAND COLORS ===
    primary: '#00D9FF',          // Electric Cyan
    primaryDark: '#00A3CC',
    primaryGlow: 'rgba(0, 217, 255, 0.3)',

    secondary: '#FF3366',        // Hot Pink/Coral
    secondaryDark: '#CC1A4D',
    secondaryGlow: 'rgba(255, 51, 102, 0.3)',

    accent: '#A855F7',           // Vivid Purple
    accentGlow: 'rgba(168, 85, 247, 0.3)',

    // === STATUS COLORS ===
    warning: '#FFB800',          // Amber Glow
    warningGlow: 'rgba(255, 184, 0, 0.3)',
    error: '#FF4D6A',            // Soft Red
    errorGlow: 'rgba(255, 77, 106, 0.3)',
    success: '#00FF88',          // Neon Green
    successGlow: 'rgba(0, 255, 136, 0.3)',

    // === BACKGROUND COLORS ===
    background: '#0A0A0F',       // Near-black with blue tint
    surface: '#12121A',          // Elevated dark
    surfaceLight: '#1A1A28',     // Card backgrounds
    surfaceGlow: '#252538',      // Hover/active states
    surfaceDark: '#08080C',

    // === TEXT COLORS ===
    textPrimary: '#FFFFFF',
    textSecondary: '#8B8BA3',    // Soft lavender-gray
    textMuted: '#5C5C6E',        // Dimmed text
    textInverse: '#0A0A0F',
    textDisabled: '#3A3A4A',

    // === BORDER COLORS ===
    border: '#2A2A3A',           // Subtle border
    borderHighlight: '#3D3D52',  // Emphasized borders
    borderGlow: '#404060',       // Glowing state

    // === GLASS/TRANSPARENCY ===
    glass: 'rgba(18, 18, 26, 0.85)',
    glassLight: 'rgba(26, 26, 40, 0.9)',
    overlay: 'rgba(10, 10, 15, 0.8)',

    // === GRADIENT COLORS ===
    gradientStart: '#00D9FF',
    gradientEnd: '#A855F7',
    gradientHot: '#FF3366',
} as const;

// ============================================
// SPACING SYSTEM
// ============================================

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const FONT_SIZES = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
} as const;

export const FONT_WEIGHTS = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
};

// ============================================
// BORDER RADIUS - Softer, more fluid
// ============================================

export const BORDER_RADIUS = {
    none: 0,
    sm: 8,       // Cards, small elements
    md: 12,      // Buttons, badges
    lg: 16,      // Modals, sheets
    xl: 24,      // Large cards
    xxl: 32,     // Hero elements
    full: 9999,  // Pills, avatars
} as const;

// ============================================
// SHADOWS - Glow-based system
// ============================================

export const SHADOWS = {
    none: {},
    sm: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    glow: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 0,
    },
    glowStrong: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 0,
    },
    glowSecondary: {
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 0,
    },
    glowSuccess: {
        shadowColor: COLORS.success,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 0,
    },
    glowWarning: {
        shadowColor: COLORS.warning,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 0,
    },
    glowError: {
        shadowColor: COLORS.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 0,
    },
} as const;

// ============================================
// ANIMATION TIMING
// ============================================

export const ANIMATION = {
    fast: 150,
    normal: 250,
    slow: 400,
    spring: {
        damping: 15,
        stiffness: 150,
        mass: 1,
    },
    springBouncy: {
        damping: 10,
        stiffness: 180,
        mass: 0.8,
    },
} as const;

// ============================================
// COMBINED THEME
// ============================================

export const THEME = {
    colors: COLORS,
    spacing: SPACING,
    fontSizes: FONT_SIZES,
    fontWeights: FONT_WEIGHTS,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
    fonts: FONTS,
    animation: ANIMATION,
} as const;

export type Theme = typeof THEME;
