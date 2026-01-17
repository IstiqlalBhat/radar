import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
    COLORS,
    BORDER_RADIUS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
    SHADOWS,
} from '../constants/theme';

type BadgeVariant = 'cyan' | 'pink' | 'yellow' | 'purple' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface GlowingBadgeProps {
    text: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    pulse?: boolean;
    style?: StyleProp<ViewStyle>;
    showGlow?: boolean;
}

export const GlowingBadge: React.FC<GlowingBadgeProps> = ({
    text,
    variant = 'cyan',
    size = 'md',
    pulse = false,
    style,
    showGlow = true,
}) => {
    const getColors = () => {
        switch (variant) {
            case 'cyan': return { bg: COLORS.primaryGlow, border: COLORS.primary, text: COLORS.primary, glow: SHADOWS.glow };
            case 'pink': return { bg: COLORS.secondaryGlow, border: COLORS.secondary, text: COLORS.secondary, glow: SHADOWS.glowSecondary };
            case 'yellow': return { bg: COLORS.warningGlow, border: COLORS.warning, text: COLORS.warning, glow: SHADOWS.glowWarning };
            case 'purple': return { bg: COLORS.accentGlow, border: COLORS.accent, text: COLORS.accent, glow: SHADOWS.glow };
            case 'success': return { bg: COLORS.successGlow, border: COLORS.success, text: COLORS.success, glow: SHADOWS.glowSuccess };
            case 'warning': return { bg: COLORS.warningGlow, border: COLORS.warning, text: COLORS.warning, glow: SHADOWS.glowWarning };
            case 'error': return { bg: COLORS.errorGlow, border: COLORS.error, text: COLORS.error, glow: SHADOWS.glowError };
            case 'neutral':
            default: return { bg: COLORS.surfaceLight, border: COLORS.border, text: COLORS.textSecondary, glow: {} };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return {
                    paddingHorizontal: SPACING.sm,
                    paddingVertical: 3,
                    fontSize: 10,
                    height: 22,
                };
            case 'lg':
                return {
                    paddingHorizontal: SPACING.lg,
                    paddingVertical: 8,
                    fontSize: FONT_SIZES.md,
                    height: 36,
                };
            default:
                return {
                    paddingHorizontal: SPACING.md,
                    paddingVertical: 5,
                    fontSize: FONT_SIZES.sm,
                    height: 28,
                };
        }
    };

    const colors = getColors();
    const sizeStyles = getSizeStyles();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                    height: sizeStyles.height,
                },
                showGlow && colors.glow,
                style,
            ]}
        >
            {pulse && (
                <View
                    style={[
                        styles.pulseIndicator,
                        { backgroundColor: colors.border },
                    ]}
                />
            )}
            <Text
                style={[
                    styles.text,
                    {
                        color: colors.text,
                        fontSize: sizeStyles.fontSize,
                    },
                ]}
            >
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
    },
    pulseIndicator: {
        width: 6,
        height: 6,
        borderRadius: BORDER_RADIUS.full,
        marginRight: 6,
    },
    text: {
        fontWeight: FONT_WEIGHTS.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

export default GlowingBadge;
