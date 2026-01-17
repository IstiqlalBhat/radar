import React, { useState } from 'react';
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
} from '../constants/theme';

type IconButtonVariant = 'glass' | 'brutal' | 'ghost' | 'glow';
type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconButtonProps {
    icon: React.ReactNode;
    onPress: () => void;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    glowColor?: 'cyan' | 'pink' | 'yellow' | 'purple'; // Keeping prop for API compatibility but mapping to new theme
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onPress,
    variant = 'glsass', // Fallback will be handled
    size = 'md',
    glowColor = 'cyan',
    disabled = false,
    style,
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const getSize = (): number => {
        switch (size) {
            case 'sm': return 36;
            case 'lg': return 56;
            case 'xl': return 72;
            default: return 44;
        }
    };

    const sizeValue = getSize();

    // Map legacy variants to new style
    // 'glass' -> 'outline' or 'solid' (minimal)
    // 'brutal' -> 'brutal' (solid with hard shadow)

    return (
        <View style={[styles.wrapper, style]}>
            {/* Hard Shadow for 'brutal' or legacy 'glass' which we make 'solid' */}
            <View
                style={[
                    styles.shadow,
                    {
                        width: sizeValue,
                        height: sizeValue,
                        borderRadius: BORDER_RADIUS.sm,
                        opacity: isPressed ? 0.5 : 1,
                        backgroundColor: COLORS.borderHighlight || '#000',
                    },
                ]}
            />

            <Pressable
                onPress={onPress}
                disabled={disabled}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={[
                    styles.button,
                    {
                        width: sizeValue,
                        height: sizeValue,
                        borderRadius: BORDER_RADIUS.sm,
                        backgroundColor: variant === 'ghost' ? 'transparent' : COLORS.surface,
                        borderWidth: variant === 'ghost' ? 0 : 1,
                        borderColor: COLORS.border,
                        transform: isPressed ? [{ translateX: 2 }, { translateY: 2 }] : [],
                    },
                ]}
            >
                <View style={styles.iconContainer}>{icon}</View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    shadow: {
        position: 'absolute',
        top: 3,
        left: 3,
        zIndex: 0,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default IconButton;
