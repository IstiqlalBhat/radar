import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '@shared/constants/theme';

const USER_DATA = {
    anonymousId: 'radar_7x9k2m',
    trustScore: 87,
    totalPosts: 156,
    totalUpvotes: 2847,
    bubblesVisited: 34,
    joinedDate: 'October 2025',
    streak: 12,
    badges: [
        { id: '1', icon: '🔥', name: 'Hot Poster' },
        { id: '2', icon: '👀', name: 'Explorer' },
        { id: '3', icon: '⚡', name: 'Quick Draw' },
        { id: '4', icon: '💎', name: 'Diamond' },
    ],
};

const MENU_ITEMS = [
    { id: 'privacy', icon: '🔒', label: 'Privacy Settings', color: COLORS.primary },
    { id: 'notifications', icon: '🔔', label: 'Notification Preferences', color: COLORS.warning },
    { id: 'blocked', icon: '🚫', label: 'Blocked Content', color: COLORS.error },
    { id: 'data', icon: '📊', label: 'Your Data', color: COLORS.accent },
    { id: 'help', icon: '❓', label: 'Help & Support', color: COLORS.textSecondary },
    { id: 'about', icon: '📱', label: 'About Radar', color: COLORS.primary },
];

const StatCard: React.FC<{ value: string | number; label: string; color: string; gradientEnd: string }> = ({ value, label, color, gradientEnd }) => (
    <View style={styles.statWrapper}>
        <LinearGradient
            colors={[COLORS.surfaceLight, COLORS.surface]}
            style={styles.statCard}
        >
            <View style={[styles.statGlow, { backgroundColor: color }]} />
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </LinearGradient>
    </View>
);

const MenuItem: React.FC<{ item: typeof MENU_ITEMS[0] }> = ({ item }) => (
    <Pressable style={({ pressed }) => [
        styles.menuItem,
        pressed && { backgroundColor: COLORS.surfaceGlow }
    ]}>
        <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
            <Text style={styles.menuIconText}>{item.icon}</Text>
        </View>
        <Text style={styles.menuLabel}>{item.label}</Text>
        <Text style={[styles.menuArrow, { color: item.color }]}>→</Text>
    </Pressable>
);

export const ProfileScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + SPACING.lg, paddingBottom: insets.bottom + 120 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    {/* Avatar with glow ring */}
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.accent, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.avatarGlowRing}
                        >
                            <View style={styles.avatarInner}>
                                <Text style={styles.avatarText}>👤</Text>
                            </View>
                        </LinearGradient>
                        {/* Trust Badge */}
                        <View style={styles.trustBadge}>
                            <Text style={styles.trustScore}>{USER_DATA.trustScore}</Text>
                        </View>
                    </View>

                    <Text style={styles.anonymousId}>@{USER_DATA.anonymousId}</Text>

                    {/* Streak Badge */}
                    <View style={styles.streakBadge}>
                        <Text style={styles.streakIcon}>🔥</Text>
                        <Text style={styles.streakText}>{USER_DATA.streak} day streak</Text>
                    </View>

                    <Text style={styles.joinedText}>Member since {USER_DATA.joinedDate}</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard value={USER_DATA.totalPosts} label="Posts" color={COLORS.primary} gradientEnd={COLORS.accent} />
                    <StatCard value={USER_DATA.totalUpvotes.toLocaleString()} label="Upvotes" color={COLORS.success} gradientEnd={COLORS.primary} />
                    <StatCard value={USER_DATA.bubblesVisited} label="Bubbles" color={COLORS.warning} gradientEnd={COLORS.error} />
                    <StatCard value={`${USER_DATA.trustScore}%`} label="Trust" color={COLORS.secondary} gradientEnd={COLORS.accent} />
                </View>

                {/* Badges */}
                <View style={styles.badgesSection}>
                    <Text style={styles.sectionTitle}>BADGES</Text>
                    <View style={styles.badgesContainer}>
                        {USER_DATA.badges.map((badge) => (
                            <View key={badge.id} style={styles.badge}>
                                <View style={styles.badgeIcon}>
                                    <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                                </View>
                                <Text style={styles.badgeName}>{badge.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Settings */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>SETTINGS</Text>
                    <View style={styles.menuContainer}>
                        {MENU_ITEMS.map((item) => <MenuItem key={item.id} item={item} />)}
                    </View>
                </View>

                {/* Logout */}
                <Pressable style={({ pressed }) => [
                    styles.logoutButton,
                    pressed && { transform: [{ scale: 0.98 }] }
                ]}>
                    <LinearGradient
                        colors={[COLORS.error + '40', COLORS.error + '20']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.logoutGradient}
                    >
                        <Text style={styles.logoutText}>RESET IDENTITY</Text>
                    </LinearGradient>
                </Pressable>

                <Text style={styles.versionText}>Radar v1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: SPACING.lg },

    // Profile Header
    profileHeader: { alignItems: 'center', marginBottom: SPACING.xl },
    avatarContainer: { position: 'relative', marginBottom: SPACING.md },
    avatarGlowRing: {
        width: 108,
        height: 108,
        borderRadius: BORDER_RADIUS.full,
        padding: 4,
        ...SHADOWS.glow,
    },
    avatarInner: {
        flex: 1,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: { fontSize: 44 },
    trustBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: COLORS.success,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.full,
        ...SHADOWS.glowSuccess,
    },
    trustScore: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.black, color: COLORS.textInverse },
    anonymousId: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, letterSpacing: 1 },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: BORDER_RADIUS.full,
        marginTop: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.warning + '40',
    },
    streakIcon: { fontSize: 16, marginRight: 6 },
    streakText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.warning },
    joinedText: { fontSize: FONT_SIZES.sm, color: COLORS.textMuted, marginTop: SPACING.sm },

    // Stats Grid
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.xl },
    statWrapper: { width: '48%' },
    statCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    statGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
    },
    statValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.black },
    statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },

    // Badges
    badgesSection: { marginBottom: SPACING.xl },
    sectionTitle: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textMuted, letterSpacing: 2, marginBottom: SPACING.sm },
    badgesContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    badge: { flex: 1, alignItems: 'center' },
    badgeIcon: {
        width: 52,
        height: 52,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xs,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    badgeEmoji: { fontSize: 24 },
    badgeName: { fontSize: 10, color: COLORS.textMuted, textAlign: 'center' },

    // Menu
    menuSection: { marginBottom: SPACING.xl },
    menuContainer: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    menuIconText: { fontSize: 18 },
    menuLabel: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textPrimary },
    menuArrow: { fontSize: 18, fontWeight: FONT_WEIGHTS.bold },

    // Logout
    logoutButton: {
        marginBottom: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
    },
    logoutGradient: {
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.error + '40',
        borderRadius: BORDER_RADIUS.lg,
    },
    logoutText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.error, letterSpacing: 1 },
    versionText: { textAlign: 'center', fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
});

export default ProfileScreen;
