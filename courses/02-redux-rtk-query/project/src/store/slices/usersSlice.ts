import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockApi } from "../../api/mockServer";
import type { User } from "../../api/mockServer";


export interface UserState {
    list: User[];
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    list: [],
    loading: false,
    error: null
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', () => mockApi.getUsers());


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message ?? null;
                state.loading = false;
            });
    },
});


//middleware
export const { } = userSlice.actions;

export default userSlice.reducer;