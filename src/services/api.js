import axios from 'axios';
import { setLoading, logout } from '../store/slices/authSlice';
import { store } from '../store/store';

const API = axios.create({
    baseURL: 'http://localhost:3001/api/v1/user',
});

// Intercepteur pour gérer les erreurs 401
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    store.dispatch(setLoading(true));
    try {
        const response = await API.post('/login', { email, password });
        return response.data;
    } finally {
        store.dispatch(setLoading(false));
    }
};

export const getProfile = async (token) => {
    const response = await API.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUserProfile = async (data, token) => {
    const response = await API.put('/profile', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default API;