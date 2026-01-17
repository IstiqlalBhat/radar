import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '@shared/constants/theme';
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
    const [isPressed, setIsPressed] = useState(false);
    const activityColor = getActivityColor(bubble.hotScore);

    return (
        <View style={styles.wrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    { transform: pressed ? [{ translateX: 2 }, { translateY: 2 }] : [] },
                ]}
                onPress={() => onPress(bubble)}
            >
                {/* Accent Stripe */}
                <View style={[styles.accentStripe, { backgroundColor: activityColor }]} />

                <View style={styles.cardContent}>
                    {rank && rank <= 3 && (
                        <View style={[styles.rankBadge, { borderColor: COLORS.border }]}>
                            <Text style={styles.rankText}>#{rank}</Text>
                        </View>
                    )}

                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{BUBBLE_TYPE_ICONS[bubble.type]}</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.name} numberOfLines={1}>{bubble.name}</Text>
                            <View style={[styles.activityBadge]}>
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

                {/* Hard Shadow (simulated with border/absolute if needed, but here simple border) */}
            </Pressable>
            {/* Separate View for Hard Shadow behind */}
            <View style={styles.cardShadow} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.md,
        position: 'relative',
        height: 80, // Fixed height optimization
    },
    cardShadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.borderHighlight,
        zIndex: 0,
        borderRadius: BORDER_RADIUS.sm,
    },
    card: {
        zIndex: 1,
        flex: 1,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    accentStripe: {
        width: 4,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.sm,
    },
    rankBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: COLORS.surface,
        borderBottomLeftRadius: BORDER_RADIUS.sm,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
    },
    rankText: {
        fontSize: 10,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textSecondary
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surface,
    },
    icon: { fontSize: 20 },
    content: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
    name: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginRight: SPACING.sm,
        flex: 1,
    },
    activityBadge: {
        // minimalist, just text
    },
    activityText: {
        fontSize: 10,
        fontWeight: FONT_WEIGHTS.bold,
        letterSpacing: 0.5
    },
    type: {
        fontSize: 10,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        marginBottom: 2
    },
    stats: { flexDirection: 'row', alignItems: 'baseline' },
    statValue: { fontSize: 12, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textSecondary },
    statLabel: { fontSize: 12, color: COLORS.textMuted },
    statDivider: { width: 1, height: 10, backgroundColor: COLORS.border, marginHorizontal: SPACING.sm },
    arrowContainer: { marginLeft: SPACING.sm },
    arrow: { fontSize: 18, color: COLORS.textMuted },
});

export default DiscoveryCard;
