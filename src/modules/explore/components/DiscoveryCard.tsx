import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '@shared/constants/theme';
import type { Bubble, BubbleType } from '@modules/bubble/types/bubble.types';

interface DiscoveryCardProps {
    bubble: Bubble;
    onPress: (bubble: Bubble) => void;
    distance?: number;
    rank?: number;
}

const BUBBLE_TYPE_ICONS: Record<BubbleType, string> = {
    classroom: '📚', library: '📖', dorm: '🏠', dining: '🍽️',
    outdoor: '🌳', recreation: '🎮', parking: '🚗', other: '📍',
};

const BUBBLE_TYPE_LABELS: Record<BubbleType, string> = {
    classroom: 'Classroom', library: 'Library', dorm: 'Dorm', dining: 'Dining',
    outdoor: 'Outdoor', recreation: 'Recreation', parking: 'Parking', other: 'Other',
};

const getActivityLabel = (activeUsers: number): string => {
    if (activeUsers >= 100) return 'BLAZING';
    if (activeUsers >= 50) return 'HOT';
    if (activeUsers >= 20) return 'ACTIVE';
    if (activeUsers >= 5) return 'WARM';
    return 'QUIET';
};

const getActivityColor = (hotScore: number): string => {
    if (hotScore >= 75) return COLORS.error;
    if (hotScore >= 50) return COLORS.warning;
    if (hotScore >= 25) return COLORS.primary;
    return COLORS.textMuted;
};

const formatDistance = (meters?: number): string => {
    if (!meters) return '';
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
};

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ bubble, onPress, distance, rank }) => {
    const activityColor = getActivityColor(bubble.hotScore);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }
            ]}
            onPress={() => onPress(bubble)}
        >
            {/* Glowing accent border */}
            <View style={[styles.glowBorder, { backgroundColor: activityColor }]} />

            {/* Rank badge */}
            {rank && rank <= 3 && (
                <View style={[styles.rankBadge, { backgroundColor: activityColor + '20', borderColor: activityColor }]}>
                    <Text style={[styles.rankText, { color: activityColor }]}>#{rank}</Text>
                </View>
            )}

            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: activityColor + '15' }]}>
                    <Text style={styles.icon}>{BUBBLE_TYPE_ICONS[bubble.type]}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name} numberOfLines={1}>{bubble.name}</Text>
                        <View style={styles.activityBadge}>
                            <Text style={[styles.activityText, { color: activityColor }]}>
                                {getActivityLabel(bubble.activeUsers)}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.type}>{BUBBLE_TYPE_LABELS[bubble.type]}</Text>

                    <View style={styles.stats}>
                        <Text style={styles.statValue}>{bubble.activeUsers}</Text>
                        <Text style={styles.statLabel}> online</Text>

                        <View style={styles.statDivider} />

                        <Text style={styles.statValue}>{bubble.postCount}</Text>
                        <Text style={styles.statLabel}> posts</Text>

                        {distance && (
                            <>
                                <View style={styles.statDivider} />
                                <Text style={[styles.statValue, { color: COLORS.primary }]}>
                                    {formatDistance(distance)}
                                </Text>
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>→</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    glowBorder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        borderTopLeftRadius: BORDER_RADIUS.lg,
        borderBottomLeftRadius: BORDER_RADIUS.lg,
    },
    rankBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomLeftRadius: BORDER_RADIUS.md,
        borderWidth: 1,
    },
    rankText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.bold,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        paddingLeft: SPACING.lg,
    },
    iconContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    icon: { fontSize: 22 },
    content: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
    name: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginRight: SPACING.sm,
        flex: 1,
    },
    activityBadge: {},
    activityText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.bold,
        letterSpacing: 0.5,
    },
    type: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    stats: { flexDirection: 'row', alignItems: 'baseline' },
    statValue: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textSecondary },
    statLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textMuted },
    statDivider: { width: 1, height: 12, backgroundColor: COLORS.border, marginHorizontal: SPACING.sm },
    arrowContainer: { marginLeft: SPACING.sm },
    arrow: { fontSize: 18, color: COLORS.textMuted },
});

export default DiscoveryCard;
