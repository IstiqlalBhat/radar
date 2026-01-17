import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    StyleProp,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    COLORS,
    BORDER_RADIUS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
    SHADOWS,
} from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GlowButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const NeoBrutalButton: React.FC<GlowButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    style,
    textStyle,
    icon,
    iconPosition = 'left',
}) => {
    const getGradientColors = (): [string, string] => {
        switch (variant) {
            case 'primary': return [COLORS.primary, COLORS.accent];
            case 'secondary': return [COLORS.secondary, COLORS.primary];
            case 'accent': return [COLORS.accent, COLORS.secondary];
            default: return [COLORS.primary, COLORS.accent];
        }
    };

    const getBackgroundColor = (): string => {
        if (disabled) return COLORS.surfaceLight;
        switch (variant) {
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return COLORS.primary;
        }
    };

    const getTextColor = (): string => {
        if (disabled) return COLORS.textDisabled;
        switch (variant) {
            case 'primary':
            case 'secondary':
            case 'accent':
                return COLORS.textInverse;
            case 'outline':
                return COLORS.primary;
            case 'ghost':
                return COLORS.textPrimary;
            default:
                return COLORS.textInverse;
        }
    };

    const getBorderColor = (): string => {
        if (disabled) return COLORS.border;
        switch (variant) {
            case 'outline': return COLORS.primary;
            case 'ghost': return 'transparent';
            default: return 'transparent';
        }
    };

    const getGlowStyle = () => {
        if (variant === 'outline' || variant === 'ghost' || disabled) return {};
        return SHADOWS.glow;
    };

    const getSizeStyles = (): { padding: ViewStyle; fontSize: number } => {
        switch (size) {
            case 'sm':
                return {
                    padding: { paddingHorizontal: SPACING.md, paddingVertical: 10 },
                    fontSize: FONT_SIZES.sm,
                };
            case 'lg':
                return {
                    padding: { paddingHorizontal: SPACING.xl, paddingVertical: 16 },
                    fontSize: FONT_SIZES.lg,
                };
            default:
                return {
                    padding: { paddingHorizontal: SPACING.lg, paddingVertical: 12 },
                    fontSize: FONT_SIZES.md,
                };
        }
    };

    const sizeStyles = getSizeStyles();
    const isGradient = variant === 'primary' || variant === 'secondary' || variant === 'accent';

    const buttonContent = (
        <>
            {icon && iconPosition === 'left' && (
                <View style={styles.iconLeft}>{icon}</View>
            )}
            <Text
                style={[
                    styles.text,
                    {
                        color: getTextColor(),
                        fontSize: sizeStyles.fontSize,
                    },
                    textStyle,
                ]}
            >
                {title}
            </Text>
            {icon && iconPosition === 'right' && (
                <View style={styles.iconRight}>{icon}</View>
            )}
        </>
    );

    if (isGradient && !disabled) {
        return (
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.wrapper,
                    fullWidth && styles.fullWidth,
                    getGlowStyle(),
                    pressed && { transform: [{ scale: 0.96 }] },
                    style,
                ]}
            >
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.button,
                        sizeStyles.padding,
                    ]}
                >
                    {buttonContent}
                </LinearGradient>
            </Pressable>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.wrapper,
                styles.button,
                fullWidth && styles.fullWidth,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outline' ? 1 : 0,
                },
                sizeStyles.padding,
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
                disabled && { opacity: 0.5 },
                style,
            ]}
        >
            {buttonContent}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
    },
    fullWidth: {
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.full,
    },
    text: {
        fontWeight: FONT_WEIGHTS.bold,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    iconLeft: {
        marginRight: SPACING.sm,
    },
    iconRight: {
        marginLeft: SPACING.sm,
    },
});

export default NeoBrutalButton;
