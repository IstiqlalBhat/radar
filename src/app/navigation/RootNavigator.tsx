import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import type { RootStackParamList, MainTabParamList } from '@shared/types/navigation.types';
import { COLORS } from '@shared/constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder screens (to be replaced with actual screens)
const PlaceholderScreen: React.FC<{ name: string }> = ({ name }) => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{name}</Text>
        <Text style={styles.placeholderSubtext}>Coming soon</Text>
    </View>
);

// Temporary screen components
const MapScreen = () => <PlaceholderScreen name="📍 Map" />;
const FeedScreen = () => <PlaceholderScreen name="📰 Feed" />;
const NotificationsScreen = () => <PlaceholderScreen name="🔔 Notifications" />;
const ProfileScreen = () => <PlaceholderScreen name="👤 Profile" />;
const OnboardingScreen = () => <PlaceholderScreen name="🚀 Onboarding" />;
const BubbleDetailScreen = () => <PlaceholderScreen name="🫧 Bubble Detail" />;
const CreatePostScreen = () => <PlaceholderScreen name="✏️ Create Post" />;
const SettingsScreen = () => <PlaceholderScreen name="⚙️ Settings" />;

// Main Tab Navigator
function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
            }}
        >
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 20 }}>📍</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 20 }}>📰</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarLabel: 'Alerts',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 20 }}>🔔</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 20 }}>👤</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// Root Navigator
export function RootNavigator() {
    const isAuthenticated = true; // TODO: Get from auth store

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: COLORS.background },
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
                            }}
                        />
                        <Stack.Screen
                            name="CreatePost"
                            component={CreatePostScreen}
                            options={{
                                presentation: 'modal',
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
    placeholderText: {
        fontSize: 32,
        color: COLORS.textPrimary,
        fontWeight: 'bold',
    },
    placeholderSubtext: {
        fontSize: 16,
        color: COLORS.textMuted,
        marginTop: 8,
    },
    tabBar: {
        backgroundColor: COLORS.surface,
        borderTopColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        paddingBottom: 4,
        paddingTop: 4,
        height: 60,
    },
});

export default RootNavigator;
