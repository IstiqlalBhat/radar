import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@shared/constants/config';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT_MS,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor for adding auth token and location
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Auth token will be added by authInterceptor
        // Location will be added by locationInterceptor
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        // Handle 401 - refresh token
        if (error.response?.status === 401) {
            // Token refresh logic will be handled by authInterceptor
        }
        return Promise.reject(error);
    }
);

export default apiClient;

// Export for attaching interceptors
export { apiClient };
