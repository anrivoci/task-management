import { configureStore } from '@reduxjs/toolkit';
//reducers
import authReducer from "./auth/authSlice";
import dataReducer from "./data/dataSlice";
import columnsReducer from "./columns/columnsSlice";
import searchReducer from './search/searchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        columns: columnsReducer,
        search: searchReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;