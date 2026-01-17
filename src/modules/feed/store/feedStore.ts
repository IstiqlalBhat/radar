import { create } from 'zustand';
import type { Post, FeedState } from '../types/post.types';

interface FeedActions {
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
    removePost: (postId: string) => void;
    updatePost: (postId: string, updates: Partial<Post>) => void;
    setLoading: (loading: boolean) => void;
    setRefreshing: (refreshing: boolean) => void;
    setHasMore: (hasMore: boolean) => void;
    setError: (error: string | null) => void;
    updateVote: (postId: string, upvotes: number, downvotes: number, userVote: 'up' | 'down' | null) => void;
    reset: () => void;
}

const initialState: FeedState = {
    posts: [],
    isLoading: false,
    isRefreshing: false,
    hasMore: true,
    error: null,
};

export const useFeedStore = create<FeedState & FeedActions>((set) => ({
    ...initialState,

    setPosts: (posts) => set({ posts }),

    addPost: (post) =>
        set((state) => ({
            posts: [post, ...state.posts],
        })),

    removePost: (postId) =>
        set((state) => ({
            posts: state.posts.filter((p) => p.id !== postId),
        })),

    updatePost: (postId, updates) =>
        set((state) => ({
            posts: state.posts.map((p) =>
                p.id === postId ? { ...p, ...updates } : p
            ),
        })),

    setLoading: (isLoading) => set({ isLoading }),

    setRefreshing: (isRefreshing) => set({ isRefreshing }),

    setHasMore: (hasMore) => set({ hasMore }),

    setError: (error) => set({ error }),

    updateVote: (postId, upvotes, downvotes, userVote) =>
        set((state) => ({
            posts: state.posts.map((p) =>
                p.id === postId ? { ...p, upvotes, downvotes, userVote } : p
            ),
        })),

    reset: () => set(initialState),
}));
