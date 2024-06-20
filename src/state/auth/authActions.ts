//other-libs
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
//types
import { AppDispatch } from '../store';

const backendURL = 'https://dummyjson.com';

interface UserData {
    username: string;
    role: string
    firstName: string;
    id: number;
    lastName: string;
    token: string;
}

interface LogUser {
    username: string;
    password: string;
}

interface LogUserResponse {
    token: string;
    id: number;
    username: string;
    lastName: string;
    firstName: string;
}

export const userLogin = createAsyncThunk<
    LogUserResponse,
    LogUser,
    { rejectValue: string, dispatch: AppDispatch }
>(
    'auth/login',
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post<LogUserResponse>(
                `${backendURL}/auth/login`,
                { username, password },
                config
            );
            localStorage.setItem('token', data.token)
            dispatch(getUserDetails(data.token));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserDetails = createAsyncThunk<
    UserData,
    string,
    { rejectValue: string }
>(
    'auth/userData',
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<UserData>(
                `${backendURL}/auth/me`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const refreshToken = createAsyncThunk<
    LogUserResponse,
    string,
    { rejectValue: string }
>(
    'auth/refreshToken',
    async (token, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post<LogUserResponse>(
                `${backendURL}/auth/refresh`,
                {
                    refreshToken: token
                },
                config
            );
            localStorage.setItem('token', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);