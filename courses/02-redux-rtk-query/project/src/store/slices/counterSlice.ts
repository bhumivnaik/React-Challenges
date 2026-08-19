import { createSlice } from "@reduxjs/toolkit";

interface Count {
    count: number;
}
const initialState: Count = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        }
    }
})


// middleware is configured in the Redux store, not in the slice.

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;