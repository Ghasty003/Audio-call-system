import { createSlice } from "@reduxjs/toolkit";


export const interfaceSlice = createSlice({
    name: "interface",
    initialState: {
        ui: "modal",
        nameToShow: "",
    },
    reducers: {
        setInterface(state, action) {
            state.ui = action.payload;
        },
        setNameToShow(state, action) {
            state.nameToShow = action.payload;
        },
    }
});


export const { setInterface, setNameToShow } = interfaceSlice.actions;

export default interfaceSlice.reducer;