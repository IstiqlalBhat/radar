// API Endpoints Configuration

export const ENDPOINTS = {
    // Authentication
    AUTH: {
        REGISTER_DEVICE: '/api/v1/auth/device',
        REFRESH_TOKEN: '/api/v1/auth/refresh',
        DELETE_DEVICE: '/api/v1/auth/device',
    },

    // Bubbles
    BUBBLES: {
        LIST: '/api/v1/bubbles',
        DETAIL: (id: string) => `/api/v1/bubbles/${id}`,
        FEED: (id: string) => `/api/v1/bubbles/${id}/feed`,
        ENTER: (id: string) => `/api/v1/bubbles/${id}/enter`,
        EXIT: (id: string) => `/api/v1/bubbles/${id}/exit`,
    },

    // Posts
    POSTS: {
        CREATE: '/api/v1/posts',
        DETAIL: (id: string) => `/api/v1/posts/${id}`,
        DELETE: (id: string) => `/api/v1/posts/${id}`,
        VOTE: (id: string) => `/api/v1/posts/${id}/vote`,
        REPORT: (id: string) => `/api/v1/posts/${id}/report`,
        COMMENTS: (id: string) => `/api/v1/posts/${id}/comments`,
    },

    // Settings
    SETTINGS: {
        GET: '/api/v1/settings',
        UPDATE: '/api/v1/settings',
    },
} as const;
