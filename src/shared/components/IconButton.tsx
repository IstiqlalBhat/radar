import React from 'react';
import {
    Pressable,
    StyleSheet,
    ViewStyle,
    StyleProp,
    View,
} from 'react-native';
import {
    COLORS,
    BORDER_RADIUS,
    SHADOWS,
} from '../constants/theme';

type IconButtonVariant = 'solid' | 'ghost' | 'glow';
type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconButtonProps {
    icon: React.ReactNode;
    onPress: () => void;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    glowColor?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onPress,
    variant = 'solid',
    size = 'md',
    glowColor = COLORS.primary,
    disabled = false,
    style,
}) => {
    const getSize = (): number => {
        switch (size) {
            case 'sm': return 36;
            case 'lg': return 52;
            case 'xl': return 64;
            default: return 44;
        }
    };

    const sizeValue = getSize();

    const getGlowStyle = () => {
        if (variant !== 'glow') return {};
        return {
            ...SHADOWS.glow,
            shadowColor: glowColor,
        };
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                {
                    width: sizeValue,
                    height: sizeValue,
                    backgroundColor: variant === 'ghost' ? 'transparent' : COLORS.surfaceLight,
                    borderWidth: variant === 'ghost' ? 0 : 1,
                    borderColor: variant === 'glow' ? glowColor + '40' : COLORS.border,
                    opacity: disabled ? 0.5 : 1,
                    transform: pressed ? [{ scale: 0.92 }] : [],
                },
                getGlowStyle(),
                style,
            ]}
        >
            <View style={styles.iconContainer}>{icon}</View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default IconButton;
