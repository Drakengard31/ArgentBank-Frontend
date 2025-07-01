import { createSlice } from '@reduxjs/toolkit';
import { encryptData } from '../../utils/security';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: localStorage.getItem('token') || null,
        user: null,
        error: null,
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        loginSuccess(state, action) {
            state.token = action.payload.token;
            encryptData('authData', action.payload);
            localStorage.setItem('token', action.payload.token);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setLoading, loginSuccess, setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;