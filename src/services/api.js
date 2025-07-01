import axios from 'axios';
import { setLoading, logout } from '../store/slices/authSlice';
import { store } from '../store/store';


const API = axios.create({
    baseURL: 'http://localhost:3001/api/v1/user',
});

export const login = async (email, password) => {
    try {
        store.dispatch(setLoading(true));
        const response = await API.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    } finally {
        store.dispatch(setLoading(false));
    }
};

export const getProfile = async (token) => {
    try {
        const response = await API.get('/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const updateUserProfile = async (data, token) => {
    try {
        const response = await API.put(
            '/profile',
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
API.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
)
export default API;