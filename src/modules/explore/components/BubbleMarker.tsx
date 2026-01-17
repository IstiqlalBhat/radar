import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from '@shared/components/MapView';
import { COLORS, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '@shared/constants/theme';
import type { Bubble } from '@modules/bubble/types/bubble.types';

interface BubbleMarkerProps {
    bubble: Bubble;
    onPress: (bubble: Bubble) => void;
}

const getBubbleColor = (hotScore: number): string => {
    if (hotScore >= 75) return COLORS.error;
    if (hotScore >= 50) return COLORS.warning;
    if (hotScore >= 25) return COLORS.primary;
    return COLORS.textMuted;
};

const getBubbleGlow = (hotScore: number): object => {
    if (hotScore >= 75) return SHADOWS.glowError;
    if (hotScore >= 50) return SHADOWS.glowWarning;
    if (hotScore >= 25) return SHADOWS.glow;
    return {};
};

const getBubbleSize = (activeUsers: number): number => {
    if (activeUsers >= 100) return 56;
    if (activeUsers >= 50) return 48;
    if (activeUsers >= 20) return 42;
    return 36;
};

export const BubbleMarker: React.FC<BubbleMarkerProps> = ({ bubble, onPress }) => {
    const color = getBubbleColor(bubble.hotScore);
    const glow = getBubbleGlow(bubble.hotScore);
    const size = getBubbleSize(bubble.activeUsers);

    return (
        <Marker
            coordinate={{
                latitude: bubble.location.latitude,
                longitude: bubble.location.longitude,
            }}
            onPress={() => onPress(bubble)}
            anchor={{ x: 0.5, y: 0.5 }}
        >
            <View style={[styles.container, { width: size, height: size }]}>
                {/* Outer glow ring */}
                <View
                    style={[
                        styles.glowRing,
                        {
                            width: size + 8,
                            height: size + 8,
                            borderColor: color,
                            ...glow,
                        },
                    ]}
                />

                {/* Main marker body */}
                <View
                    style={[
                        styles.markerBody,
                        {
                            width: size,
                            height: size,
                            backgroundColor: COLORS.surfaceLight,
                            borderColor: color,
                        },
                    ]}
                >
                    <Text style={[styles.countText, { color }]}>
                        {bubble.activeUsers > 99 ? '99+' : bubble.activeUsers}
                    </Text>
                </View>

                {/* Hot indicator pulse */}
                {bubble.hotScore >= 75 && (
                    <View style={[styles.hotPulse, { backgroundColor: COLORS.error }]} />
                )}
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowRing: {
        position: 'absolute',
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 2,
        opacity: 0.5,
    },
    markerBody: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: BORDER_RADIUS.full,
    },
    countText: {
        fontSize: 12,
        fontWeight: FONT_WEIGHTS.bold,
    },
    hotPulse: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 2,
        borderColor: COLORS.surfaceLight,
    },
});

export default BubbleMarker;
