import React, { useState } from 'react';
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
} from '../constants/theme';

type AccentColor = 'cyan' | 'pink' | 'yellow' | 'purple' | 'none';

interface HybridCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    accentColor?: AccentColor;
    accentPosition?: 'left' | 'top' | 'right' | 'bottom';
    disabled?: boolean;
    showShadow?: boolean;
}

export const HybridCard: React.FC<HybridCardProps> = ({
    children,
    style,
    onPress,
    accentColor = 'cyan',
    accentPosition = 'left',
    disabled = false,
    showShadow = true,
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const getAccentColorValue = (): string => {
        switch (accentColor) {
            case 'cyan':
                return COLORS.primary;
            case 'pink':
                return COLORS.secondary;
            case 'yellow':
                return COLORS.warning;
            case 'purple':
                return COLORS.accent || COLORS.primary; // Fallback
            default:
                return 'transparent';
        }
    };

    const getAccentStyle = (): ViewStyle => {
        const color = getAccentColorValue();
        if (accentColor === 'none') return {};

        const baseStyle: ViewStyle = {
            position: 'absolute',
            backgroundColor: color,
        };

        switch (accentPosition) {
            case 'left':
                return { ...baseStyle, left: 0, top: 0, bottom: 0, width: 4 };
            case 'top':
                return { ...baseStyle, left: 0, right: 0, top: 0, height: 4 };
            case 'right':
                return { ...baseStyle, right: 0, top: 0, bottom: 0, width: 4 };
            case 'bottom':
                return { ...baseStyle, left: 0, right: 0, bottom: 0, height: 4 };
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
            <View style={[styles.wrapper, style]}>
                {showShadow && (
                    <View
                        style={[
                            styles.shadow,
                            {
                                backgroundColor: COLORS.borderHighlight || '#000',
                            },
                        ]}
                    />
                )}
                <Pressable
                    onPress={onPress}
                    disabled={disabled}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    style={[
                        styles.container,
                        isPressed && {
                            transform: [
                                { translateX: 2 },
                                { translateY: 2 },
                            ],
                        },
                    ]}
                >
                    {content}
                </Pressable>
            </View>
        );
    }

    return (
        <View style={[styles.wrapper, style]}>
            {showShadow && (
                <View
                    style={[
                        styles.shadow,
                        {
                            backgroundColor: COLORS.borderHighlight || '#000',
                        },
                    ]}
                />
            )}
            <View style={styles.container}>{content}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    shadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: 0,
        bottom: 0,
        borderRadius: BORDER_RADIUS.sm,
        zIndex: 0,
    },
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
        zIndex: 1,
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
