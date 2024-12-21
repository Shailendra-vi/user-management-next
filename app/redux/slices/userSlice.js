"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUsers, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
