import { Platform } from 'react-native';

// ============================================
// MINIMALIST NEOBRUTALISM DESIGN SYSTEM
// ============================================

export const FONTS = {
    primary: Platform.select({ ios: 'System', android: 'Roboto' }),
    secondary: Platform.select({ ios: 'System', android: 'Roboto' }),
    bold: Platform.select({ ios: 'System', android: 'Roboto' }),
} as const;

// ============================================
// COLOR PALETTE
// ============================================

export const COLORS = {
    // === BRAND COLORS ===
    primary: '#3B82F6',          // Royal Blue - Trust & Action
    primaryDark: '#1D4ED8',

    secondary: '#EC4899',        // Hot Pink - Engagement/Notifications
    secondaryDark: '#BE185D',

    accent: '#8B5CF6',           // Violet - Creative/Premium accents

    // === STATUS COLORS ===
    warning: '#F59E0B',          // Amber
    error: '#EF4444',            // Red
    success: '#10B981',          // Emerald

    // === BACKGROUND COLORS ===
    background: '#000000',       // True Black
    surface: '#09090B',          // Zinc 950
    surfaceLight: '#18181B',     // Zinc 900
    surfaceDark: '#000000',

    // === TEXT COLORS ===
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',    // Zinc 400
    textMuted: '#52525B',        // Zinc 600
    textInverse: '#000000',

    // === BORDER COLORS ===
    border: '#27272A',           // Zinc 800
    borderHighlight: '#3F3F46',  // Zinc 700

    // === GLASS/TRANSPARENCY ===
    glass: 'rgba(24, 24, 27, 0.8)',
    overlay: 'rgba(0, 0, 0, 0.7)',

    // === BRUTAL COLORS ===
    brutalBlack: '#000000',
    brutalWhite: '#FFFFFF',
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
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
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
// BORDER RADIUS
// ============================================

export const BORDER_RADIUS = {
    none: 0,
    sm: 2,      // Very sharp
    md: 4,      // Subtle roundness
    lg: 8,
    xl: 12,
    full: 9999, // For pills/circular avatars only
} as const;

// ============================================
// SHADOWS
// ============================================

export const SHADOWS = {
    none: {},
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    // Hard brutal shadow
    brutal: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0, // No elevation on Android for hard shadows usually, handled by borders
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
} as const;

export type Theme = typeof THEME;
