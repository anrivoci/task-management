import { createSlice } from '@reduxjs/toolkit';
//actions
import { userLogin, refreshToken, getUserDetails } from './authActions';

interface UserInfo {
    firstName: string;
    id: number;
    lastName: string;
    username: string;
    token: string;
}

interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    token: string | null;
    error: string | null;
    tokenExpiration: number | null;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    token: null,
    error: null,
    tokenExpiration: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem('token')
            state.loading = false
            state.userInfo = null
            state.error = null
            state.token = null;
            state.tokenExpiration = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.userInfo = payload
                state.loading = false;
                state.success = true;
                state.token = payload.token;
                state.tokenExpiration = Date.now() / 1000 + 30;
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || 'Unknown error';
            })
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.userInfo = payload;
                state.loading = false;
                state.success = true;
            })
            .addCase(refreshToken.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || 'Unknown error';
            })
            .addCase(getUserDetails.fulfilled, (state, { payload }) => {
                state.userInfo = payload;
            })
            .addCase(getUserDetails.rejected, (state, { payload }) => {
                state.error = payload || 'Unknown error';
            });
    },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;