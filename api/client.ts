import axios from 'axios';
import { useSessionStore } from '../core/state/sessionStore';

// --- Create Axios Instance ---
const apiClient = axios.create({
  // IMPORTANT: Replace this with your actual backend URL from an environment variable
  baseURL: 'http://YOUR_BACKEND_API_URL/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// This will run before every request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from our session store
    const token = useSessionStore.getState().token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// --- Response Interceptor (Optional but Recommended) ---
// This can be used for global error handling, e.g., redirecting on 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Here you could, for example, handle a 401 error by logging the user out
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out...');
      // useSessionStore.getState().logout(); // implement this later
    }
    return Promise.reject(error);
  }
);

export default apiClient;