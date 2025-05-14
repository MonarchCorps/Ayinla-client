import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from "axios";

import {
    getAuthToken,
    isTokenExpired,
    removeAuthData,
} from "@/utils/token";
import axios from "axios";
import { CONFIGS } from "@/config";

const baseURL = CONFIGS.URL.API_BASE_URL;

export const axiosPrivate: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: false,
});

const $http = axiosPrivate;
let requestInterceptor: number | null = null;
let responseInterceptor: number | null = null;

if (requestInterceptor !== null) {
    $http.interceptors.request.eject(requestInterceptor);
}
if (responseInterceptor !== null) {
    $http.interceptors.response.eject(responseInterceptor);
}

requestInterceptor = $http.interceptors.request.use(
    async (config) => {
        const token = getAuthToken();
        if (token && !config.headers.has("Authorization")) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    error => Promise.reject(error),
);

responseInterceptor = $http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            const token = getAuthToken();
            if (token && isTokenExpired()) {
                removeAuthData(); // Remove token or any other auth data
                window.location.href = "/sign-in"; // Redirect to login page
            }
        }
        return Promise.reject(error);
    },
);

export { $http };
