import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import {
    COLORS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
    BORDER_RADIUS,
    SHADOWS,
} from '@shared/constants/theme';

// Mock posts data
const MOCK_POSTS = [
    {
        id: '1',
        content: 'Anyone else stuck in Cooper Library studying for finals? The third floor is PACKED right now',
        bubbleName: 'Cooper Library',
        bubbleType: 'library',
        timestamp: '2m ago',
        upvotes: 47,
        downvotes: 3,
        comments: 12,
        hotScore: 94,
    },
    {
        id: '2',
        content: 'The new chicken sandwich at Hendrix is actually fire. 10/10 would recommend',
        bubbleName: 'Hendrix Student Center',
        bubbleType: 'dining',
        timestamp: '8m ago',
        upvotes: 89,
        downvotes: 5,
        comments: 23,
        hotScore: 88,
    },
    {
        id: '3',
        content: 'Beautiful sunset from Bowman Field rn. Sometimes I forget how nice this campus is',
        bubbleName: 'Bowman Field',
        bubbleType: 'outdoor',
        timestamp: '15m ago',
        upvotes: 156,
        downvotes: 2,
        comments: 45,
        hotScore: 76,
    },
    {
        id: '4',
        content: 'Does anyone know if Fike is crowded right now?',
        bubbleName: 'Fike Recreation',
        bubbleType: 'recreation',
        timestamp: '22m ago',
        upvotes: 12,
        downvotes: 0,
        comments: 8,
        hotScore: 45,
    },
];

const getAccentColor = (index: number): string => {
    const colors = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.success];
    return colors[index % colors.length];
};

const PostCard = ({ post, index }: { post: any; index: number }) => {
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
    const accentColor = getAccentColor(index);

    return (
        <View style={styles.postWrapper}>
            <Pressable style={({ pressed }) => [
                styles.postCard,
                pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }
            ]}>
                {/* Glowing accent border */}
                <View style={[styles.glowBorder, { backgroundColor: accentColor }]} />

                <View style={styles.postContent}>
                    {/* Header */}
                    <View style={styles.postHeader}>
                        <View style={[styles.bubbleBadge, { borderColor: accentColor }]}>
                            <View style={[styles.bubbleDot, { backgroundColor: accentColor }]} />
                            <Text style={styles.bubbleName}>{post.bubbleName}</Text>
                        </View>
                        <Text style={styles.timestamp}>{post.timestamp}</Text>
                    </View>

                    {/* Content */}
                    <Text style={styles.postText}>{post.content}</Text>

                    {/* Actions */}
                    <View style={styles.postActions}>
                        {/* Vote Buttons */}
                        <Pressable
                            style={[
                                styles.voteButton,
                                userVote === 'up' && styles.voteButtonActive,
                                userVote === 'up' && { borderColor: COLORS.success },
                            ]}
                            onPress={() => setUserVote(userVote === 'up' ? null : 'up')}
                        >
                            <Text
                                style={[
                                    styles.voteIcon,
                                    userVote === 'up' && { color: COLORS.success },
                                ]}
                            >
                                ▲
                            </Text>
                            <Text
                                style={[
                                    styles.voteCount,
                                    userVote === 'up' && { color: COLORS.success },
                                ]}
                            >
                                {post.upvotes + (userVote === 'up' ? 1 : 0)}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.voteButton,
                                userVote === 'down' && styles.voteButtonActive,
                                userVote === 'down' && { borderColor: COLORS.error },
                            ]}
                            onPress={() => setUserVote(userVote === 'down' ? null : 'down')}
                        >
                            <Text
                                style={[
                                    styles.voteIcon,
                                    userVote === 'down' && { color: COLORS.error },
                                ]}
                            >
                                ▼
                            </Text>
                        </Pressable>

                        {/* Comments */}
                        <View style={styles.commentButton}>
                            <Text style={styles.commentIcon}>💬</Text>
                            <Text style={styles.commentCount}>{post.comments}</Text>
                        </View>

                        {/* Share */}
                        <Pressable style={styles.shareButton}>
                            <Text style={styles.shareIcon}>↗</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export const FeedScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            {/* Floating Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <BlurView intensity={60} tint="dark" style={styles.headerBlur}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.headerTitle}>LIVE FEED</Text>
                            <Text style={styles.headerSubtitle}>
                                What's happening nearby
                            </Text>
                        </View>
                        <Pressable style={styles.filterButton}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.accent]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.filterGradient}
                            >
                                <Text style={styles.filterIcon}>⚡</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                </BlurView>
            </View>

            {/* Feed */}
            <ScrollView
                style={styles.feed}
                contentContainerStyle={[
                    styles.feedContent,
                    { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 120 },
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                        colors={[COLORS.primary]}
                        progressViewOffset={insets.top + 80}
                    />
                }
            >
                {MOCK_POSTS.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </ScrollView>

            {/* FAB for new post */}
            <View style={[styles.fabContainer, { bottom: insets.bottom + 100 }]}>
                <Pressable style={({ pressed }) => [
                    styles.fab,
                    pressed && { transform: [{ scale: 0.9 }] }
                ]}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.fabGradient}
                    >
                        <Text style={styles.fabIcon}>+</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    headerBlur: {
        overflow: 'hidden',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.glass,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.black,
        color: COLORS.textPrimary,
        letterSpacing: 2,
    },
    headerSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    filterButton: {
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden',
    },
    filterGradient: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: 20,
    },
    feed: {
        flex: 1,
    },
    feedContent: {
        paddingTop: SPACING.md,
    },

    // Post Card Styles
    postWrapper: {
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    postCard: {
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
    postContent: {
        padding: SPACING.md,
        paddingLeft: SPACING.lg,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    bubbleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 6,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        backgroundColor: COLORS.surface,
    },
    bubbleDot: {
        width: 6,
        height: 6,
        borderRadius: BORDER_RADIUS.full,
        marginRight: 6,
    },
    bubbleName: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textSecondary,
    },
    timestamp: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textMuted,
    },
    postText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textPrimary,
        lineHeight: 22,
        marginBottom: SPACING.md,
    },
    postActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    voteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.sm,
    },
    voteButtonActive: {
        backgroundColor: COLORS.surfaceGlow,
    },
    voteIcon: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginRight: 6,
    },
    voteCount: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textSecondary,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },
    commentIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    commentCount: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    shareButton: {
        width: 38,
        height: 38,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    shareIcon: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },

    // FAB Styles
    fabContainer: {
        position: 'absolute',
        right: SPACING.lg,
    },
    fab: {
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
        ...SHADOWS.glow,
    },
    fabGradient: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: {
        fontSize: 32,
        color: COLORS.textInverse,
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default FeedScreen;
