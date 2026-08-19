import { createSlice } from "@reduxjs/toolkit";
interface UI {
    sidebarOpen: boolean;
}
const initialState: UI = {
    sidebarOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = true;
        }
    }
});


//middleware
export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;