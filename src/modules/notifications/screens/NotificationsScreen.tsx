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

import {
    COLORS,
    SPACING,
    FONT_SIZES,
    FONT_WEIGHTS,
    BORDER_RADIUS,
    SHADOWS,
} from '@shared/constants/theme';

type NotificationType = 'upvote' | 'comment' | 'mention' | 'trending' | 'nearby';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    bubbleName?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'trending',
        title: 'Your post is trending!',
        message: 'Your post in Cooper Library has 50+ upvotes',
        timestamp: '2m ago',
        read: false,
        bubbleName: 'Cooper Library',
    },
    {
        id: '2',
        type: 'comment',
        title: 'New comment',
        message: 'Someone replied to your post about finals',
        timestamp: '15m ago',
        read: false,
        bubbleName: 'Cooper Library',
    },
    {
        id: '3',
        type: 'nearby',
        title: 'Hot bubble nearby!',
        message: 'Hendrix Student Center is buzzing with 200+ people',
        timestamp: '32m ago',
        read: true,
        bubbleName: 'Hendrix Student Center',
    },
    {
        id: '4',
        type: 'upvote',
        title: '25 new upvotes',
        message: 'Your sunset post is getting love',
        timestamp: '1h ago',
        read: true,
        bubbleName: 'Bowman Field',
    },
    {
        id: '5',
        type: 'mention',
        title: 'You were mentioned',
        message: 'Someone mentioned you in a post at Fike',
        timestamp: '2h ago',
        read: true,
        bubbleName: 'Fike Recreation Center',
    },
];

const getNotificationIcon = (type: NotificationType): string => {
    switch (type) {
        case 'upvote': return '▲';
        case 'comment': return '💬';
        case 'mention': return '@';
        case 'trending': return '🔥';
        case 'nearby': return '📍';
        default: return '•';
    }
};

const getNotificationColor = (type: NotificationType): string => {
    switch (type) {
        case 'upvote': return COLORS.success;
        case 'comment': return COLORS.primary;
        case 'mention': return COLORS.accent;
        case 'trending': return COLORS.warning;
        case 'nearby': return COLORS.secondary;
        default: return COLORS.textSecondary;
    }
};

interface NotificationCardProps {
    notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const color = getNotificationColor(notification.type);
    const icon = getNotificationIcon(notification.type);

    return (
        <Pressable style={({ pressed }) => [
            styles.notificationCard,
            !notification.read && styles.notificationCardUnread,
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }
        ]}>
            {/* Glowing border accent */}
            <View style={[styles.glowBorder, { backgroundColor: color }]} />

            <View style={styles.notificationContent}>
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <Text style={[styles.iconText, { color }]}>{icon}</Text>
                </View>
                <View style={styles.textContent}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, !notification.read && styles.titleUnread]}>
                            {notification.title}
                        </Text>
                        {!notification.read && (
                            <View style={[styles.unreadDot, { backgroundColor: color, ...SHADOWS.glow }]} />
                        )}
                    </View>
                    <Text style={styles.message}>{notification.message}</Text>
                    <View style={styles.metaRow}>
                        {notification.bubbleName && (
                            <View style={[styles.bubbleTag, { borderColor: color + '40' }]}>
                                <Text style={[styles.bubbleTagText, { color }]}>{notification.bubbleName}</Text>
                            </View>
                        )}
                        <Text style={styles.timestamp}>{notification.timestamp}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export const NotificationsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'mentions' | 'activity'>('all');

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRefreshing(false);
    }, []);

    const filteredNotifications = MOCK_NOTIFICATIONS.filter((n) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'mentions') return n.type === 'mention';
        return n.type === 'upvote' || n.type === 'comment' || n.type === 'trending';
    });

    const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

    return (
        <View style={styles.container}>
            {/* Floating Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <BlurView intensity={60} tint="dark" style={styles.headerBlur}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTitleRow}>
                            <Text style={styles.headerTitle}>ALERTS</Text>
                            {unreadCount > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.headerSubtitle}>Stay in the loop</Text>
                    </View>

                    {/* Tab Bar */}
                    <View style={styles.tabsContainer}>
                        {(['all', 'mentions', 'activity'] as const).map((tab) => (
                            <Pressable
                                key={tab}
                                style={[
                                    styles.tab,
                                    activeTab === tab && styles.tabActive
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </BlurView>
            </View>

            <ScrollView
                style={styles.list}
                contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 130, paddingBottom: insets.bottom + 120 }]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                        progressViewOffset={insets.top + 130}
                    />
                }
            >
                {filteredNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    // Header
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
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
        backgroundColor: COLORS.glass,
    },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.black, color: COLORS.textPrimary, letterSpacing: 2 },
    unreadBadge: {
        marginLeft: SPACING.sm,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: BORDER_RADIUS.full,
        ...SHADOWS.glowSecondary,
    },
    unreadBadgeText: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary },
    headerSubtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
        gap: SPACING.sm,
        backgroundColor: COLORS.glass,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tabActive: {
        backgroundColor: COLORS.primaryGlow,
        borderColor: COLORS.primary,
    },
    tabText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.medium, color: COLORS.textMuted },
    tabTextActive: { color: COLORS.primary, fontWeight: FONT_WEIGHTS.bold },

    // List
    list: { flex: 1 },
    listContent: { paddingTop: SPACING.md },

    // Notification Card
    notificationCard: {
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    notificationCardUnread: {
        backgroundColor: COLORS.surfaceGlow,
        borderColor: COLORS.borderHighlight,
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
    notificationContent: {
        flexDirection: 'row',
        padding: SPACING.md,
        paddingLeft: SPACING.lg,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    iconText: { fontSize: 18, fontWeight: FONT_WEIGHTS.bold },
    textContent: { flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    title: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium, color: COLORS.textSecondary, flex: 1 },
    titleUnread: { color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.bold },
    unreadDot: { width: 8, height: 8, borderRadius: BORDER_RADIUS.full, marginLeft: SPACING.sm },
    message: { fontSize: FONT_SIZES.sm, color: COLORS.textMuted, marginBottom: SPACING.sm, lineHeight: 20 },
    metaRow: { flexDirection: 'row', alignItems: 'center' },
    bubbleTag: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.sm,
    },
    bubbleTagText: { fontSize: 10, fontWeight: FONT_WEIGHTS.semibold },
    timestamp: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
});

export default NotificationsScreen;
