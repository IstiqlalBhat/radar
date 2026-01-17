import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList, MainTabParamList } from '@shared/types/navigation.types';
import {
    COLORS,
    SHADOWS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '@shared/constants/theme';
import { ExploreScreen } from '@modules/explore';
import { FeedScreen } from '@modules/feed/screens/FeedScreen';
import { NotificationsScreen } from '@modules/notifications/screens/NotificationsScreen';
import { ProfileScreen } from '@modules/profile/screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Icons
const ICONS = {
    explore: require('@assets/images/explore.png'),
    feed: require('@assets/images/feed.png'),
    alert: require('@assets/images/alert.png'),
    profile: require('@assets/images/profile.png'),
};

// Placeholder screens for modals
const PlaceholderScreen: React.FC<{ name: string; icon: any }> = ({ name, icon }) => (
    <View style={styles.placeholder}>
        <View style={styles.placeholderIconContainer}>
            <Image source={icon} style={styles.placeholderIcon} resizeMode="contain" />
        </View>
        <Text style={styles.placeholderText}>{name}</Text>
        <Text style={styles.placeholderSubtext}>Coming soon</Text>
    </View>
);

const OnboardingScreen = () => <PlaceholderScreen name="RADAR" icon={ICONS.explore} />;
const BubbleDetailScreen = () => <PlaceholderScreen name="Bubble Detail" icon={ICONS.explore} />;
const CreatePostScreen = () => <PlaceholderScreen name="Create Post" icon={ICONS.feed} />;
const SettingsScreen = () => <PlaceholderScreen name="Settings" icon={ICONS.profile} />;

// Custom Tab Bar Icon
interface TabIconProps {
    focused: boolean;
    icon: any;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon }) => {
    return (
        <View style={styles.tabIconWrapper}>
            <View style={[
                styles.tabIconInner,
                focused && styles.tabIconInnerFocused
            ]}>
                <Image
                    source={icon}
                    style={[
                        styles.tabIcon,
                        { tintColor: focused ? COLORS.primary : COLORS.textMuted },
                    ]}
                    resizeMode="contain"
                />
            </View>
            {focused && <View style={styles.activeIndicator} />}
        </View>
    );
};

// Custom Floating Tab Bar - Fixed visibility
const CustomTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            <View style={styles.tabBarContainer}>
                <View style={styles.tabBarContent}>
                    {state.routes.map((route: any, index: number) => {
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const getIcon = () => {
                            switch (route.name) {
                                case 'Map': return ICONS.explore;
                                case 'Feed': return ICONS.feed;
                                case 'Notifications': return ICONS.alert;
                                case 'Profile': return ICONS.profile;
                                default: return ICONS.explore;
                            }
                        };

                        return (
                            <Pressable
                                key={route.key}
                                style={styles.tabItem}
                                onPress={onPress}
                            >
                                <TabIcon focused={isFocused} icon={getIcon()} />
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

// Main Tab Navigator
function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Map" component={ExploreScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// Root Navigator
export function RootNavigator() {
    const isAuthenticated = true;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: COLORS.background },
                    animation: 'fade',
                }}
            >
                {!isAuthenticated ? (
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                ) : (
                    <>
                        <Stack.Screen name="Main" component={MainTabNavigator} />
                        <Stack.Screen
                            name="BubbleDetail"
                            component={BubbleDetailScreen}
                            options={{
                                presentation: 'modal',
                                animation: 'slide_from_bottom',
                            }}
                        />
                        <Stack.Screen
                            name="CreatePost"
                            component={CreatePostScreen}
                            options={{
                                presentation: 'modal',
                                animation: 'slide_from_bottom',
                            }}
                        />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    placeholderIconContainer: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.xxl,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    placeholderIcon: {
        width: 48,
        height: 48,
        tintColor: COLORS.primary,
    },
    placeholderText: {
        fontSize: FONT_SIZES.xxl,
        color: COLORS.textPrimary,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.sm,
        letterSpacing: 2,
    },
    placeholderSubtext: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
    },

    // Floating Tab Bar Styles
    tabBarOuter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    tabBarContainer: {
        width: '100%',
        maxWidth: 320,
        borderRadius: BORDER_RADIUS.xxl,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.borderHighlight,
        ...SHADOWS.md,
    },
    tabBarContent: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    tabIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 52,
        height: 52,
    },
    tabIconInner: {
        width: 44,
        height: 44,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    tabIconInnerFocused: {
        backgroundColor: COLORS.primaryGlow,
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 2,
        width: 20,
        height: 3,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.primary,
    },
});

export default RootNavigator;
