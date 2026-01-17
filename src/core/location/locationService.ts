import * as Location from 'expo-location';
import { LOCATION_CONFIG } from '@shared/constants/config';
import type { Location as LocationType } from '@shared/types';

export interface LocationServiceResult {
    location: LocationType | null;
    error: string | null;
}

class LocationService {
    private watchSubscription: Location.LocationSubscription | null = null;
    private lastLocation: LocationType | null = null;

    /**
     * Request location permissions
     */
    async requestPermissions(): Promise<boolean> {
        try {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus !== 'granted') {
                return false;
            }

            // Request background permissions for geofencing
            const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
            return backgroundStatus === 'granted';
        } catch (error) {
            console.error('Error requesting location permissions:', error);
            return false;
        }
    }

    /**
     * Get current location with high accuracy
     */
    async getCurrentLocation(): Promise<LocationServiceResult> {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                return { location: null, error: 'Location permission not granted' };
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const result: LocationType = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy: location.coords.accuracy ?? 0,
                altitude: location.coords.altitude ?? undefined,
                altitudeAccuracy: location.coords.altitudeAccuracy ?? undefined,
                heading: location.coords.heading ?? undefined,
                speed: location.coords.speed ?? undefined,
                timestamp: location.timestamp,
            };

            this.lastLocation = result;
            return { location: result, error: null };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return { location: null, error: message };
        }
    }

    /**
     * Start watching location updates
     */
    async startWatching(
        callback: (location: LocationType) => void
    ): Promise<void> {
        if (this.watchSubscription) {
            await this.stopWatching();
        }

        this.watchSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: LOCATION_CONFIG.UPDATE_INTERVAL_MS,
                distanceInterval: LOCATION_CONFIG.DISTANCE_FILTER_METERS,
            },
            (location) => {
                const result: LocationType = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    accuracy: location.coords.accuracy ?? 0,
                    altitude: location.coords.altitude ?? undefined,
                    heading: location.coords.heading ?? undefined,
                    speed: location.coords.speed ?? undefined,
                    timestamp: location.timestamp,
                };
                this.lastLocation = result;
                callback(result);
            }
        );
    }

    /**
     * Stop watching location updates
     */
    async stopWatching(): Promise<void> {
        if (this.watchSubscription) {
            this.watchSubscription.remove();
            this.watchSubscription = null;
        }
    }

    /**
     * Get last known location (cached)
     */
    getLastLocation(): LocationType | null {
        return this.lastLocation;
    }
}

export const locationService = new LocationService();
export default locationService;
