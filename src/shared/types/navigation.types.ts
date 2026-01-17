import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
    Onboarding: undefined;
    Main: NavigatorScreenParams<MainTabParamList>;
    BubbleDetail: { bubbleId: string };
    CreatePost: { bubbleId: string };
    Settings: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
    Map: undefined;
    Feed: undefined;
    Notifications: undefined;
    Profile: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

// Declare global navigation types
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
