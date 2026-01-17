import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '@shared/constants/theme';

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

const StatCard: React.FC<{ value: string | number; label: string; color: string }> = ({ value, label, color }) => (
    <View style={styles.statWrapper}>
        <View style={[styles.statShadow, { backgroundColor: COLORS.borderHighlight }]} />
        <View style={styles.statCard}>
            <View style={[styles.statAccent, { backgroundColor: color }]} />
            <View style={styles.statContent}>
                <Text style={[styles.statValue, { color }]}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        </View>
    </View>
);

const MenuItem: React.FC<{ item: typeof MENU_ITEMS[0] }> = ({ item }) => (
    <Pressable style={styles.menuItem}>
        <View style={[styles.menuIcon, { borderColor: item.color, backgroundColor: COLORS.surfaceLight }]}>
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
                contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + SPACING.md, paddingBottom: insets.bottom + 120 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarShadow} />
                        <View style={styles.avatar}>
                            <View style={[styles.avatarBackground, { backgroundColor: COLORS.surfaceLight }]}>
                                <Text style={styles.avatarText}>👤</Text>
                            </View>
                        </View>
                        <View style={styles.trustRing}>
                            <View style={styles.trustBadge}>
                                <Text style={styles.trustScore}>{USER_DATA.trustScore}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.anonymousId}>@{USER_DATA.anonymousId}</Text>
                    <View style={styles.streakBadge}>
                        <Text style={styles.streakIcon}>🔥</Text>
                        <Text style={styles.streakText}>{USER_DATA.streak} day streak</Text>
                    </View>
                    <Text style={styles.joinedText}>Member since {USER_DATA.joinedDate}</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard value={USER_DATA.totalPosts} label="Posts" color={COLORS.primary} />
                    <StatCard value={USER_DATA.totalUpvotes.toLocaleString()} label="Upvotes" color={COLORS.success} />
                    <StatCard value={USER_DATA.bubblesVisited} label="Bubbles" color={COLORS.warning} />
                    <StatCard value={`${USER_DATA.trustScore}%`} label="Trust" color={COLORS.secondary} />
                </View>

                {/* Badges */}
                <View style={styles.badgesSection}>
                    <Text style={styles.sectionTitle}>BADGES</Text>
                    <View style={styles.badgesContainer}>
                        <View style={styles.badgesContent}>
                            {USER_DATA.badges.map((badge) => (
                                <View key={badge.id} style={styles.badge}>
                                    <View style={styles.badgeIcon}><Text style={styles.badgeEmoji}>{badge.icon}</Text></View>
                                    <Text style={styles.badgeName}>{badge.name}</Text>
                                </View>
                            ))}
                        </View>
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
                <View style={styles.logoutWrapper}>
                    <View style={styles.logoutShadow} />
                    <Pressable style={styles.logoutButton}>
                        <Text style={styles.logoutText}>RESET IDENTITY</Text>
                    </Pressable>
                </View>
                <Text style={styles.versionText}>Radar v1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: SPACING.md },
    profileHeader: { alignItems: 'center', marginBottom: SPACING.xl },
    avatarWrapper: { position: 'relative', marginBottom: SPACING.md },
    avatarShadow: { position: 'absolute', top: 6, left: 6, width: 96, height: 96, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.borderHighlight },
    avatar: { width: 96, height: 96, borderRadius: BORDER_RADIUS.md, overflow: 'hidden', borderWidth: 2, borderColor: COLORS.border },
    avatarBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.surfaceLight },
    avatarText: { fontSize: 40 },
    trustRing: { position: 'absolute', bottom: -8, right: -8 },
    trustBadge: { backgroundColor: COLORS.surface, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.success }, // Square badge
    trustScore: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.success },
    anonymousId: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.black, color: COLORS.textPrimary, marginBottom: SPACING.sm, letterSpacing: 1 },
    streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.warning, marginBottom: SPACING.sm },
    streakIcon: { fontSize: 14, marginRight: 4 },
    streakText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.warning },
    joinedText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.xl, gap: SPACING.sm },
    statWrapper: { width: '48%', position: 'relative' },
    statShadow: { position: 'absolute', top: 4, left: 4, right: 0, bottom: 0, borderRadius: BORDER_RADIUS.sm, zIndex: 0 },
    statCard: { borderRadius: BORDER_RADIUS.sm, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, zIndex: 1 },
    statAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
    statContent: { padding: SPACING.md, alignItems: 'center', paddingTop: SPACING.lg },
    statValue: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.black },
    statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2, textTransform: 'uppercase', letterSpacing: 1, fontWeight: FONT_WEIGHTS.bold },
    badgesSection: { marginBottom: SPACING.xl },
    sectionTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.black, color: COLORS.textSecondary, letterSpacing: 1, marginBottom: SPACING.sm },
    badgesContainer: { borderRadius: BORDER_RADIUS.sm, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
    badgesContent: { flexDirection: 'row', flexWrap: 'wrap', padding: SPACING.md, gap: SPACING.md },
    badge: { alignItems: 'center', width: '22%' },
    badgeIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.xs },
    badgeEmoji: { fontSize: 24 },
    badgeName: { fontSize: 10, color: COLORS.textSecondary, textAlign: 'center', fontWeight: 'bold' },
    menuSection: { marginBottom: SPACING.xl },
    menuContainer: { borderRadius: BORDER_RADIUS.sm, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    menuIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
    menuIconText: { fontSize: 16 },
    menuLabel: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.bold },
    menuArrow: { fontSize: 18, fontWeight: FONT_WEIGHTS.black },
    logoutWrapper: { marginBottom: SPACING.lg, position: 'relative' },
    logoutShadow: { position: 'absolute', top: 4, left: 4, right: 0, bottom: 0, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.error },
    logoutButton: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.sm, borderWidth: 2, borderColor: COLORS.error, paddingVertical: SPACING.md, alignItems: 'center' },
    logoutText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.black, color: COLORS.error, letterSpacing: 1 },
    versionText: { textAlign: 'center', fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginBottom: SPACING.md },
});

export default ProfileScreen;
