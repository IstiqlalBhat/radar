import React, { useState } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    StyleProp,
    View,
} from 'react-native';
import {
    COLORS,
    BORDER_RADIUS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface NeoBrutalButtonProps {
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

export const NeoBrutalButton: React.FC<NeoBrutalButtonProps> = ({
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
    const [isPressed, setIsPressed] = useState(false);

    const getBackgroundColor = (): string => {
        if (disabled) return COLORS.surfaceLight;
        switch (variant) {
            case 'primary':
                return COLORS.primary;
            case 'secondary':
                return COLORS.secondary;
            case 'accent':
                return COLORS.accent;
            case 'outline':
            case 'ghost':
                return 'transparent';
            default:
                return COLORS.primary;
        }
    };

    const getTextColor = (): string => {
        if (disabled) return COLORS.textDisabled;
        switch (variant) {
            case 'primary':
            case 'secondary':
                return COLORS.brutalBlack;
            case 'accent':
                return COLORS.brutalBlack;
            case 'outline':
                return COLORS.primary;
            case 'ghost':
                return COLORS.textPrimary;
            default:
                return COLORS.brutalBlack;
        }
    };

    const getBorderColor = (): string => {
        if (disabled) return COLORS.textDisabled;
        switch (variant) {
            case 'outline':
                return COLORS.primary;
            case 'ghost':
                return 'transparent';
            default:
                return COLORS.brutalBlack;
        }
    };

    const getShadowColor = (): string => {
        switch (variant) {
            case 'primary':
                return COLORS.primaryDark;
            case 'secondary':
                return COLORS.secondaryDark;
            case 'accent':
                return '#B8CC00';
            default:
                return COLORS.brutalBlack;
        }
    };

    const getSizeStyles = (): { padding: ViewStyle; fontSize: number } => {
        switch (size) {
            case 'sm':
                return {
                    padding: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
                    fontSize: FONT_SIZES.sm,
                };
            case 'lg':
                return {
                    padding: { paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md },
                    fontSize: FONT_SIZES.lg,
                };
            default:
                return {
                    padding: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md - 4 },
                    fontSize: FONT_SIZES.md,
                };
        }
    };

    const sizeStyles = getSizeStyles();

    return (
        <View style={[styles.wrapper, fullWidth && styles.fullWidth]}>
            {/* Shadow layer */}
            <View
                style={[
                    styles.shadow,
                    {
                        backgroundColor: getShadowColor(),
                        borderRadius: BORDER_RADIUS.md,
                        opacity: isPressed ? 0 : 1,
                    },
                ]}
            />
            {/* Button layer */}
            <Pressable
                onPress={onPress}
                disabled={disabled}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={[
                    styles.button,
                    {
                        backgroundColor: getBackgroundColor(),
                        borderColor: getBorderColor(),
                        borderRadius: BORDER_RADIUS.md,
                        transform: isPressed ? [{ translateX: 4 }, { translateY: 4 }] : [],
                    },
                    sizeStyles.padding,
                    style,
                ]}
            >
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
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    fullWidth: {
        width: '100%',
    },
    shadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: -4,
        bottom: -4,
        borderRadius: BORDER_RADIUS.md,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        zIndex: 1,
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
