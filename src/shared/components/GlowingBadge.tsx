import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
    COLORS,
    BORDER_RADIUS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '../constants/theme';

type BadgeVariant = 'cyan' | 'pink' | 'yellow' | 'purple' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface GlowingBadgeProps {
    text: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    pulse?: boolean;
    style?: StyleProp<ViewStyle>;
    showGlow?: boolean; // Prop kept for API compatibility, visual glow removed
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
        // Mapping deprecated variants to available colors
        switch (variant) {
            case 'cyan': return { bg: COLORS.surface, border: COLORS.primary, text: COLORS.primary };
            case 'pink': return { bg: COLORS.surface, border: COLORS.secondary, text: COLORS.secondary };
            case 'yellow': return { bg: COLORS.surface, border: COLORS.warning, text: COLORS.warning };
            case 'purple': return { bg: COLORS.surface, border: COLORS.accent || COLORS.primary, text: COLORS.accent || COLORS.primary };
            case 'success': return { bg: COLORS.surface, border: COLORS.success, text: COLORS.success };
            case 'warning': return { bg: COLORS.surface, border: COLORS.warning, text: COLORS.warning };
            case 'error': return { bg: COLORS.surface, border: COLORS.error, text: COLORS.error };
            case 'neutral':
            default: return { bg: COLORS.surface, border: COLORS.border, text: COLORS.textSecondary };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return {
                    paddingHorizontal: SPACING.sm,
                    paddingVertical: 2,
                    fontSize: 10,
                    height: 20,
                };
            case 'lg':
                return {
                    paddingHorizontal: SPACING.md,
                    paddingVertical: 6,
                    fontSize: FONT_SIZES.md,
                    height: 32,
                };
            default:
                return {
                    paddingHorizontal: SPACING.md - 4,
                    paddingVertical: 4,
                    fontSize: FONT_SIZES.sm,
                    height: 24,
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
        borderRadius: BORDER_RADIUS.sm, // Sharp badge
        borderWidth: 1,
    },
    pulseIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    text: {
        fontWeight: FONT_WEIGHTS.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

export default GlowingBadge;
