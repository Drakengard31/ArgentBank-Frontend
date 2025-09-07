import axios from 'axios';
import { setLoading, logout } from '../store/slices/authSlice';
import { store } from '../store/store';

const API = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
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
        const response = await API.post('/user/login', { email, password });
        return response.data;
    } finally {
        store.dispatch(setLoading(false));
    }
};

export const getProfile = async (token) => {
    const response = await API.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUserProfile = async (data, token) => {
    const response = await API.put('/user/profile', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getAccountTransactions = async (accountId, token) => {
    const response = await API.get(`/accounts/${accountId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getTransactionDetails = async (transactionId, token) => {
    const response = await API.get(`/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateTransaction = async (transactionId, data, token) => {
    const response = await API.put(`/transactions/${transactionId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default API;