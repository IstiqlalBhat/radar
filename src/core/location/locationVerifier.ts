import type { Location } from '@shared/types';
import type { Bubble } from '@modules/bubble/types/bubble.types';
import { BUBBLE_CONFIG, LOCATION_CONFIG } from '@shared/constants/config';

export interface VerificationResult {
    isValid: boolean;
    confidenceScore: number;
    failedChecks: string[];
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in meters
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Check if user is inside a bubble
 */
export function isInsideBubble(
    userLocation: Location,
    bubble: Bubble
): boolean {
    const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        bubble.location.latitude,
        bubble.location.longitude
    );

    // Consider accuracy margin
    const effectiveRadius = bubble.radius + (userLocation.accuracy || 0);
    return distance <= effectiveRadius;
}

/**
 * Verify location authenticity (anti-spoofing)
 */
export class LocationVerifier {
    private lastLocation: Location | null = null;

    /**
     * Verify if location is legitimate
     */
    verify(location: Location): VerificationResult {
        const failedChecks: string[] = [];
        let score = 100;

        // Check 1: Accuracy check
        if (location.accuracy > 100) {
            failedChecks.push('Low accuracy');
            score -= 20;
        }

        // Check 2: Velocity check (if we have previous location)
        if (this.lastLocation) {
            const distance = calculateDistance(
                this.lastLocation.latitude,
                this.lastLocation.longitude,
                location.latitude,
                location.longitude
            );
            const timeDelta = (location.timestamp - this.lastLocation.timestamp) / 1000;

            if (timeDelta > 0) {
                const velocity = distance / timeDelta; // m/s
                if (velocity > LOCATION_CONFIG.MAX_VELOCITY_MS) {
                    failedChecks.push('Suspicious velocity');
                    score -= 40;
                }
            }
        }

        // Check 3: Altitude consistency (if available)
        if (
            this.lastLocation?.altitude !== undefined &&
            location.altitude !== undefined
        ) {
            const altitudeDiff = Math.abs(location.altitude - this.lastLocation.altitude);
            if (altitudeDiff > 100) {
                // More than 100m altitude change
                failedChecks.push('Unusual altitude change');
                score -= 15;
            }
        }

        // Update last location
        this.lastLocation = location;

        return {
            isValid: score >= 50,
            confidenceScore: Math.max(0, score),
            failedChecks,
        };
    }

    /**
     * Reset verifier state
     */
    reset(): void {
        this.lastLocation = null;
    }
}

export const locationVerifier = new LocationVerifier();
