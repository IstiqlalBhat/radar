import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    ViewStyle,
    StyleProp,
} from 'react-native';
import {
    COLORS,
    BORDER_RADIUS,
    SPACING,
    SHADOWS,
} from '../constants/theme';

type AccentColor = 'cyan' | 'pink' | 'yellow' | 'purple' | 'success' | 'none';

interface HybridCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    accentColor?: AccentColor;
    accentPosition?: 'left' | 'top' | 'right' | 'bottom';
    disabled?: boolean;
    showGlow?: boolean;
}

export const HybridCard: React.FC<HybridCardProps> = ({
    children,
    style,
    onPress,
    accentColor = 'cyan',
    accentPosition = 'left',
    disabled = false,
    showGlow = false,
}) => {
    const getAccentColorValue = (): string => {
        switch (accentColor) {
            case 'cyan': return COLORS.primary;
            case 'pink': return COLORS.secondary;
            case 'yellow': return COLORS.warning;
            case 'purple': return COLORS.accent;
            case 'success': return COLORS.success;
            default: return 'transparent';
        }
    };

    const getGlowStyle = () => {
        if (!showGlow) return {};
        const color = getAccentColorValue();
        return {
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 0,
        };
    };

    const getAccentStyle = (): ViewStyle => {
        const color = getAccentColorValue();
        if (accentColor === 'none') return {};

        const baseStyle: ViewStyle = {
            position: 'absolute',
            backgroundColor: color,
            borderRadius: 2,
        };

        switch (accentPosition) {
            case 'left':
                return { ...baseStyle, left: 0, top: SPACING.sm, bottom: SPACING.sm, width: 3 };
            case 'top':
                return { ...baseStyle, left: SPACING.sm, right: SPACING.sm, top: 0, height: 3 };
            case 'right':
                return { ...baseStyle, right: 0, top: SPACING.sm, bottom: SPACING.sm, width: 3 };
            case 'bottom':
                return { ...baseStyle, left: SPACING.sm, right: SPACING.sm, bottom: 0, height: 3 };
            default:
                return baseStyle;
        }
    };

    const content = (
        <View style={styles.contentContainer}>
            {accentColor !== 'none' && <View style={getAccentStyle()} />}
            <View style={styles.content}>{children}</View>
        </View>
    );

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.container,
                    getGlowStyle(),
                    pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
                    disabled && { opacity: 0.5 },
                    style,
                ]}
            >
                {content}
            </Pressable>
        );
    }

    return (
        <View style={[styles.container, getGlowStyle(), style]}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    contentContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        padding: SPACING.md,
    },
});

export default HybridCard;
