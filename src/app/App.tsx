import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

/**
 * Root App Component
 * Entry point for the Radar application
 */
export default function App() {
    return (
        <AppProviders>
            <StatusBar style="light" />
            <RootNavigator />
        </AppProviders>
    );
}
