import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// Create React Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000, // 30 seconds
            retry: 2,
            refetchOnWindowFocus: true,
        },
        mutations: {
            retry: 1,
        },
    },
});

interface AppProvidersProps {
    children: React.ReactNode;
}

/**
 * App-wide providers wrapper
 * Wraps the app with all necessary context providers
 */
export function AppProviders({ children }: AppProvidersProps) {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppProviders;
