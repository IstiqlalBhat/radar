// Web fallback - react-native-maps doesn't support web
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '@shared/constants/theme';

export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface MapViewProps {
    children?: React.ReactNode;
    style?: any;
    initialRegion?: Region;
    customMapStyle?: any[];
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    showsCompass?: boolean;
    mapPadding?: any;
    provider?: any;
    ref?: any;
}

// Placeholder MapView for web
const MapView = React.forwardRef<any, MapViewProps>(({ children, style }, ref) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.placeholder}>
                <Text style={styles.icon}>🗺️</Text>
                <Text style={styles.title}>Map View</Text>
                <Text style={styles.subtitle}>
                    Maps are only available on iOS and Android
                </Text>
            </View>
            {/* Render children but they won't be interactive */}
            <View style={styles.hidden}>{children}</View>
        </View>
    );
});

MapView.displayName = 'MapView';

// Placeholder Marker for web
interface MarkerProps {
    coordinate: { latitude: number; longitude: number };
    onPress?: () => void;
    anchor?: { x: number; y: number };
    children?: React.ReactNode;
}

export const Marker: React.FC<MarkerProps> = ({ children }) => {
    // Just render nothing on web
    return null;
};

export const PROVIDER_GOOGLE = 'google';

export default MapView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surfaceDark,
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    icon: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textMuted,
        textAlign: 'center',
    },
    hidden: {
        display: 'none',
    },
});
