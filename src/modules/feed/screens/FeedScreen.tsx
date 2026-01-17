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

import {
    COLORS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
    BORDER_RADIUS,
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

const PostCard = ({ post, index }: { post: any; index: number }) => {
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

    return (
        <View style={styles.postWrapper}>
            {/* Hard Shadow Background */}
            <View style={styles.postShadow} />

            <View style={styles.postCard}>
                {/* Accent Stripe */}
                <View style={[styles.accentStripe, { backgroundColor: index % 2 === 0 ? COLORS.primary : COLORS.secondary }]} />

                <View style={styles.postContent}>
                    {/* Header */}
                    <View style={styles.postHeader}>
                        <View style={styles.bubbleBadge}>
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
                                userVote === 'up' && { backgroundColor: COLORS.success + '20', borderColor: COLORS.success }, // 20% opacity hex
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
                                userVote === 'down' && { backgroundColor: COLORS.error + '20', borderColor: COLORS.error },
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
            </View>
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
            {/* Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>LIVE FEED</Text>
                        <Text style={styles.headerSubtitle}>
                            What's happening nearby
                        </Text>
                    </View>
                    <Pressable style={styles.filterButton}>
                        <Text style={styles.filterIcon}>⚡</Text>
                    </Pressable>
                </View>
            </View>

            {/* Feed */}
            <ScrollView
                style={styles.feed}
                contentContainerStyle={[
                    styles.feedContent,
                    { paddingBottom: insets.bottom + 100 },
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                        colors={[COLORS.primary]}
                    />
                }
            >
                {MOCK_POSTS.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </ScrollView>

            {/* FAB for new post */}
            <View style={[styles.fabContainer, { bottom: insets.bottom + 100 }]}>
                <View style={styles.fabShadow} />
                <Pressable style={styles.fab}>
                    <Text style={styles.fabIcon}>+</Text>
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
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 100,
        // Hard shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.black,
        color: COLORS.textPrimary,
        letterSpacing: 1,
    },
    headerSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: 18,
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
        position: 'relative',
    },
    postShadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: 0,
        bottom: 0,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.borderHighlight,
        zIndex: 0,
    },
    postCard: {
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
        zIndex: 1,
    },
    accentStripe: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 4,
    },
    postContent: {
        padding: SPACING.md,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    bubbleBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1,
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
    },
    bubbleName: {
        fontSize: 11,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textSecondary,
    },
    timestamp: {
        fontSize: 11,
        color: COLORS.textSecondary,
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
        paddingHorizontal: SPACING.sm,
        paddingVertical: 6,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.sm,
    },
    voteIcon: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginRight: 4,
    },
    voteCount: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textSecondary,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 6,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },
    commentIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    commentCount: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    shareButton: {
        width: 34,
        height: 34,
        borderRadius: BORDER_RADIUS.sm,
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
        right: SPACING.md,
    },
    fabShadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.md, // Square-ish
        backgroundColor: '#000',
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.md, // Square-ish
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    fabIcon: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default FeedScreen;
