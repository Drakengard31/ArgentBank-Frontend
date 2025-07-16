import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null,
        isAuthenticated: !!localStorage.getItem('token') || !!sessionStorage.getItem('token'),
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;

            if (action.payload.rememberMe) {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            } else {
                sessionStorage.setItem('token', action.payload.token);
            }
        },
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setLoading, loginSuccess, setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;