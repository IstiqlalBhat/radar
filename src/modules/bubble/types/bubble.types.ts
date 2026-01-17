// Bubble Types

export type BubbleType =
    | 'classroom'
    | 'library'
    | 'dorm'
    | 'dining'
    | 'outdoor'
    | 'recreation'
    | 'parking'
    | 'other';

export interface Bubble {
    id: string;
    name: string;
    description?: string;
    location: {
        latitude: number;
        longitude: number;
    };
    radius: number; // meters
    type: BubbleType;
    activeUsers: number;
    postCount: number;
    hotScore: number; // 0-100
    createdAt: Date;
}

export interface BubbleActivity {
    bubbleId: string;
    activeUserCount: number;
    recentPostCount: number;
    isHot: boolean;
    lastActivity: Date;
}

export interface BubbleState {
    currentBubble: Bubble | null;
    nearbyBubbles: Bubble[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: Date | null;
}
