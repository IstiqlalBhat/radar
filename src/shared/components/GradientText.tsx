import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import {
    COLORS,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '../constants/theme';

type GradientPreset = 'cyan' | 'pink' | 'rainbow' | 'sunset' | 'ocean' | 'neon';
type TextSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'display' | 'hero';

interface GradientTextProps {
    text: string;
    preset?: GradientPreset;
    size?: TextSize;
    weight?: keyof typeof FONT_WEIGHTS;
    style?: StyleProp<TextStyle>;
    uppercase?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
    text,
    preset = 'cyan',
    size = 'xl',
    weight = 'bold',
    style,
    uppercase = false,
}) => {
    const getMainColor = (): string => {
        switch (preset) {
            case 'cyan':
                return COLORS.primary;
            case 'pink':
                return COLORS.secondary;
            case 'rainbow':
                return COLORS.primary;
            case 'sunset':
                return COLORS.secondary;
            case 'ocean':
                return COLORS.primary;
            case 'neon':
                return COLORS.accent;
            default:
                return COLORS.primary;
        }
    };

    return (
        <Text
            style={[
                styles.text,
                {
                    fontSize: FONT_SIZES[size],
                    fontWeight: FONT_WEIGHTS[weight],
                    color: getMainColor(),
                    textShadowColor: getMainColor(),
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                },
                uppercase && styles.uppercase,
                style,
            ]}
        >
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    },
    uppercase: {
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
});

export default GradientText;
