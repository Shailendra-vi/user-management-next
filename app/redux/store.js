"use client";

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure store
export const store = configureStore({
    reducer: {
        users: persistedReducer,
    },
    // Allow non-serializable values for redux-persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/REGISTER', 'persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
