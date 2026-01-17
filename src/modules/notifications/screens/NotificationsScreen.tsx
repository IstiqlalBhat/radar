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
        case 'trending': return COLORS.warning; // Changed for consistent theme
        case 'nearby': return COLORS.secondary;
        default: return COLORS.textSecondary;
    }
};

interface NotificationCardProps {
    notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const [isPressed, setIsPressed] = useState(false);
    const color = getNotificationColor(notification.type);
    const icon = getNotificationIcon(notification.type);

    return (
        <View style={styles.notificationWrapper}>
            <View style={[styles.notificationShadow, { backgroundColor: COLORS.borderHighlight }]} />
            <Pressable
                style={[
                    styles.notificationCard,
                    isPressed && { transform: [{ translateX: 2 }, { translateY: 2 }] },
                    !notification.read && { backgroundColor: COLORS.surfaceLight }
                ]}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <View style={[styles.accentStripe, { backgroundColor: color }]} />
                <View style={styles.notificationContent}>
                    <View style={[styles.iconContainer, { borderColor: color, backgroundColor: COLORS.surface }]}>
                        <Text style={[styles.iconText, { color }]}>{icon}</Text>
                    </View>
                    <View style={styles.textContent}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.title, !notification.read && styles.titleUnread]}>
                                {notification.title}
                            </Text>
                            {!notification.read && <View style={[styles.unreadDot, { backgroundColor: color }]} />}
                        </View>
                        <Text style={styles.message}>{notification.message}</Text>
                        <View style={styles.metaRow}>
                            {notification.bubbleName && (
                                <View style={[styles.bubbleTag, { borderColor: color }]}>
                                    <Text style={[styles.bubbleTagText, { color }]}>{notification.bubbleName}</Text>
                                </View>
                            )}
                            <Text style={styles.timestamp}>{notification.timestamp}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
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
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
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
            </View>

            <ScrollView
                style={styles.list}
                contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 120 }]}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
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
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 4,
    },
    headerContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.black, color: COLORS.textPrimary, letterSpacing: 1 },
    unreadBadge: { marginLeft: SPACING.sm, backgroundColor: COLORS.secondary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.border },
    unreadBadgeText: { fontSize: 10, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary },
    headerSubtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
    tabsContainer: { flexDirection: 'row', paddingHorizontal: SPACING.md, paddingBottom: SPACING.md, gap: SPACING.sm },
    tab: { paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surfaceLight, borderWidth: 1, borderColor: COLORS.border },
    tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.border, borderWidth: 1 },
    tabText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textSecondary },
    tabTextActive: { color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.bold },
    list: { flex: 1, paddingTop: 160 },
    listContent: { paddingTop: SPACING.md },
    notificationWrapper: { marginHorizontal: SPACING.md, marginBottom: SPACING.md, position: 'relative' },
    notificationShadow: { position: 'absolute', top: 4, left: 4, right: 0, bottom: 0, borderRadius: BORDER_RADIUS.sm, zIndex: 0 },
    notificationCard: { borderRadius: BORDER_RADIUS.sm, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, zIndex: 1 },
    accentStripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
    notificationContent: { flexDirection: 'row', padding: SPACING.md, paddingLeft: SPACING.md + 4 },
    iconContainer: { width: 40, height: 40, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
    iconText: { fontSize: 18, fontWeight: FONT_WEIGHTS.bold },
    textContent: { flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    title: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textSecondary, flex: 1 },
    titleUnread: { color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.bold },
    unreadDot: { width: 8, height: 8, borderRadius: 4, marginLeft: SPACING.sm },
    message: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
    metaRow: { flexDirection: 'row', alignItems: 'center' },
    bubbleTag: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, backgroundColor: COLORS.surface, marginRight: SPACING.sm },
    bubbleTagText: { fontSize: 10, fontWeight: FONT_WEIGHTS.bold },
    timestamp: { fontSize: 10, color: COLORS.textSecondary },
});

export default NotificationsScreen;
