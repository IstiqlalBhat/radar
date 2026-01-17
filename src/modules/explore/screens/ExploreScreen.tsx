import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
    Pressable,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { MapView, PROVIDER_GOOGLE } from '@shared/components/MapView';
import type { Region } from '@shared/components/MapView';
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
import { locationService } from '@core/location/locationService';
import { useBubbleStore } from '@modules/bubble/store/bubbleStore';
import type { Bubble } from '@modules/bubble/types/bubble.types';
import type { Location } from '@shared/types';

import BubbleMarker from '../components/BubbleMarker';
import DiscoveryCard from '../components/DiscoveryCard';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Clemson, SC coordinates
const CLEMSON_COORDS = {
    latitude: 34.6834,
    longitude: -82.8374,
};

// Mock data
const MOCK_BUBBLES: Bubble[] = [
    {
        id: '1',
        name: 'Cooper Library',
        description: 'Main campus library with study spaces',
        location: { latitude: 34.6761, longitude: -82.8366 },
        radius: 100,
        type: 'library',
        activeUsers: 156,
        postCount: 342,
        hotScore: 92,
        createdAt: new Date(),
    },
    {
        id: '2',
        name: 'Hendrix Student Center',
        description: 'Student union with dining and activities',
        location: { latitude: 34.6774, longitude: -82.8393 },
        radius: 150,
        type: 'dining',
        activeUsers: 234,
        postCount: 567,
        hotScore: 98,
        createdAt: new Date(),
    },
    {
        id: '3',
        name: 'Memorial Stadium',
        description: 'Death Valley - Home of Clemson Football',
        location: { latitude: 34.6786, longitude: -82.8421 },
        radius: 200,
        type: 'recreation',
        activeUsers: 45,
        postCount: 1289,
        hotScore: 65,
        createdAt: new Date(),
    },
    {
        id: '4',
        name: 'Bowman Field',
        description: 'Historic open green space on campus',
        location: { latitude: 34.6789, longitude: -82.8365 },
        radius: 180,
        type: 'outdoor',
        activeUsers: 67,
        postCount: 234,
        hotScore: 72,
        createdAt: new Date(),
    },
];

const DEFAULT_REGION: Region = {
    latitude: CLEMSON_COORDS.latitude,
    longitude: CLEMSON_COORDS.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
};

// Neon Noir Map Style
const neonNoirMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#0A0A0F' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#5C5C6E' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0A0A0F' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#8B8BA3' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#5C5C6E' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#12121A' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1A1A28' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#12121A' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8B8BA3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#252538' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#12121A' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#00D9FF', lightness: -80 }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#00D9FF' }] },
];

