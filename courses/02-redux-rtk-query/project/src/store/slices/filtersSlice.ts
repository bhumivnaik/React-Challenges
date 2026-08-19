import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FilterState {
    filterUserId?: number | null
}

const initialState: FilterState = {
    filterUserId: null
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterPost: (state, action: PayloadAction<number | null>) => {
            state.filterUserId = action.payload;
        },
    },
});

//middleware
export const { filterPost } = filtersSlice.actions;
export default filtersSlice.reducer;