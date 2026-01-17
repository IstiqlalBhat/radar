import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from '@shared/components/MapView';
import { COLORS, FONT_WEIGHTS, BORDER_RADIUS } from '@shared/constants/theme';
import type { Bubble } from '@modules/bubble/types/bubble.types';

interface BubbleMarkerProps {
    bubble: Bubble;
    onPress: (bubble: Bubble) => void;
}

const getBubbleColor = (hotScore: number): string => {
    if (hotScore >= 75) return COLORS.error; // Hot
    if (hotScore >= 50) return COLORS.warning; // Active
    if (hotScore >= 25) return COLORS.primary; // Normal
    return COLORS.textMuted; // Quiet
};

const getBubbleSize = (activeUsers: number): number => {
    if (activeUsers >= 100) return 60;
    if (activeUsers >= 50) return 52;
    if (activeUsers >= 20) return 44;
    return 36;
};

export const BubbleMarker: React.FC<BubbleMarkerProps> = ({ bubble, onPress }) => {
    const color = getBubbleColor(bubble.hotScore);
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
                {/* Minimalist Sharp Marker */}
                <View
                    style={[
                        styles.markerBody,
                        {
                            width: size,
                            height: size,
                            backgroundColor: COLORS.surface,
                            borderColor: color,
                        },
                    ]}
                >
                    <Text style={[styles.countText, { color: color }]}>
                        {bubble.activeUsers > 99 ? '99+' : bubble.activeUsers}
                    </Text>
                </View>

                {/* Hot Indicator Dot */}
                {bubble.hotScore >= 75 && (
                    <View style={[styles.hotDot, { backgroundColor: COLORS.error }]} />
                )}
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // Hard sharp shadow
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    markerBody: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: BORDER_RADIUS.sm, // Sharp edges
    },
    countText: {
        fontSize: 12,
        fontWeight: FONT_WEIGHTS.bold,
    },
    hotDot: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 10,
        height: 10,
        borderRadius: 0, // Square dot
        borderWidth: 1,
        borderColor: COLORS.surface,
    },
});

export default BubbleMarker;