export const ExploreScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const mapRef = useRef<MapView>(null);

    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isFeedExpanded, setIsFeedExpanded] = useState(false);

    const { nearbyBubbles, setNearbyBubbles } = useBubbleStore();

    // Calculate distance helper
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371e3;
        const p1 = (lat1 * Math.PI) / 180;
        const p2 = (lat2 * Math.PI) / 180;
        const dP = ((lat2 - lat1) * Math.PI) / 180;
        const dL = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dP / 2) * Math.sin(dP / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dL / 2) * Math.sin(dL / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Initialize
    useEffect(() => {
        const initializeExplore = async () => {
            setIsLoading(true);
            await locationService.requestPermissions();
            setUserLocation({
                latitude: CLEMSON_COORDS.latitude,
                longitude: CLEMSON_COORDS.longitude,
                accuracy: 10,
                timestamp: Date.now(),
            });
            setNearbyBubbles(MOCK_BUBBLES);
            setIsLoading(false);
        };
        initializeExplore();
    }, [setNearbyBubbles]);

    // Handle refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNearbyBubbles(MOCK_BUBBLES);
        setRefreshing(false);
    }, [setNearbyBubbles]);

    const handleBubblePress = useCallback((bubble: Bubble) => {
        mapRef.current?.animateToRegion({
            latitude: bubble.location.latitude,
            longitude: bubble.location.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
        }, 400);
        if (isFeedExpanded) toggleFeed();
    }, [isFeedExpanded]);

    const centerOnUser = useCallback(() => {
        mapRef.current?.animateToRegion(DEFAULT_REGION, 400);
    }, []);

    const toggleFeed = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsFeedExpanded(!isFeedExpanded);
    };

    const displayBubbles = nearbyBubbles.length > 0 ? nearbyBubbles : MOCK_BUBBLES;

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
                <View style={styles.loadingGlow}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
                <Text style={styles.loadingText}>Loading Radar...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Map Section */}
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton={false}
                showsCompass={false}
                customMapStyle={neonNoirMapStyle}
                mapPadding={{ top: 0, right: 0, bottom: isFeedExpanded ? SCREEN_HEIGHT * 0.55 : 90, left: 0 }}
            >
                {displayBubbles.map((bubble) => (
                    <BubbleMarker
                        key={bubble.id}
                        bubble={bubble}
                        onPress={handleBubblePress}
                    />
                ))}
            </MapView>

            {/* Floating Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top + SPACING.sm }]}>
                <View style={styles.headerPill}>
                    <View style={styles.headerDot} />
                    <Text style={styles.headerTitle}>RADAR</Text>
                    <View style={styles.headerDivider} />
                    <Text style={styles.headerCount}>{displayBubbles.length} ACTIVE</Text>
                </View>
            </View>

            {/* Center Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.centerButton,
                    { bottom: isFeedExpanded ? SCREEN_HEIGHT * 0.55 + 20 : 110 },
                    pressed && { transform: [{ scale: 0.9 }] }
                ]}
                onPress={centerOnUser}
            >
                <LinearGradient
                    colors={[COLORS.surfaceLight, COLORS.surface]}
                    style={styles.centerButtonGradient}
                >
                    <Text style={styles.centerButtonIcon}>⌖</Text>
                </LinearGradient>
            </Pressable>

            {/* Collapsible Trending Sheet */}
            <View style={[
                styles.feedSheet,
                {
                    height: isFeedExpanded ? '55%' : 90,
                    paddingBottom: insets.bottom + 70
                }
            ]}>
                <BlurView intensity={80} tint="dark" style={styles.sheetBlur}>
                    <Pressable onPress={toggleFeed} style={styles.sheetHeader}>
                        <View style={styles.sheetHandle} />
                        <Text style={styles.sheetTitle}>
                            {isFeedExpanded ? 'TRENDING NEARBY' : 'SWIPE UP FOR TRENDING'}
                        </Text>
                    </Pressable>

                    {isFeedExpanded ? (
                        <ScrollView
                            style={styles.feedScroll}
                            contentContainerStyle={styles.feedContent}
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
                            {displayBubbles.map((bubble, index) => (
                                <DiscoveryCard
                                    key={bubble.id}
                                    bubble={bubble}
                                    onPress={() => handleBubblePress(bubble)}
                                    rank={index + 1}
                                    distance={
                                        userLocation
                                            ? calculateDistance(
                                                userLocation.latitude,
                                                userLocation.longitude,
                                                bubble.location.latitude,
                                                bubble.location.longitude
                                            )
                                            : undefined
                                    }
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.minimizedPreview}>
                            <Text style={styles.minimizedText}>
                                {displayBubbles[0]?.name} is hot right now 🔥
                            </Text>
                        </View>
                    )}
                </BlurView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingGlow: {
        ...SHADOWS.glow,
    },
    loadingText: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
        letterSpacing: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    // Header
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.md,
    },
    headerPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: COLORS.glass,
        paddingHorizontal: SPACING.md,
        paddingVertical: 10,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.glow,
    },
    headerDot: {
        width: 8,
        height: 8,
        backgroundColor: COLORS.success,
        borderRadius: BORDER_RADIUS.full,
        marginRight: SPACING.sm,
        ...SHADOWS.glowSuccess,
    },
    headerTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        letterSpacing: 1,
    },
    headerDivider: {
        width: 1,
        height: 16,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.sm,
    },
    headerCount: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textSecondary,
    },

    // Center Button
    centerButton: {
        position: 'absolute',
        right: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
        ...SHADOWS.glow,
    },
    centerButtonGradient: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    centerButtonIcon: {
        fontSize: 22,
        color: COLORS.primary,
    },

    // Feed Sheet
    feedSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
    },
    sheetBlur: {
        flex: 1,
        backgroundColor: COLORS.glass,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderHighlight,
    },
    sheetHeader: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    sheetHandle: {
        width: 36,
        height: 4,
        backgroundColor: COLORS.borderHighlight,
        borderRadius: BORDER_RADIUS.full,
        marginBottom: 6,
    },
    sheetTitle: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textMuted,
        letterSpacing: 1,
    },
    feedScroll: {
        flex: 1,
    },
    feedContent: {
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    minimizedPreview: {
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    minimizedText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: FONT_WEIGHTS.semibold,
    },
});

export default ExploreScreen;
