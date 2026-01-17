import { create } from 'zustand';
import type { Bubble, BubbleState } from '../types/bubble.types';

interface BubbleActions {
    setCurrentBubble: (bubble: Bubble | null) => void;
    setNearbyBubbles: (bubbles: Bubble[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    updateBubbleActivity: (bubbleId: string, activeUsers: number, postCount: number) => void;
    reset: () => void;
}

const initialState: BubbleState = {
    currentBubble: null,
    nearbyBubbles: [],
    isLoading: false,
    error: null,
    lastUpdated: null,
};

export const useBubbleStore = create<BubbleState & BubbleActions>((set) => ({
    ...initialState,

    setCurrentBubble: (currentBubble) =>
        set({
            currentBubble,
            lastUpdated: new Date(),
        }),

    setNearbyBubbles: (nearbyBubbles) =>
        set({
            nearbyBubbles,
            lastUpdated: new Date(),
        }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    updateBubbleActivity: (bubbleId, activeUsers, postCount) =>
        set((state) => ({
            nearbyBubbles: state.nearbyBubbles.map((bubble) =>
                bubble.id === bubbleId
                    ? { ...bubble, activeUsers, postCount }
                    : bubble
            ),
            currentBubble:
                state.currentBubble?.id === bubbleId
                    ? { ...state.currentBubble, activeUsers, postCount }
                    : state.currentBubble,
        })),

    reset: () => set(initialState),
}));
