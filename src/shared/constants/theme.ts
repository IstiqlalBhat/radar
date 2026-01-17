// Theme Configuration
export const COLORS = {
    // Primary Palette
    primary: '#6366F1',      // Indigo
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',

    // Secondary Palette
    secondary: '#EC4899',    // Pink
    secondaryLight: '#F472B6',
    secondaryDark: '#DB2777',

    // Accent Colors
    accent: '#10B981',       // Emerald
    warning: '#F59E0B',      // Amber
    error: '#EF4444',        // Red
    success: '#22C55E',      // Green

    // Neutral Palette
    background: '#0F0F0F',
    surface: '#1A1A1A',
    surfaceLight: '#262626',
    surfaceDark: '#0A0A0A',

    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#A3A3A3',
    textMuted: '#737373',
    textDisabled: '#525252',

    // Bubble Colors (for map)
    bubbleHot: '#EF4444',
    bubbleActive: '#F59E0B',
    bubbleNormal: '#6366F1',
    bubbleQuiet: '#6B7280',
} as const;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const FONT_SIZES = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
} as const;

export const BORDER_RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
} as const;

export const SHADOWS = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
} as const;

export const THEME = {
    colors: COLORS,
    spacing: SPACING,
    fontSizes: FONT_SIZES,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
} as const;

export type Theme = typeof THEME;
