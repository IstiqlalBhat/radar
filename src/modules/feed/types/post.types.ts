// Post Types

export interface Post {
    id: string;
    bubbleId: string;
    content: string;
    createdAt: Date;
    expiresAt: Date;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    isHot: boolean;
    userVote?: 'up' | 'down' | null;
}

export interface Comment {
    id: string;
    postId: string;
    content: string;
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down' | null;
}

export interface CreatePostPayload {
    bubbleId: string;
    content: string;
    location: {
        latitude: number;
        longitude: number;
        accuracy: number;
        timestamp: number;
    };
}

export interface FeedState {
    posts: Post[];
    isLoading: boolean;
    isRefreshing: boolean;
    hasMore: boolean;
    error: string | null;
}

export type VoteAction = 'up' | 'down' | 'remove';

export interface VotePayload {
    postId: string;
    action: VoteAction;
}
